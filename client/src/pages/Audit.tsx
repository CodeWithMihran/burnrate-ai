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
    <div className="bg-[#fcfcfd] pb-16 pt-28 md:pb-20 md:pt-32">
      <section className="pb-10">
        <div className="container-custom max-w-5xl text-center">
          <div className="eyebrow">
            <Sparkles size={14} />
            Audit Workspace
          </div>
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-[#111827] md:text-5xl lg:text-6xl">
            Enter your stack,
            <span className="gradient-text"> then let the audit sort the rest.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-gray-500">
            Add your tools, current plans, monthly spend, and seat counts.
            BurnRate.ai will compare the setup against tighter-fit options and
            generate a shareable result.
          </p>
        </div>
      </section>

      <section>
        <div className="container-custom">
          <div className="grid gap-6 xl:grid-cols-[minmax(0,0.7fr)_minmax(300px,0.3fr)]">
            <form
              onSubmit={handleSubmit}
              className="panel-card rounded-[30px] p-6 md:p-8"
            >
              <div className="border-b border-gray-200 pb-8">
                <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
                      Team Information
                    </p>
                    <h2 className="mt-3 text-2xl font-bold text-[#111827] md:text-3xl">
                      Start with team context
                    </h2>
                    <p className="mt-3 max-w-2xl text-base leading-7 text-gray-500">
                      This helps the audit judge whether your current plans make
                      sense for how many people actually need access.
                    </p>
                  </div>

                  <div className="rounded-xl bg-blue-50 px-4 py-3 text-sm font-medium text-blue-700">
                    Form progress is saved locally
                  </div>
                </div>

                <div className="mt-8 grid gap-5 md:grid-cols-2">
                  <div className="rounded-[22px] border border-gray-200 bg-white p-5">
                    <label className="mb-3 block text-sm font-semibold text-gray-700">
                      Team Size
                    </label>
                    <input
                      type="number"
                      min="1"
                      placeholder="e.g. 8"
                      value={teamSize}
                      onChange={(e) => setTeamSize(e.target.value)}
                      className="input-shell rounded-xl px-4 py-3.5"
                      required
                    />
                  </div>

                  <div className="rounded-[22px] border border-gray-200 bg-white p-5">
                    <label className="mb-3 block text-sm font-semibold text-gray-700">
                      Primary Use Case
                    </label>
                    <select
                      value={useCase}
                      onChange={(e) =>
                        setUseCase(e.target.value as AuditPayload["useCase"] | "")
                      }
                      className="input-shell rounded-xl px-4 py-3.5"
                      required
                    >
                      <option value="">Select use case</option>
                      {useCases.map((item) => (
                        <option key={item.value} value={item.value}>
                          {item.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="mt-10">
                <div className="flex flex-col gap-4 border-b border-gray-200 pb-8 md:flex-row md:items-end md:justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
                      Tool Inputs
                    </p>
                    <h2 className="mt-3 text-2xl font-bold text-[#111827] md:text-3xl">
                      Add your current AI tools
                    </h2>
                    <p className="mt-3 text-base leading-7 text-gray-500">
                      Each block below represents one tool, plan, and spend
                      line.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={addTool}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#111827] px-5 py-3 text-sm font-bold text-white transition-all hover:bg-black"
                  >
                    <Plus size={18} />
                    Add Tool
                  </button>
                </div>

                <div className="mt-8 space-y-6">
                  {tools.map((tool, index) => (
                    <div
                      key={`${tool.toolName}-${index}`}
                      className="rounded-[26px] border border-gray-200 bg-white p-6 shadow-sm"
                    >
                      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-4">
                          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                            <Database size={20} />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-[#111827]">
                              Tool #{index + 1}
                            </h3>
                            <p className="text-sm text-gray-500">
                              Pricing details for this line item
                            </p>
                          </div>
                        </div>

                        {tools.length > 1 ? (
                          <button
                            type="button"
                            onClick={() => removeTool(index)}
                            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-red-200 bg-red-50 text-red-600 transition-all hover:bg-red-100"
                            aria-label={`Remove tool ${index + 1}`}
                          >
                            <Trash2 size={18} />
                          </button>
                        ) : null}
                      </div>

                      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                        <div className="rounded-[20px] border border-gray-200 bg-slate-50 p-4">
                          <label className="mb-3 block text-sm font-semibold text-gray-700">
                            Tool Name
                          </label>
                          <select
                            value={tool.toolName}
                            onChange={(e) =>
                              handleToolChange(index, "toolName", e.target.value)
                            }
                            className="input-shell rounded-xl px-4 py-3.5"
                            required
                          >
                            <option value="">Select tool</option>
                            {Object.keys(toolPlanOptions).map((toolName) => (
                              <option key={toolName} value={toolName}>
                                {toolName}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="rounded-[20px] border border-gray-200 bg-slate-50 p-4">
                          <label className="mb-3 block text-sm font-semibold text-gray-700">
                            Current Plan
                          </label>
                          <select
                            value={tool.plan}
                            onChange={(e) =>
                              handleToolChange(index, "plan", e.target.value)
                            }
                            className="input-shell rounded-xl px-4 py-3.5"
                            required
                            disabled={!tool.toolName}
                          >
                            <option value="">
                              {tool.toolName ? "Select plan" : "Choose tool first"}
                            </option>
                            {(toolPlanOptions[tool.toolName] || []).map((plan) => (
                              <option key={plan} value={plan}>
                                {plan}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="rounded-[20px] border border-gray-200 bg-slate-50 p-4">
                          <label className="mb-3 block text-sm font-semibold text-gray-700">
                            Monthly Spend ($)
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
                            className="input-shell rounded-xl px-4 py-3.5"
                            required
                          />
                        </div>

                        <div className="rounded-[20px] border border-gray-200 bg-slate-50 p-4">
                          <label className="mb-3 block text-sm font-semibold text-gray-700">
                            Seats / Users
                          </label>
                          <input
                            type="number"
                            min="1"
                            placeholder="e.g. 5"
                            value={tool.seats}
                            onChange={(e) =>
                              handleToolChange(index, "seats", e.target.value)
                            }
                            className="input-shell rounded-xl px-4 py-3.5"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-10 flex flex-col gap-5 border-t border-gray-200 pt-8 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-start gap-3">
                  <ShieldCheck size={18} className="mt-1 text-blue-600" />
                  <p className="max-w-xl text-sm leading-6 text-gray-500">
                    Private input data stays in the audit flow. The public share
                    URL only exposes the report output, not the private lead
                    fields.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="inline-flex items-center justify-center rounded-full bg-[#111827] px-8 py-4 font-bold text-white transition-all hover:bg-black disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={18} className="mr-3 animate-spin" />
                      Generating Audit...
                    </>
                  ) : (
                    <>
                      Generate Audit
                      <ArrowRight size={18} className="ml-2" />
                    </>
                  )}
                </button>
              </div>
            </form>

            <aside className="space-y-5 xl:sticky xl:top-28 xl:self-start">
              <div className="glass-card rounded-[28px] p-6">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
                  Preview
                </p>
                <div className="mt-4 grid gap-4">
                  <div className="rounded-[20px] border border-gray-200 bg-slate-50 p-5">
                    <p className="text-sm text-gray-500">Tools Added</p>
                    <h3 className="mt-2 text-4xl font-bold text-[#111827]">
                      {auditPreview.selectedTools}
                    </h3>
                  </div>
                  <div className="rounded-[20px] border border-gray-200 bg-slate-50 p-5">
                    <p className="text-sm text-gray-500">Current Monthly Spend</p>
                    <h3 className="mt-2 text-4xl font-bold text-[#111827]">
                      ${auditPreview.totalMonthlySpend.toFixed(0)}
                    </h3>
                  </div>
                </div>
              </div>

              <div className="glass-card rounded-[28px] p-6">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
                  Included In Result
                </p>
                <div className="mt-4 space-y-3">
                  {[
                    "Rule-based tool recommendations",
                    "AI-generated summary",
                    "Shareable public report URL",
                    "Lead capture after value is shown",
                  ].map((item) => (
                    <div
                      key={item}
                      className="rounded-[20px] border border-gray-200 bg-slate-50 p-4 text-sm leading-6 text-gray-700"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-card rounded-[28px] p-6">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
                  Supported Tools
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {Object.keys(toolPlanOptions).map((toolName) => (
                    <span
                      key={toolName}
                      className="rounded-full border border-gray-200 bg-slate-50 px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-gray-600"
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
