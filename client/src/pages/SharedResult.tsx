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
import { getShareBaseUrl } from "../services/api";

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

    document.title = `BurnRate.ai Audit • Save ${formatCurrency(
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
    updateMetaProperty("twitter:title", "BurnRate.ai Audit Results");
    updateMetaProperty("twitter:description", description);
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
      <div className="flex min-h-screen items-center justify-center px-6">
        <div className="text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl border border-[#0f9f95]/20 bg-[#0f9f95]/10">
            <Loader2 size={34} className="animate-spin text-[#79e0d8]" />
          </div>

          <h2 className="mt-8 text-3xl font-semibold text-white">
            Loading your audit
          </h2>

          <p className="mt-4 max-w-md text-slate-400">
            Pulling together your pricing picture, recommendations, and share
            details.
          </p>
        </div>
      </div>
    );
  }

  if (error || !auditData) {
    return (
      <div className="flex min-h-screen items-center justify-center px-6">
        <div className="glass-card max-w-lg rounded-[32px] p-10 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-400/12 text-red-200">
            <AlertTriangle size={28} />
          </div>

          <h2 className="mt-6 text-3xl font-semibold text-white">
            Something went wrong
          </h2>

          <p className="mt-4 text-slate-400">{error}</p>

          <Link
            to="/audit"
            className="mt-8 inline-flex items-center justify-center rounded-full bg-[#0f9f95] px-6 py-4 font-semibold text-[#041015] transition-all duration-300 hover:bg-[#1db7ab]"
          >
            Run another audit
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

  const recommendationTone = isHighSavings
    ? {
        badge: "High-savings case",
        heading: "This stack has enough savings to justify a real follow-through.",
        description:
          "The report is doing more than surface small optimizations. Save it, share it internally, and book a Credex consultation if you want help validating the fastest path to capture the savings.",
      }
    : isLowSavings
      ? {
          badge: "Healthy stack",
          heading: "You are probably spending reasonably well already.",
          description:
            "This is exactly the kind of honest result a user should be allowed to see. Save the report and stay on the notify list in case pricing shifts or a better-fit option appears later.",
        }
      : {
          badge: "Meaningful optimization",
          heading: "There is enough here to be worth a practical follow-up.",
          description:
            "The recommendations are material, but may not require a full consultation. Save the report and use it as a decision memo for the team.",
        };

  return (
    <div className="relative overflow-hidden">
      <div className="hero-mesh opacity-90" />
      <div className="absolute left-[5%] top-16 -z-10 h-48 w-48 rounded-full bg-[#0f9f95]/12 blur-[100px]" />
      <div className="absolute right-[5%] top-44 -z-10 h-56 w-56 rounded-full bg-[#f0a36b]/12 blur-[110px]" />

      <section className="section-spacing pb-8 pt-16">
        <div className="container-custom">
          <div className="mx-auto max-w-5xl text-center">
            <div className="eyebrow justify-center">
              <Sparkles size={14} />
              Audit completed
            </div>

            <h1 className="mt-7 text-5xl font-semibold tracking-tight text-white md:text-7xl">
              You could save{" "}
              <span className="gradient-text">
                {formatCurrency(auditData.yearlySavings)}/year
              </span>
            </h1>

            <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-slate-300">
              BurnRate.ai reviewed the plans behind your current AI stack and
              surfaced the strongest opportunities to lower spend without making
              the workflow worse for your team.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <button
                onClick={() => void handleShare()}
                className="group inline-flex items-center justify-center rounded-full bg-[#0f9f95] px-7 py-4 text-base font-semibold text-[#041015] shadow-[0_20px_40px_rgba(15,159,149,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1db7ab]"
              >
                Share report
                <Share2
                  size={18}
                  className="ml-2 transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>

              <Link
                to="/audit"
                className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/[0.05] px-7 py-4 text-base font-semibold text-white transition-all duration-300 hover:border-[#6bd2c7]/30 hover:bg-white/[0.07]"
              >
                Run another audit
              </Link>
            </div>

            <div className="mx-auto mt-6 max-w-3xl rounded-[24px] border border-white/10 bg-white/[0.04] p-4 text-left text-sm text-slate-300">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div className="min-w-0">
                  <p className="mb-1 text-xs uppercase tracking-[0.18em] text-slate-400">
                    Public share URL
                  </p>
                  <p className="truncate text-slate-200">{shareUrl}</p>
                </div>
                <button
                  type="button"
                  onClick={() => void handleShare()}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 font-medium text-white"
                >
                  <Copy size={16} />
                  {copied ? "Copied" : "Copy link"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-12">
        <div className="container-custom">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            <div className="glass-card rounded-[30px] p-7">
              <div className="mb-5 inline-flex rounded-2xl bg-red-400/10 p-4 text-red-200">
                <BadgeDollarSign size={24} />
              </div>
              <p className="text-sm uppercase tracking-[0.18em] text-slate-400">
                Current monthly spend
              </p>
              <h3 className="mt-3 text-4xl font-semibold text-white">
                {formatCurrency(auditData.totalMonthlySpend)}
              </h3>
            </div>

            <div className="glass-card rounded-[30px] p-7">
              <div className="mb-5 inline-flex rounded-2xl bg-[#0f9f95]/10 p-4 text-[#79e0d8]">
                <TrendingDown size={24} />
              </div>
              <p className="text-sm uppercase tracking-[0.18em] text-slate-400">
                Optimized monthly spend
              </p>
              <h3 className="mt-3 text-4xl font-semibold text-white">
                {formatCurrency(auditData.optimizedMonthlySpend)}
              </h3>
            </div>

            <div className="glass-card rounded-[30px] p-7">
              <div className="mb-5 inline-flex rounded-2xl bg-emerald-400/10 p-4 text-emerald-200">
                <CheckCircle2 size={24} />
              </div>
              <p className="text-sm uppercase tracking-[0.18em] text-slate-400">
                Estimated monthly savings
              </p>
              <h3 className="mt-3 text-4xl font-semibold text-white">
                {formatCurrency(auditData.monthlySavings)}
              </h3>
            </div>

            <div className="glass-card rounded-[30px] p-7">
              <div className="mb-5 inline-flex rounded-2xl bg-[#f0a36b]/10 p-4 text-[#ffd7b5]">
                <BarChart3 size={24} />
              </div>
              <p className="text-sm uppercase tracking-[0.18em] text-slate-400">
                Post-optimization spend ratio
              </p>
              <h3 className="mt-3 text-4xl font-semibold text-white">
                {spendRatio}%
              </h3>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-12">
        <div className="container-custom">
          <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
            <div className="glass-card rounded-[32px] p-7 md:p-8">
              <p className="text-sm uppercase tracking-[0.18em] text-[#b5f6ef]">
                Result posture
              </p>
              <h2 className="mt-4 text-3xl font-semibold text-white">
                {recommendationTone.heading}
              </h2>
              <p className="mt-5 text-lg leading-8 text-slate-300">
                {recommendationTone.description}
              </p>

              <div className="mt-6 rounded-[24px] border border-white/10 bg-white/[0.04] p-5">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                  Classification
                </p>
                <p className="mt-2 text-xl font-semibold text-white">
                  {recommendationTone.badge}
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-400">
                  High-savings cases surface consultation more prominently.
                  Lower-savings cases stay honest and softer, with a notify path
                  instead of forcing a sales motion.
                </p>
              </div>

              {isHighSavings ? (
                <a
                  href={consultationUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex items-center justify-center rounded-full bg-white px-6 py-4 font-semibold text-[#081018] transition-transform duration-300 hover:-translate-y-0.5"
                >
                  Book Credex consultation
                </a>
              ) : null}
            </div>

            <div className="glass-card rounded-[32px] p-7 md:p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0f9f95]/10 text-[#79e0d8]">
                  <Mail size={22} />
                </div>

                <div>
                  <p className="text-sm uppercase tracking-[0.18em] text-[#b5f6ef]">
                    Save this report
                  </p>
                  <h2 className="mt-2 text-3xl font-semibold text-white">
                    Capture the result after the value is clear
                  </h2>
                </div>
              </div>

              <p className="mt-5 text-base leading-8 text-slate-400">
                {isHighSavings
                  ? "Send yourself the report and optionally add context for a consultation so the follow-up feels informed rather than generic."
                  : isLowSavings
                    ? "Your stack looks healthy. Save this result and opt into future pricing updates without pretending there is a major problem to solve today."
                    : "Send yourself the report so you can revisit the recommendations with your team or use it to support a cleanup decision."}
              </p>

              <form onSubmit={handleLeadSubmit} className="mt-6 space-y-4">
                <input
                  type="email"
                  placeholder="Work email"
                  value={leadForm.email}
                  onChange={(event) =>
                    setLeadForm((current) => ({
                      ...current,
                      email: event.target.value,
                    }))
                  }
                  className="input-shell w-full rounded-[22px] px-5 py-4 text-white placeholder:text-slate-500"
                  required
                />

                <div className="grid gap-4 md:grid-cols-2">
                  <input
                    type="text"
                    placeholder="Company name (optional)"
                    value={leadForm.companyName}
                    onChange={(event) =>
                      setLeadForm((current) => ({
                        ...current,
                        companyName: event.target.value,
                      }))
                    }
                    className="input-shell w-full rounded-[22px] px-5 py-4 text-white placeholder:text-slate-500"
                  />

                  <input
                    type="text"
                    placeholder="Role (optional)"
                    value={leadForm.role}
                    onChange={(event) =>
                      setLeadForm((current) => ({
                        ...current,
                        role: event.target.value,
                      }))
                    }
                    className="input-shell w-full rounded-[22px] px-5 py-4 text-white placeholder:text-slate-500"
                  />
                </div>

                <input
                  type="number"
                  min="1"
                  placeholder="Team size (optional)"
                  value={leadForm.teamSize}
                  onChange={(event) =>
                    setLeadForm((current) => ({
                      ...current,
                      teamSize: event.target.value,
                    }))
                  }
                  className="input-shell w-full rounded-[22px] px-5 py-4 text-white placeholder:text-slate-500"
                />

                {isHighSavings ? (
                  <>
                    <input
                      type="text"
                      placeholder="Preferred contact window (optional)"
                      value={leadForm.preferredContactWindow}
                      onChange={(event) =>
                        setLeadForm((current) => ({
                          ...current,
                          preferredContactWindow: event.target.value,
                        }))
                      }
                      className="input-shell w-full rounded-[22px] px-5 py-4 text-white placeholder:text-slate-500"
                    />
                    <textarea
                      placeholder="What context would make the consultation most useful? (optional)"
                      value={leadForm.consultationNotes}
                      onChange={(event) =>
                        setLeadForm((current) => ({
                          ...current,
                          consultationNotes: event.target.value,
                        }))
                      }
                      rows={4}
                      className="input-shell w-full rounded-[22px] px-5 py-4 text-white placeholder:text-slate-500"
                    />
                  </>
                ) : null}

                <button
                  type="submit"
                  disabled={leadStatus === "saving" || leadStatus === "saved"}
                  className="w-full rounded-full bg-[#0f9f95] px-6 py-4 font-semibold text-[#041015] transition-all duration-300 hover:bg-[#1cb8ac] disabled:cursor-not-allowed disabled:opacity-70"
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
                  <p className="text-sm text-emerald-300">
                    Saved successfully. Check your inbox for the report
                    confirmation.
                  </p>
                ) : null}

                {leadStatus === "error" ? (
                  <p className="text-sm text-red-300">
                    We could not save the report right now. Please try again.
                  </p>
                ) : null}
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-12">
        <div className="container-custom">
          <div className="glass-card rounded-[32px] p-7 md:p-8">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0f9f95]/10 text-[#79e0d8]">
                <Sparkles size={24} />
              </div>

              <div>
                <p className="text-sm uppercase tracking-[0.18em] text-[#b5f6ef]">
                  AI-generated summary
                </p>
                <h2 className="mt-2 text-3xl font-semibold text-white">
                  A fast read on what matters
                </h2>
              </div>
            </div>

            <p className="mt-6 max-w-4xl text-lg leading-8 text-slate-300">
              {auditData.aiSummary}
            </p>
          </div>
        </div>
      </section>

      <section className="section-spacing pt-0">
        <div className="container-custom">
          <div className="max-w-3xl">
            <div className="eyebrow">
              <Sparkles size={14} />
              Recommendations
            </div>
            <h2 className="mt-6 text-4xl font-semibold tracking-tight text-white md:text-5xl">
              Tool-by-tool actions worth considering
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-400">
              Each recommendation ties the current plan to a more efficient
              alternative and explains why the change makes sense.
            </p>
          </div>

          <div className="mt-12 space-y-6">
            {auditData.recommendations.map((item, index) => {
              const accentClass =
                item.savings >= 100
                  ? "border-emerald-400/18 bg-emerald-400/10 text-emerald-100"
                  : "border-[#f0a36b]/18 bg-[#f0a36b]/10 text-[#ffe0c2]";

              return (
                <div
                  key={`${item.toolName}-${index}`}
                  className="glass-card rounded-[30px] p-6 md:p-8"
                >
                  <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm font-medium text-white">
                          {item.toolName}
                        </span>
                        <span className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm text-slate-300">
                          Current: {item.currentPlan}
                        </span>
                        <span className="rounded-full border border-[#0f9f95]/20 bg-[#0f9f95]/10 px-4 py-2 text-sm text-[#b5f6ef]">
                          Recommended: {item.recommendedPlan}
                        </span>
                      </div>

                      <p className="mt-5 text-lg leading-8 text-slate-300">
                        {item.reason}
                      </p>
                    </div>

                    <div
                      className={`rounded-[26px] border px-6 py-5 text-center ${accentClass}`}
                    >
                      <p className="text-xs uppercase tracking-[0.18em] opacity-80">
                        Potential monthly savings
                      </p>
                      <h3 className="mt-3 text-4xl font-semibold text-white">
                        {formatCurrency(item.savings)}
                      </h3>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-spacing pt-0">
        <div className="container-custom">
          <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-[linear-gradient(135deg,rgba(15,159,149,0.18),rgba(240,163,107,0.12))] px-6 py-10 text-center shadow-[0_30px_80px_rgba(0,0,0,0.24)] md:px-12 md:py-16">
            <div className="hero-mesh absolute inset-0 opacity-80" />

            <div className="relative">
              <div className="eyebrow">
                <Sparkles size={14} />
                Keep iterating
              </div>

              <h2 className="mx-auto mt-6 max-w-3xl text-4xl font-semibold tracking-tight text-white md:text-6xl">
                Re-run the audit whenever your stack changes.
              </h2>

              <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-200">
                Tool mix, seat counts, and vendor pricing shift constantly. The
                strongest spend posture is one you revisit, not one you assume.
              </p>

              <div className="mt-10">
                <Link
                  to="/audit"
                  className="group inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-base font-semibold text-[#081018] transition-transform duration-300 hover:-translate-y-0.5"
                >
                  Run a new audit
                  <ArrowRight
                    size={18}
                    className="ml-2 transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SharedResult;
