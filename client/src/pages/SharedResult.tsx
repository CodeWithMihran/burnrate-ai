import { useEffect, useMemo, useState, type FormEvent } from "react";
import { Link, useParams } from "react-router-dom";
import {
  AlertTriangle,
  ArrowRight,
  BadgeDollarSign,
  BarChart3,
  CheckCircle2,
  Copy,
  Loader2,
  Mail,
  Share2,
  Sparkles,
  TrendingDown,
} from "lucide-react";
import { getAuditByPublicId } from "../services/auditService";
import type { AuditRecommendation } from "../types/audit.types";
import { saveLead } from "../services/leadService";
import { getOgImageUrl, getShareBaseUrl } from "../services/api";

interface AuditData {
  auditId: string;
  publicId: string;
  totalMonthlySpend: number;
  optimizedMonthlySpend: number;
  monthlySavings: number;
  yearlySavings: number;
  aiSummary: string;
  recommendations: AuditRecommendation[];
}

const consultationUrl =
  import.meta.env.VITE_CONSULTATION_URL || "mailto:hello@credex.rocks";

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);

const updateMetaTag = (name: string, content: string) => {
  let element = document.querySelector(`meta[name="${name}"]`);

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute("name", name);
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
};

const updateMetaProperty = (property: string, content: string) => {
  let element = document.querySelector(`meta[property="${property}"]`);

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute("property", property);
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
};

const getShareUrl = (publicId: string) =>
  `${getShareBaseUrl()}/share/${publicId}`;

const SharedResult = () => {
  const { publicId } = useParams();
  const [auditData, setAuditData] = useState<AuditData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [leadForm, setLeadForm] = useState({
    email: "",
    companyName: "",
    role: "",
    teamSize: "",
    consultationNotes: "",
    preferredContactWindow: "",
  });
  const [leadStatus, setLeadStatus] = useState<"" | "saving" | "saved" | "error">(
    ""
  );

  useEffect(() => {
    const fetchAudit = async () => {
      if (!publicId) {
        setError("Missing audit link.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        const response = await getAuditByPublicId(publicId);
        const backendAudit = response.audit;

        setAuditData({
          auditId: backendAudit.auditId,
          publicId: backendAudit.publicId,
          totalMonthlySpend: backendAudit.result.totalCurrentSpend,
          optimizedMonthlySpend: backendAudit.result.totalOptimizedSpend,
          monthlySavings: backendAudit.result.totalMonthlySavings,
          yearlySavings: backendAudit.result.totalAnnualSavings,
          aiSummary:
            backendAudit.result.summary ||
            "Your AI stack has been analyzed and the most relevant savings opportunities are listed below.",
          recommendations: backendAudit.result.recommendations,
        });
      } catch (err) {
        console.error(err);
        setError("Unable to load audit results. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    void fetchAudit();
  }, [publicId]);

  useEffect(() => {
    if (!auditData) {
      return;
    }

    document.title = `BurnRate.ai Audit - Save ${formatCurrency(
      auditData.yearlySavings
    )}/year`;

    const description =
      auditData.aiSummary ||
      `AI spend audit showing ${formatCurrency(
        auditData.monthlySavings
      )} in estimated monthly savings.`;

    updateMetaTag("description", description);
    updateMetaProperty("og:title", "BurnRate.ai Audit Results");
    updateMetaProperty("og:description", description);
    updateMetaProperty("og:url", getShareUrl(auditData.publicId));
    updateMetaProperty("og:image", getOgImageUrl());
    updateMetaProperty("og:image:width", "1200");
    updateMetaProperty("og:image:height", "630");
    updateMetaProperty("og:image:type", "image/png");
    updateMetaProperty("twitter:title", "BurnRate.ai Audit Results");
    updateMetaProperty("twitter:description", description);
    updateMetaTag("twitter:card", "summary_large_image");
    updateMetaTag("twitter:image", getOgImageUrl());
  }, [auditData]);

  const shareUrl = useMemo(
    () => (auditData ? getShareUrl(auditData.publicId) : ""),
    [auditData]
  );

  const handleShare = async () => {
    if (!shareUrl) {
      return;
    }

    try {
      if (navigator.share) {
        await navigator.share({
          title: "BurnRate.ai Audit",
          text: "Check out this AI spend audit.",
          url: shareUrl,
        });
        return;
      }

      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch (shareError) {
      console.error("Share failed", shareError);
    }
  };

  const handleLeadSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!auditData) {
      return;
    }

    try {
      setLeadStatus("saving");

      const intent =
        auditData.monthlySavings > 500
          ? "consult"
          : auditData.monthlySavings < 100
            ? "notify"
            : "report";

      await saveLead({
        email: leadForm.email,
        companyName: leadForm.companyName || undefined,
        role: leadForm.role || undefined,
        teamSize: leadForm.teamSize ? Number(leadForm.teamSize) : undefined,
        auditId: auditData.auditId,
        intent,
        consultationNotes: leadForm.consultationNotes || undefined,
        preferredContactWindow: leadForm.preferredContactWindow || undefined,
      });

      setLeadStatus("saved");
    } catch (leadError) {
      console.error("Lead capture failed", leadError);
      setLeadStatus("error");
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#fcfcfd] px-6 pt-24">
        <div className="glass-card rounded-3xl px-10 py-8 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
            <Loader2 size={30} className="animate-spin" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-[#111827]">
            Loading your audit
          </h2>
          <p className="mt-4 max-w-md text-gray-500">
            Pulling together your savings view, recommendations, and shareable
            result.
          </p>
        </div>
      </div>
    );
  }

  if (error || !auditData) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#fcfcfd] px-6 pt-24">
        <div className="glass-card max-w-lg rounded-3xl p-10 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-600">
            <AlertTriangle size={28} />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-[#111827]">
            Something went wrong
          </h2>
          <p className="mt-4 text-gray-500">{error}</p>
          <Link
            to="/audit"
            className="mt-8 inline-flex items-center justify-center rounded-full bg-[#111827] px-6 py-4 font-bold text-white transition-all hover:bg-black"
          >
            Run Another Audit
          </Link>
        </div>
      </div>
    );
  }

  const isHighSavings = auditData.monthlySavings > 500;
  const isLowSavings = auditData.monthlySavings < 100;
  const spendRatio =
    auditData.totalMonthlySpend > 0
      ? Math.round(
          (auditData.optimizedMonthlySpend / auditData.totalMonthlySpend) * 100
        )
      : 100;

  return (
    <div className="bg-[#fcfcfd] pb-16 pt-28 md:pb-20 md:pt-32">
      <section className="pb-10">
        <div className="container-custom max-w-5xl text-center">
          <div className="eyebrow">
            <Sparkles size={14} />
            Audit Completed
          </div>

          <h1 className="mt-6 text-4xl font-bold tracking-tight text-[#111827] md:text-5xl lg:text-6xl">
            You could save{" "}
            <span className="gradient-text">
              {formatCurrency(auditData.yearlySavings)}/year
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-gray-500">
            BurnRate.ai reviewed your current setup, compared it against
            better-fit pricing paths, and packaged the result into a report you
            can actually use with your team.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button
              onClick={() => void handleShare()}
              className="inline-flex items-center justify-center rounded-2xl bg-[#111827] px-8 py-4 font-bold text-white shadow-lg shadow-gray-200 transition-all hover:bg-black"
            >
              Share Report
              <Share2 size={18} className="ml-2" />
            </button>
            <Link
              to="/audit"
              className="rounded-2xl border border-gray-200 bg-white px-8 py-4 font-bold text-gray-600 transition-all hover:bg-gray-50"
            >
              Run Another Audit
            </Link>
          </div>

          <div className="mx-auto mt-8 max-w-3xl rounded-[24px] border border-gray-200 bg-white p-6 text-left shadow-sm">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-gray-400">
              Public Share URL
            </p>
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <p className="truncate text-sm text-gray-600">{shareUrl}</p>
              <button
                type="button"
                onClick={() => void handleShare()}
                className="inline-flex items-center justify-center rounded-full border border-gray-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-gray-700 transition-all hover:bg-slate-100"
              >
                <Copy size={16} className="mr-2" />
                {copied ? "Copied" : "Copy Link"}
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-10">
        <div className="container-custom">
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            <div className="glass-card rounded-[28px] p-7">
              <div className="mb-5 inline-flex rounded-2xl bg-red-50 p-4 text-red-600">
                <BadgeDollarSign size={24} />
              </div>
              <h3 className="text-4xl font-bold text-[#111827]">
                {formatCurrency(auditData.totalMonthlySpend)}
              </h3>
              <p className="mt-2 text-sm text-gray-500">Current monthly spend</p>
            </div>

            <div className="glass-card rounded-[28px] p-7">
              <div className="mb-5 inline-flex rounded-2xl bg-blue-50 p-4 text-blue-600">
                <TrendingDown size={24} />
              </div>
              <h3 className="text-4xl font-bold text-[#111827]">
                {formatCurrency(auditData.optimizedMonthlySpend)}
              </h3>
              <p className="mt-2 text-sm text-gray-500">Optimized monthly spend</p>
            </div>

            <div className="glass-card rounded-[28px] p-7">
              <div className="mb-5 inline-flex rounded-2xl bg-green-50 p-4 text-green-600">
                <CheckCircle2 size={24} />
              </div>
              <h3 className="text-4xl font-bold text-[#111827]">
                {formatCurrency(auditData.monthlySavings)}
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                Estimated monthly savings
              </p>
            </div>

            <div className="glass-card rounded-[28px] p-7">
              <div className="mb-5 inline-flex rounded-2xl bg-amber-50 p-4 text-amber-600">
                <BarChart3 size={24} />
              </div>
              <h3 className="text-4xl font-bold text-[#111827]">{spendRatio}%</h3>
              <p className="mt-2 text-sm text-gray-500">
                Post-optimization spend ratio
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-10">
        <div className="container-custom">
          <div className="grid gap-6 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
            <div className="panel-card rounded-[30px] p-7 md:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
                Result Interpretation
              </p>
              <h2 className="mt-4 text-2xl font-bold text-[#111827] md:text-3xl">
                {isHighSavings
                  ? "This stack has enough savings to justify a real follow-up."
                  : isLowSavings
                    ? "This stack already looks relatively healthy."
                    : "There is enough here to make the report worth acting on."}
              </h2>

              <p className="mt-5 text-base leading-7 text-gray-500">
                {isHighSavings
                  ? "This is the kind of result where a deeper Credex conversation makes sense. Save the report and use the consultation path if you want help validating the fastest way to capture the savings."
                  : isLowSavings
                    ? "This is an honest low-savings result. You can still save the report and ask to be notified if future pricing changes create new optimization opportunities."
                    : "The savings are meaningful enough to review internally. Save the report and use it as a practical decision memo for the team."}
              </p>

              <div className="mt-6 rounded-[22px] border border-gray-200 bg-slate-50 p-5">
                <p className="text-sm font-semibold text-gray-800">
                  {isHighSavings
                    ? "High-savings case"
                    : isLowSavings
                      ? "Healthy stack"
                      : "Meaningful optimization"}
                </p>
                <p className="mt-2 text-sm leading-6 text-gray-500">
                  The product adjusts the next-step recommendation based on the
                  savings level instead of forcing the same CTA for everyone.
                </p>
              </div>

              {isHighSavings ? (
                <a
                  href={consultationUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex items-center justify-center rounded-full bg-[#111827] px-6 py-4 font-bold text-white transition-all hover:bg-black"
                >
                  Book Credex Consultation
                </a>
              ) : null}
            </div>

            <div className="panel-card rounded-[30px] p-7 md:p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                  <Mail size={22} />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
                    Save This Report
                  </p>
                  <h2 className="mt-2 text-2xl font-bold text-[#111827] md:text-3xl">
                    Capture the result after seeing the value
                  </h2>
                </div>
              </div>

              <p className="mt-5 text-base leading-7 text-gray-500">
                {isHighSavings
                  ? "Email the report to yourself and optionally leave context for a consultation so any follow-up feels informed."
                  : isLowSavings
                    ? "Save the report and stay on the notify path for future pricing changes."
                    : "Email the report to yourself so you can revisit the recommendations with your team."}
              </p>

              <form onSubmit={handleLeadSubmit} className="mt-7 space-y-4">
                <div className="rounded-[20px] border border-gray-200 bg-slate-50 p-4">
                  <label className="mb-3 block text-sm font-semibold text-gray-700">
                    Work Email
                  </label>
                  <input
                    type="email"
                    placeholder="you@company.com"
                    value={leadForm.email}
                    onChange={(event) =>
                      setLeadForm((current) => ({
                        ...current,
                        email: event.target.value,
                      }))
                    }
                    className="input-shell rounded-xl px-4 py-3.5"
                    required
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-[20px] border border-gray-200 bg-slate-50 p-4">
                    <label className="mb-3 block text-sm font-semibold text-gray-700">
                      Company Name
                    </label>
                    <input
                      type="text"
                      placeholder="Optional"
                      value={leadForm.companyName}
                      onChange={(event) =>
                        setLeadForm((current) => ({
                          ...current,
                          companyName: event.target.value,
                        }))
                      }
                      className="input-shell rounded-xl px-4 py-3.5"
                    />
                  </div>

                  <div className="rounded-[20px] border border-gray-200 bg-slate-50 p-4">
                    <label className="mb-3 block text-sm font-semibold text-gray-700">
                      Role
                    </label>
                    <input
                      type="text"
                      placeholder="Optional"
                      value={leadForm.role}
                      onChange={(event) =>
                        setLeadForm((current) => ({
                          ...current,
                          role: event.target.value,
                        }))
                      }
                      className="input-shell rounded-xl px-4 py-3.5"
                    />
                  </div>
                </div>

                <div className="rounded-[20px] border border-gray-200 bg-slate-50 p-4">
                  <label className="mb-3 block text-sm font-semibold text-gray-700">
                    Team Size
                  </label>
                  <input
                    type="number"
                    min="1"
                    placeholder="Optional"
                    value={leadForm.teamSize}
                    onChange={(event) =>
                      setLeadForm((current) => ({
                        ...current,
                        teamSize: event.target.value,
                      }))
                    }
                    className="input-shell rounded-xl px-4 py-3.5"
                  />
                </div>

                {isHighSavings ? (
                  <>
                    <div className="rounded-[20px] border border-gray-200 bg-slate-50 p-4">
                      <label className="mb-3 block text-sm font-semibold text-gray-700">
                        Preferred Contact Window
                      </label>
                      <input
                        type="text"
                        placeholder="Optional"
                        value={leadForm.preferredContactWindow}
                        onChange={(event) =>
                          setLeadForm((current) => ({
                            ...current,
                            preferredContactWindow: event.target.value,
                          }))
                        }
                        className="input-shell rounded-xl px-4 py-3.5"
                      />
                    </div>

                    <div className="rounded-[20px] border border-gray-200 bg-slate-50 p-4">
                      <label className="mb-3 block text-sm font-semibold text-gray-700">
                        Consultation Notes
                      </label>
                      <textarea
                        placeholder="Optional context for a better follow-up"
                        value={leadForm.consultationNotes}
                        onChange={(event) =>
                          setLeadForm((current) => ({
                            ...current,
                            consultationNotes: event.target.value,
                          }))
                        }
                        rows={4}
                        className="input-shell rounded-xl px-4 py-3.5"
                      />
                    </div>
                  </>
                ) : null}

                <button
                  type="submit"
                  disabled={leadStatus === "saving" || leadStatus === "saved"}
                  className="w-full rounded-xl bg-[#111827] px-6 py-4 font-bold text-white transition-all hover:bg-black disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {leadStatus === "saving"
                    ? "Saving report..."
                    : leadStatus === "saved"
                      ? "Report saved"
                      : isHighSavings
                        ? "Email me the report"
                        : isLowSavings
                          ? "Notify me if new optimizations appear"
                          : "Email me this audit"}
                </button>

                {leadStatus === "saved" ? (
                  <p className="text-sm text-green-600">
                    Saved successfully. Check your inbox for the report
                    confirmation.
                  </p>
                ) : null}

                {leadStatus === "error" ? (
                  <p className="text-sm text-red-600">
                    We could not save the report right now. Please try again.
                  </p>
                ) : null}
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-10">
        <div className="container-custom">
          <div className="panel-card rounded-[30px] p-7 md:p-8">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                <Sparkles size={24} />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
                  AI Generated Summary
                </p>
                <h2 className="mt-2 text-2xl font-bold text-[#111827] md:text-3xl">
                  A readable explanation of the result
                </h2>
              </div>
            </div>

            <p className="mt-6 max-w-4xl text-lg leading-8 text-gray-500">
              {auditData.aiSummary}
            </p>
          </div>
        </div>
      </section>

      <section className="pb-10">
        <div className="container-custom">
          <div className="mb-8 max-w-3xl">
            <h2 className="text-3xl font-bold text-[#111827] md:text-4xl lg:text-5xl">
              Tool-by-tool recommendations
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-500">
              These suggestions combine plan fit, current spend, and likely
              usage shape into practical next steps.
            </p>
          </div>

          <div className="space-y-5">
            {auditData.recommendations.map((item, index) => (
              <div
                key={`${item.toolName}-${index}`}
                className="glass-card rounded-[28px] p-7"
              >
                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                  <div className="max-w-3xl">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="rounded-full border border-gray-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-gray-800">
                        {item.toolName}
                      </span>
                      <span className="rounded-full border border-gray-200 bg-slate-50 px-4 py-2 text-sm text-gray-600">
                        Current: {item.currentPlan}
                      </span>
                      <span className="rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
                        Recommended: {item.recommendedPlan}
                      </span>
                    </div>

                    <p className="mt-5 text-lg leading-8 text-gray-500">
                      {item.reason}
                    </p>
                  </div>

                  <div className="rounded-[24px] border border-green-100 bg-green-50 px-7 py-6 text-center lg:min-w-[210px]">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-green-700">
                      Potential Savings
                    </p>
                    <h3 className="mt-3 text-4xl font-bold text-[#111827]">
                      {formatCurrency(item.savings)}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-8">
        <div className="container-custom">
          <div className="overflow-hidden rounded-[32px] bg-[#111827] px-8 py-12 text-center text-white md:px-14 md:py-14">
            <h2 className="mx-auto max-w-3xl text-4xl font-bold leading-tight md:text-5xl">
              Re-run the audit whenever your stack changes.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-300">
              Pricing shifts, seat counts change, and teams adopt new tools
              quickly. The cleanest spend posture is one you revisit.
            </p>
            <div className="mt-8">
              <Link
                to="/audit"
                className="inline-flex items-center rounded-full bg-white px-8 py-4 font-bold text-black transition-all hover:bg-gray-200"
              >
                Run New Audit
                <ArrowRight size={18} className="ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SharedResult;
