import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createAudit } from "../services/auditService";
import {
  Sparkles,
  Plus,
  Trash2,
  ArrowRight,
  Loader2,
  CheckCircle2,
} from "lucide-react";

interface ToolForm {
  toolName: string;
  plan: string;
  monthlySpend: string;
  seats: string;
}

const navigate = useNavigate();

const Audit = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [teamSize, setTeamSize] = useState("");
  const [useCase, setUseCase] = useState("");

  const [tools, setTools] = useState<ToolForm[]>([
    {
      toolName: "",
      plan: "",
      monthlySpend: "",
      seats: "",
    },
  ]);

  /* ----------------------------------
      HANDLE TOOL INPUT CHANGE
  ---------------------------------- */
  const handleToolChange = (
    index: number,
    field: keyof ToolForm,
    value: string
  ) => {
    const updatedTools = [...tools];
    updatedTools[index][field] = value;

    setTools(updatedTools);
  };

  /* ----------------------------------
      ADD NEW TOOL
  ---------------------------------- */
  const addTool = () => {
    setTools([
      ...tools,
      {
        toolName: "",
        plan: "",
        monthlySpend: "",
        seats: "",
      },
    ]);
  };

  /* ----------------------------------
      REMOVE TOOL
  ---------------------------------- */
  const removeTool = (index: number) => {
    if (tools.length === 1) return;

    const updatedTools = tools.filter((_, i) => i !== index);
    setTools(updatedTools);
  };

  /* ----------------------------------
      SUBMIT HANDLER
  ---------------------------------- */
 const handleSubmit = async (
  e: React.FormEvent<HTMLFormElement>
) => {
  e.preventDefault();

  try {
    setIsLoading(true);

    const payload = {
      teamSize: Number(teamSize),
      useCase,
      tools: tools.map((tool) => ({
        toolName: tool.toolName,
        plan: tool.plan,
        monthlySpend: Number(tool.monthlySpend),
        seats: Number(tool.seats),
      })),
    };

    const response = await createAudit(payload);

    navigate(`/share/${response.data.publicId}`);
  } catch (error) {
    console.error(error);

    alert("Something went wrong while generating the audit.");
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="relative overflow-hidden">
      
      {/* ==================================
          BACKGROUND GLOWS
      ================================== */}
      <div className="absolute left-1/2 top-20 -z-10 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-violet-600/15 blur-[140px]" />

      <div className="absolute right-0 top-80 -z-10 h-[300px] w-[300px] rounded-full bg-fuchsia-500/10 blur-[120px]" />

      {/* ==================================
          PAGE HEADER
      ================================== */}
      <section className="pb-10 pt-24">
        <div className="container-custom">
          
          <div className="mx-auto max-w-3xl text-center">
            
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-sm text-violet-200 backdrop-blur-xl">
              <Sparkles size={16} />
              AI Spend Optimization Audit
            </div>

            <h1 className="text-5xl font-extrabold tracking-tight text-white md:text-6xl">
              Run Your AI Spend Audit
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-400">
              Analyze your AI subscriptions, identify unnecessary spending,
              and discover smarter pricing recommendations in minutes.
            </p>
          </div>
        </div>
      </section>

      {/* ==================================
          AUDIT FORM
      ================================== */}
      <section className="pb-24">
        <div className="container-custom">
          
          <div className="mx-auto max-w-5xl">
            
            <form
              onSubmit={handleSubmit}
              className="glass-card rounded-[32px] border border-white/10 p-8 md:p-10"
            >
              
              {/* ==================================
                  TEAM DETAILS
              ================================== */}
              <div>
                <h2 className="text-2xl font-semibold text-white">
                  Team Information
                </h2>

                <p className="mt-2 text-slate-400">
                  Tell us about your team and how you use AI tools.
                </p>

                <div className="mt-8 grid gap-6 md:grid-cols-2">
                  
                  {/* Team Size */}
                  <div>
                    <label className="mb-3 block text-sm font-medium text-slate-300">
                      Team Size
                    </label>

                    <input
                      type="number"
                      placeholder="e.g. 8"
                      value={teamSize}
                      onChange={(e) => setTeamSize(e.target.value)}
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white placeholder:text-slate-500 transition-all duration-300 focus:border-violet-500/40 focus:bg-white/10"
                      required
                    />
                  </div>

                  {/* Use Case */}
                  <div>
                    <label className="mb-3 block text-sm font-medium text-slate-300">
                      Primary Use Case
                    </label>

                    <select
                      value={useCase}
                      onChange={(e) => setUseCase(e.target.value)}
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white transition-all duration-300 focus:border-violet-500/40 focus:bg-white/10"
                      required
                    >
                      <option value="" className="bg-[#0B0F19]">
                        Select use case
                      </option>

                      <option value="coding" className="bg-[#0B0F19]">
                        Coding / Development
                      </option>

                      <option value="writing" className="bg-[#0B0F19]">
                        Writing / Content
                      </option>

                      <option value="research" className="bg-[#0B0F19]">
                        Research / Analysis
                      </option>

                      <option value="general" className="bg-[#0B0F19]">
                        General Productivity
                      </option>
                    </select>
                  </div>
                </div>
              </div>

              {/* ==================================
                  TOOLS SECTION
              ================================== */}
              <div className="mt-16">
                
                <div className="flex items-center justify-between">
                  
                  <div>
                    <h2 className="text-2xl font-semibold text-white">
                      AI Tools & Spending
                    </h2>

                    <p className="mt-2 text-slate-400">
                      Add the AI tools your team currently uses.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={addTool}
                    className="inline-flex items-center gap-2 rounded-2xl border border-violet-500/20 bg-violet-500/10 px-5 py-3 text-sm font-medium text-violet-200 transition-all duration-300 hover:bg-violet-500/20"
                  >
                    <Plus size={18} />
                    Add Tool
                  </button>
                </div>

                {/* Tool Cards */}
                <div className="mt-8 space-y-6">
                  
                  {tools.map((tool, index) => (
                    <div
                      key={index}
                      className="rounded-3xl border border-white/10 bg-white/[0.03] p-6"
                    >
                      
                      <div className="mb-6 flex items-center justify-between">
                        
                        <div className="flex items-center gap-3">
                          
                          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-300">
                            <Sparkles size={18} />
                          </div>

                          <div>
                            <h3 className="font-semibold text-white">
                              Tool #{index + 1}
                            </h3>

                            <p className="text-sm text-slate-400">
                              Subscription details
                            </p>
                          </div>
                        </div>

                        {tools.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeTool(index)}
                            className="flex h-11 w-11 items-center justify-center rounded-xl border border-red-500/20 bg-red-500/10 text-red-300 transition-all duration-300 hover:bg-red-500/20"
                          >
                            <Trash2 size={18} />
                          </button>
                        )}
                      </div>

                      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                        
                        {/* Tool Name */}
                        <div>
                          <label className="mb-3 block text-sm font-medium text-slate-300">
                            Tool Name
                          </label>

                          <select
                            value={tool.toolName}
                            onChange={(e) =>
                              handleToolChange(
                                index,
                                "toolName",
                                e.target.value
                              )
                            }
                            className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white transition-all duration-300 focus:border-violet-500/40 focus:bg-white/10"
                            required
                          >
                            <option value="" className="bg-[#0B0F19]">
                              Select tool
                            </option>

                            <option value="ChatGPT" className="bg-[#0B0F19]">
                              ChatGPT
                            </option>

                            <option value="Claude" className="bg-[#0B0F19]">
                              Claude
                            </option>
                          </select>
                        </div>

                        {/* Plan */}
                        <div>
                          <label className="mb-3 block text-sm font-medium text-slate-300">
                            Current Plan
                          </label>

                          <input
                            type="text"
                            placeholder="e.g. Plus"
                            value={tool.plan}
                            onChange={(e) =>
                              handleToolChange(
                                index,
                                "plan",
                                e.target.value
                              )
                            }
                            className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white placeholder:text-slate-500 transition-all duration-300 focus:border-violet-500/40 focus:bg-white/10"
                            required
                          />
                        </div>

                        {/* Spend */}
                        <div>
                          <label className="mb-3 block text-sm font-medium text-slate-300">
                            Monthly Spend ($)
                          </label>

                          <input
                            type="number"
                            placeholder="e.g. 120"
                            value={tool.monthlySpend}
                            onChange={(e) =>
                              handleToolChange(
                                index,
                                "monthlySpend",
                                e.target.value
                              )
                            }
                            className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white placeholder:text-slate-500 transition-all duration-300 focus:border-violet-500/40 focus:bg-white/10"
                            required
                          />
                        </div>

                        {/* Seats */}
                        <div>
                          <label className="mb-3 block text-sm font-medium text-slate-300">
                            Seats / Users
                          </label>

                          <input
                            type="number"
                            placeholder="e.g. 5"
                            value={tool.seats}
                            onChange={(e) =>
                              handleToolChange(
                                index,
                                "seats",
                                e.target.value
                              )
                            }
                            className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white placeholder:text-slate-500 transition-all duration-300 focus:border-violet-500/40 focus:bg-white/10"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ==================================
                  SUBMIT BUTTON
              ================================== */}
              <div className="mt-14 flex flex-col items-center justify-center">
                
                <button
                  type="submit"
                  disabled={isLoading}
                  className="group inline-flex items-center justify-center rounded-2xl bg-violet-600 px-8 py-4 text-base font-semibold text-white transition-all duration-300 hover:bg-violet-500 hover:shadow-2xl hover:shadow-violet-500/30 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isLoading ? (
                    <>
                      <Loader2
                        size={20}
                        className="mr-3 animate-spin"
                      />

                      Analyzing Your AI Stack...
                    </>
                  ) : (
                    <>
                      Generate Audit

                      <ArrowRight
                        size={18}
                        className="ml-2 transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </>
                  )}
                </button>

                <div className="mt-5 flex items-center gap-2 text-sm text-slate-400">
                  <CheckCircle2
                    size={16}
                    className="text-violet-400"
                  />

                  Your audit data stays private and secure
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Audit;