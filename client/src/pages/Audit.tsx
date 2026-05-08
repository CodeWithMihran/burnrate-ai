import { useEffect, useMemo, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Database,
  Loader2,
  Plus,
  ShieldCheck,
  Sparkles,
  Trash2,
} from "lucide-react";
import { createAudit } from "../services/auditService";
import type { AuditPayload } from "../types/audit.types";

interface ToolForm {
  toolName: string;
  plan: string;
  monthlySpend: string;
  seats: string;
}

const toolPlanOptions: Record<string, string[]> = {
  Cursor: ["Hobby", "Pro", "Business", "Enterprise"],
  "GitHub Copilot": ["Individual", "Business", "Enterprise"],
  Claude: ["Free", "Pro", "Max", "Team", "Enterprise", "API Direct"],
  ChatGPT: ["Plus", "Team", "Enterprise", "API Direct"],
  "Anthropic API": ["API Direct"],
  "OpenAI API": ["API Direct"],
  Gemini: ["Pro", "Ultra", "API"],
  Windsurf: ["Free", "Pro", "Teams", "Enterprise"],
};

const STORAGE_KEY = "burnrate-audit-form";

const defaultTool: ToolForm = {
  toolName: "",
  plan: "",
  monthlySpend: "",
  seats: "",
};

const useCases: { label: string; value: AuditPayload["useCase"] }[] = [
  { label: "Coding / Development", value: "coding" },
  { label: "Writing / Content", value: "writing" },
  { label: "Data / Analytics", value: "data" },
  { label: "Research / Analysis", value: "research" },
  { label: "Mixed Workloads", value: "mixed" },
];

const getInitialFormState = (): {
  teamSize: string;
  useCase: AuditPayload["useCase"] | "";
  tools: ToolForm[];
} => {
  if (typeof window === "undefined") {
    return {
      teamSize: "",
      useCase: "" as AuditPayload["useCase"] | "",
      tools: [{ ...defaultTool }],
    };
  }

  const savedState = window.localStorage.getItem(STORAGE_KEY);

  if (!savedState) {
    return {
      teamSize: "",
      useCase: "" as AuditPayload["useCase"] | "",
      tools: [{ ...defaultTool }],
    };
  }

  try {
    const parsed = JSON.parse(savedState) as {
      teamSize?: string;
      useCase?: AuditPayload["useCase"] | "";
      tools?: ToolForm[];
    };

    return {
      teamSize: parsed.teamSize || "",
      useCase: parsed.useCase || "",
      tools: parsed.tools?.length ? parsed.tools : [{ ...defaultTool }],
    };
  } catch (error) {
    console.error("Failed to restore audit form state", error);

    return {
      teamSize: "",
      useCase: "" as AuditPayload["useCase"] | "",
      tools: [{ ...defaultTool }],
    };
  }
};

const Audit = () => {
  const navigate = useNavigate();
  const initialFormState = getInitialFormState();
  const [isLoading, setIsLoading] = useState(false);
  const [teamSize, setTeamSize] = useState(initialFormState.teamSize);
  const [useCase, setUseCase] = useState<AuditPayload["useCase"] | "">(
    initialFormState.useCase
  );
  const [tools, setTools] = useState<ToolForm[]>(initialFormState.tools);

  useEffect(() => {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ teamSize, useCase, tools })
    );
  }, [teamSize, useCase, tools]);

  const auditPreview = useMemo(() => {
    const selectedTools = tools.filter((tool) => tool.toolName).length;
    const totalMonthlySpend = tools.reduce((sum, tool) => {
      const parsed = Number(tool.monthlySpend);
      return sum + (Number.isFinite(parsed) ? parsed : 0);
    }, 0);

    return {
      selectedTools,
      totalMonthlySpend,
    };
  }, [tools]);

  const handleToolChange = (
    index: number,
    field: keyof ToolForm,
    value: string
  ) => {
    setTools((currentTools) =>
      currentTools.map((tool, toolIndex) =>
        toolIndex === index
          ? {
              ...tool,
              ...(field === "toolName"
                ? { toolName: value, plan: "" }
                : { [field]: value }),
            }
          : tool
      )
    );
  };

  const addTool = () => {
    setTools((currentTools) => [...currentTools, { ...defaultTool }]);
  };

  const removeTool = (index: number) => {
    setTools((currentTools) =>
      currentTools.length === 1
        ? currentTools
        : currentTools.filter((_, toolIndex) => toolIndex !== index)
    );
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!useCase) {
      return;
    }

    try {
      setIsLoading(true);

      const payload: AuditPayload = {
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
      navigate(`/share/${response.publicId}`);
    } catch (error) {
      console.error(error);
      window.alert("Something went wrong while generating the audit.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative overflow-hidden">
      <div className="hero-mesh opacity-90" />
      <div className="absolute left-[5%] top-16 -z-10 h-44 w-44 rounded-full bg-[#0f9f95]/12 blur-[90px]" />
      <div className="absolute right-[4%] top-44 -z-10 h-52 w-52 rounded-full bg-[#f0a36b]/14 blur-[110px]" />

      <section className="section-spacing pb-8 pt-16">
        <div className="container-custom">
          <div className="mx-auto max-w-4xl text-center">
            <div className="eyebrow justify-center">
              <Sparkles size={14} />
              Audit workspace
            </div>

            <h1 className="mt-7 text-5xl font-semibold tracking-tight text-white md:text-7xl">
              Capture your current AI spend,
              <span className="gradient-text"> then let the engine do the sorting.</span>
            </h1>

            <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-slate-300">
              Add the tools your team actually pays for. BurnRate.ai will model
              plan fit, optimization opportunities, and whether your result is
              better suited for a simple report, a watchlist, or a consultation.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="container-custom">
          <div className="grid gap-8 xl:grid-cols-[0.72fr_0.28fr]">
            <form
              onSubmit={handleSubmit}
              className="panel-card rounded-[34px] p-6 md:p-8 xl:p-10"
            >
              <div className="flex flex-col gap-6 border-b border-white/10 pb-8 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.18em] text-[#b5f6ef]">
                    Team context
                  </p>
                  <h2 className="mt-3 text-3xl font-semibold text-white">
                    Start with the shape of your team
                  </h2>
                  <p className="mt-3 max-w-2xl text-base text-slate-400">
                    This helps the audit judge whether your plans make sense for
                    how many people need access and what kind of work they do.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-slate-300">
                  Auto-saved locally while you work
                </div>
              </div>

              <div className="mt-8 grid gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-3 block text-sm font-medium text-slate-200">
                    Team size
                  </label>

                  <input
                    type="number"
                    min="1"
                    placeholder="e.g. 8"
                    value={teamSize}
                    onChange={(e) => setTeamSize(e.target.value)}
                    className="input-shell w-full rounded-[22px] px-5 py-4 text-white placeholder:text-slate-500"
                    required
                  />
                </div>

                <div>
                  <label className="mb-3 block text-sm font-medium text-slate-200">
                    Primary use case
                  </label>

                  <select
                    value={useCase}
                    onChange={(e) =>
                      setUseCase(e.target.value as AuditPayload["useCase"] | "")
                    }
                    className="input-shell w-full rounded-[22px] px-5 py-4 text-white"
                    required
                  >
                    <option value="" className="bg-[#081018]">
                      Select use case
                    </option>
                    {useCases.map((item) => (
                      <option
                        key={item.value}
                        value={item.value}
                        className="bg-[#081018]"
                      >
                        {item.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-14">
                <div className="flex flex-col gap-5 border-b border-white/10 pb-8 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.18em] text-[#b5f6ef]">
                      Current stack
                    </p>
                    <h2 className="mt-3 text-3xl font-semibold text-white">
                      Add your AI tools and plans
                    </h2>
                    <p className="mt-3 max-w-2xl text-base text-slate-400">
                      Enter what you pay today. The stronger your inputs, the
                      more defensible the recommendation set becomes.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={addTool}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-[#0f9f95]/20 bg-[#0f9f95]/10 px-5 py-3 text-sm font-semibold text-[#b5f6ef] transition-all duration-300 hover:bg-[#0f9f95]/16"
                  >
                    <Plus size={18} />
                    Add another tool
                  </button>
                </div>

                <div className="mt-8 space-y-6">
                  {tools.map((tool, index) => (
                    <div
                      key={`${tool.toolName}-${index}`}
                      className="glass-card rounded-[30px] p-6"
                    >
                      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-4">
                          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0f9f95]/10 text-[#79e0d8]">
                            <Database size={20} />
                          </div>

                          <div>
                            <h3 className="text-xl font-semibold text-white">
                              Tool #{index + 1}
                            </h3>
                            <p className="text-sm text-slate-400">
                              Subscription details for one tool or API line item
                            </p>
                          </div>
                        </div>

                        {tools.length > 1 ? (
                          <button
                            type="button"
                            onClick={() => removeTool(index)}
                            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-red-400/20 bg-red-400/10 text-red-200 transition-all duration-300 hover:bg-red-400/18"
                            aria-label={`Remove tool ${index + 1}`}
                          >
                            <Trash2 size={18} />
                          </button>
                        ) : null}
                      </div>

                      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                        <div>
                          <label className="mb-3 block text-sm font-medium text-slate-200">
                            Tool name
                          </label>

                          <select
                            value={tool.toolName}
                            onChange={(e) =>
                              handleToolChange(index, "toolName", e.target.value)
                            }
                            className="input-shell w-full rounded-[22px] px-5 py-4 text-white"
                            required
                          >
                            <option value="" className="bg-[#081018]">
                              Select tool
                            </option>
                            {Object.keys(toolPlanOptions).map((toolName) => (
                              <option
                                key={toolName}
                                value={toolName}
                                className="bg-[#081018]"
                              >
                                {toolName}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="mb-3 block text-sm font-medium text-slate-200">
                            Current plan
                          </label>

                          <select
                            value={tool.plan}
                            onChange={(e) =>
                              handleToolChange(index, "plan", e.target.value)
                            }
                            className="input-shell w-full rounded-[22px] px-5 py-4 text-white"
                            required
                            disabled={!tool.toolName}
                          >
                            <option value="" className="bg-[#081018]">
                              {tool.toolName ? "Select plan" : "Choose tool first"}
                            </option>
                            {(toolPlanOptions[tool.toolName] || []).map((plan) => (
                              <option
                                key={plan}
                                value={plan}
                                className="bg-[#081018]"
                              >
                                {plan}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="mb-3 block text-sm font-medium text-slate-200">
                            Monthly spend
                          </label>

                          <input
                            type="number"
                            min="0"
                            step="0.01"
                            placeholder="e.g. 120"
                            value={tool.monthlySpend}
                            onChange={(e) =>
                              handleToolChange(index, "monthlySpend", e.target.value)
                            }
                            className="input-shell w-full rounded-[22px] px-5 py-4 text-white placeholder:text-slate-500"
                            required
                          />
                        </div>

                        <div>
                          <label className="mb-3 block text-sm font-medium text-slate-200">
                            Seats / users
                          </label>

                          <input
                            type="number"
                            min="1"
                            placeholder="e.g. 5"
                            value={tool.seats}
                            onChange={(e) =>
                              handleToolChange(index, "seats", e.target.value)
                            }
                            className="input-shell w-full rounded-[22px] px-5 py-4 text-white placeholder:text-slate-500"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-8 md:flex-row md:items-center md:justify-between">
                <div className="flex items-start gap-3 text-sm text-slate-400">
                  <ShieldCheck size={18} className="mt-0.5 text-[#6bd2c7]" />
                  <span>
                    Your inputs stay private. The shareable URL created after the
                    audit only exposes the public-facing result.
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="group inline-flex items-center justify-center rounded-full bg-[#0f9f95] px-8 py-4 text-base font-semibold text-[#041015] shadow-[0_18px_34px_rgba(15,159,149,0.24)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1cb8ac] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={20} className="mr-3 animate-spin" />
                      Generating audit
                    </>
                  ) : (
                    <>
                      Generate audit
                      <ArrowRight
                        size={18}
                        className="ml-2 transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </>
                  )}
                </button>
              </div>
            </form>

            <aside className="space-y-6">
              <div className="glass-card rounded-[30px] p-6">
                <p className="text-sm uppercase tracking-[0.18em] text-[#b5f6ef]">
                  Audit preview
                </p>
                <div className="mt-5 grid gap-4">
                  <div className="rounded-[24px] bg-white/[0.04] p-5">
                    <p className="text-sm text-slate-400">Tools added</p>
                    <h3 className="mt-2 text-4xl font-semibold text-white">
                      {auditPreview.selectedTools}
                    </h3>
                  </div>

                  <div className="rounded-[24px] bg-white/[0.04] p-5">
                    <p className="text-sm text-slate-400">Current monthly spend</p>
                    <h3 className="mt-2 text-4xl font-semibold text-white">
                      ${auditPreview.totalMonthlySpend.toFixed(0)}
                    </h3>
                  </div>
                </div>
              </div>

              <div className="glass-card rounded-[30px] p-6">
                <p className="text-sm uppercase tracking-[0.18em] text-[#b5f6ef]">
                  What the result includes
                </p>

                <div className="mt-5 space-y-4 text-sm text-slate-300">
                  <div className="rounded-[22px] bg-white/[0.04] p-4">
                    Rule-based pricing recommendations for each tool
                  </div>
                  <div className="rounded-[22px] bg-white/[0.04] p-4">
                    AI-generated summary tailored to your stack
                  </div>
                  <div className="rounded-[22px] bg-white/[0.04] p-4">
                    Public share link plus report capture flow
                  </div>
                  <div className="rounded-[22px] bg-white/[0.04] p-4">
                    Consultation or watchlist path based on savings level
                  </div>
                </div>
              </div>

              <div className="glass-card rounded-[30px] p-6">
                <p className="text-sm uppercase tracking-[0.18em] text-[#b5f6ef]">
                  Supported inputs
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {Object.keys(toolPlanOptions).map((toolName) => (
                    <span
                      key={toolName}
                      className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-2 text-xs uppercase tracking-[0.14em] text-slate-300"
                    >
                      {toolName}
                    </span>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Audit;
