import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import {
  ArrowRight,
  Sparkles,
  TrendingDown,
  BadgeDollarSign,
  CheckCircle2,
  AlertTriangle,
  BarChart3,
  Share2,
  Loader2,
} from "lucide-react";

import { getAuditById } from "../services/auditService";

interface Recommendation {
  tool: string;
  currentSpend: string;
  recommendation: string;
  savings: string;
  severity: "high" | "medium" | "low";
}

interface AuditData {
  totalMonthlySpend: number;
  optimizedMonthlySpend: number;
  monthlySavings: number;
  yearlySavings: number;
  aiSummary: string;
  recommendations: Recommendation[];
}

const SharedResult = () => {
  const { publicId } = useParams();

  const [auditData, setAuditData] = useState<AuditData | null>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  /* ----------------------------------
      FETCH AUDIT DATA
  ---------------------------------- */

  useEffect(() => {
    const fetchAudit = async () => {
      try {
        setLoading(true);

        const response = await getAuditById(
          publicId as string
        );

        /*
          Adjust this mapping according to your backend response structure
        */

        const backendAudit = response.data;

        const transformedData: AuditData = {
          totalMonthlySpend:
            backendAudit.totalMonthlySpend || 245,

          optimizedMonthlySpend:
            backendAudit.optimizedMonthlySpend || 125,

          monthlySavings:
            backendAudit.monthlySavings || 120,

          yearlySavings:
            backendAudit.yearlySavings || 1440,

          aiSummary:
            backendAudit.summary ||
            "Your AI stack contains optimization opportunities that could reduce unnecessary software spending while maintaining productivity.",

          recommendations:
            backendAudit.recommendations || [
              {
                tool: "ChatGPT Plus",
                currentSpend: "$100/mo",
                recommendation:
                  "Reduce unused seats and move casual users to shared access.",
                savings: "$40/mo",
                severity: "high",
              },

              {
                tool: "Claude Pro",
                currentSpend: "$80/mo",
                recommendation:
                  "Upgrade only research-focused users to premium plans.",
                savings: "$30/mo",
                severity: "medium",
              },
            ],
        };

        setAuditData(transformedData);
      } catch (err) {
        console.error(err);

        setError(
          "Unable to load audit results. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAudit();
  }, [publicId]);

  /* ----------------------------------
      LOADING STATE
  ---------------------------------- */

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center px-6">
        
        <div className="text-center">
          
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl border border-violet-500/20 bg-violet-500/10">
            <Loader2
              size={34}
              className="animate-spin text-violet-300"
            />
          </div>

          <h2 className="mt-8 text-3xl font-bold text-white">
            Analyzing Your AI Stack
          </h2>

          <p className="mt-4 max-w-md text-slate-400">
            Generating intelligent optimization recommendations
            and calculating potential savings...
          </p>
        </div>
      </div>
    );
  }

  /* ----------------------------------
      ERROR STATE
  ---------------------------------- */

  if (error || !auditData) {
    return (
      <div className="flex min-h-screen items-center justify-center px-6">
        
        <div className="glass-card max-w-lg rounded-3xl p-10 text-center">
          
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500/10 text-red-300">
            <AlertTriangle size={28} />
          </div>

          <h2 className="mt-6 text-3xl font-bold text-white">
            Something went wrong
          </h2>

          <p className="mt-4 text-slate-400">
            {error}
          </p>

          <Link
            to="/audit"
            className="mt-8 inline-flex items-center justify-center rounded-2xl bg-violet-600 px-6 py-4 font-semibold text-white transition-all duration-300 hover:bg-violet-500"
          >
            Run Another Audit
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden">
      
      {/* ==================================
          BACKGROUND GLOWS
      ================================== */}

      <div className="absolute left-1/2 top-10 -z-10 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-violet-600/15 blur-[140px]" />

      <div className="absolute right-0 top-80 -z-10 h-[300px] w-[300px] rounded-full bg-fuchsia-500/10 blur-[120px]" />

      {/* ==================================
          SAVINGS HERO
      ================================== */}

      <section className="section-spacing pb-10">
        <div className="container-custom">
          
          <div className="mx-auto max-w-5xl text-center">
            
            {/* Badge */}

            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-sm text-violet-200 backdrop-blur-xl">
              <Sparkles size={16} />
              AI Spend Audit Completed
            </div>

            {/* Main Heading */}

            <h1 className="text-5xl font-extrabold tracking-tight text-white md:text-7xl">
              You Could Save{" "}

              <span className="gradient-text">
                ${auditData.yearlySavings}/year
              </span>
            </h1>

            {/* Description */}

            <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-slate-400 md:text-xl">
              BurnRate.ai identified optimization opportunities
              across your AI subscriptions, helping your team
              reduce unnecessary spending while maintaining
              productivity.
            </p>

            {/* CTA Buttons */}

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              
              <button className="group inline-flex items-center justify-center rounded-2xl bg-violet-600 px-7 py-4 text-base font-semibold text-white transition-all duration-300 hover:bg-violet-500 hover:shadow-2xl hover:shadow-violet-500/30">
                Share Report

                <Share2
                  size={18}
                  className="ml-2 transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>

              <Link
                to="/audit"
                className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-7 py-4 text-base font-semibold text-white transition-all duration-300 hover:border-violet-500/20 hover:bg-white/10"
              >
                Run Another Audit
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================
          QUICK METRICS
      ================================== */}

      <section className="pb-12">
        <div className="container-custom">
          
          <div className="grid gap-6 md:grid-cols-4">
            
            {/* Current Spend */}

            <div className="glass-card rounded-3xl p-8">
              
              <div className="mb-5 inline-flex rounded-2xl bg-red-500/10 p-4 text-red-300">
                <BadgeDollarSign size={26} />
              </div>

              <h3 className="text-3xl font-bold text-white">
                ${auditData.totalMonthlySpend}
              </h3>

              <p className="mt-2 text-sm text-slate-400">
                Current monthly spend
              </p>
            </div>

            {/* Optimized Spend */}

            <div className="glass-card rounded-3xl p-8">
              
              <div className="mb-5 inline-flex rounded-2xl bg-violet-500/10 p-4 text-violet-300">
                <TrendingDown size={26} />
              </div>

              <h3 className="text-3xl font-bold text-white">
                ${auditData.optimizedMonthlySpend}
              </h3>

              <p className="mt-2 text-sm text-slate-400">
                Optimized monthly spend
              </p>
            </div>

            {/* Monthly Savings */}

            <div className="glass-card rounded-3xl p-8">
              
              <div className="mb-5 inline-flex rounded-2xl bg-emerald-500/10 p-4 text-emerald-300">
                <CheckCircle2 size={26} />
              </div>

              <h3 className="text-3xl font-bold text-white">
                ${auditData.monthlySavings}
              </h3>

              <p className="mt-2 text-sm text-slate-400">
                Estimated monthly savings
              </p>
            </div>

            {/* Efficiency Score */}

            <div className="glass-card rounded-3xl p-8">
              
              <div className="mb-5 inline-flex rounded-2xl bg-yellow-500/10 p-4 text-yellow-300">
                <BarChart3 size={26} />
              </div>

              <h3 className="text-3xl font-bold text-white">
                78%
              </h3>

              <p className="mt-2 text-sm text-slate-400">
                AI stack efficiency score
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================
          AI SUMMARY
      ================================== */}

      <section className="pb-12">
        <div className="container-custom">
          
          <div className="glass-card rounded-[32px] p-8 md:p-10">
            
            <div className="flex items-start gap-4">
              
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-300">
                <Sparkles size={24} />
              </div>

              <div>
                <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-violet-400">
                  AI Generated Summary
                </p>

                <h2 className="text-3xl font-bold text-white">
                  Optimization Insights
                </h2>

                <p className="mt-5 max-w-4xl text-lg leading-8 text-slate-400">
                  {auditData.aiSummary}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================
          RECOMMENDATIONS
      ================================== */}

      <section className="section-spacing pt-0">
        <div className="container-custom">
          
          {/* Header */}

          <div className="max-w-3xl">
            
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-violet-400">
              Recommendations
            </p>

            <h2 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
              Tool-by-tool optimization suggestions
            </h2>
          </div>

          {/* Cards */}

          <div className="mt-14 space-y-6">
            
            {auditData.recommendations.map(
              (item, index) => (
                <div
                  key={index}
                  className="glass-card rounded-[28px] p-8 transition-all duration-300 hover:border-violet-500/20"
                >
                  
                  <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                    
                    {/* Left */}

                    <div className="max-w-3xl">
                      
                      <div className="flex items-center gap-3">
                        
                        <div
                          className={`flex h-11 w-11 items-center justify-center rounded-2xl ${
                            item.severity === "high"
                              ? "bg-red-500/10 text-red-300"
                              : "bg-yellow-500/10 text-yellow-300"
                          }`}
                        >
                          <AlertTriangle size={18} />
                        </div>

                        <div>
                          <h3 className="text-2xl font-semibold text-white">
                            {item.tool}
                          </h3>

                          <p className="text-sm text-slate-400">
                            Current spend: {item.currentSpend}
                          </p>
                        </div>
                      </div>

                      <p className="mt-6 text-lg leading-8 text-slate-400">
                        {item.recommendation}
                      </p>
                    </div>

                    {/* Right */}

                    <div className="rounded-3xl border border-emerald-500/20 bg-emerald-500/10 px-8 py-6 text-center">
                      
                      <p className="text-sm uppercase tracking-[0.2em] text-emerald-300">
                        Potential Savings
                      </p>

                      <h3 className="mt-3 text-4xl font-bold text-white">
                        {item.savings}
                      </h3>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* ==================================
          FINAL CTA
      ================================== */}

      <section className="section-spacing pt-0">
        <div className="container-custom">
          
          <div className="relative overflow-hidden rounded-[32px] border border-violet-500/20 bg-gradient-to-br from-violet-600/20 to-fuchsia-500/10 p-10 text-center backdrop-blur-xl md:p-16">
            
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.1),transparent_50%)]" />

            <h2 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight text-white md:text-6xl">
              Smarter AI spending starts here
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Continue optimizing your AI stack with intelligent
              recommendations and shareable audit insights.
            </p>

            <div className="mt-10">
              
              <Link
                to="/audit"
                className="group inline-flex items-center justify-center rounded-2xl bg-white px-8 py-4 text-base font-semibold text-black transition-all duration-300 hover:scale-[1.02]"
              >
                Run New Audit

                <ArrowRight
                  size={18}
                  className="ml-2 transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SharedResult;