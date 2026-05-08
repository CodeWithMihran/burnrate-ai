import { Link } from "react-router-dom";
import {
  ArrowRight,
  BadgeDollarSign,
  CheckCircle2,
  ChevronRight,
  CircleDashed,
  Radar,
  ShieldCheck,
  Sparkles,
  WandSparkles,
} from "lucide-react";

const supportedTools = [
  "ChatGPT",
  "Claude",
  "Cursor",
  "GitHub Copilot",
  "OpenAI API",
  "Anthropic API",
  "Gemini",
  "Windsurf",
];

const productSignals = [
  "Instant audit before email gate",
  "Shareable public result URLs",
  "AI summary plus rule-based recommendations",
];

const featureCards = [
  {
    title: "Plan-level pricing intelligence",
    description:
      "Spot when a team is on the wrong subscription tier, overbuying seats, or paying enterprise pricing without clear justification.",
    icon: BadgeDollarSign,
  },
  {
    title: "Human-readable recommendations",
    description:
      "Every savings suggestion is framed in plain language so a founder, finance lead, or ops teammate can understand the tradeoff fast.",
    icon: WandSparkles,
  },
  {
    title: "Lead capture after value",
    description:
      "Users see the result first, then decide whether to save the report, ask for updates, or book a high-savings consultation.",
    icon: ShieldCheck,
  },
];

const processSteps = [
  {
    step: "01",
    title: "Map your current stack",
    description:
      "Add the tools your team uses, the plan you pay for, the seats involved, and what kind of work those tools support.",
  },
  {
    step: "02",
    title: "Run the savings audit",
    description:
      "BurnRate.ai compares your current spend with tighter-fit plans, alternative paths, and realistic optimization scenarios.",
  },
  {
    step: "03",
    title: "Act on the right next step",
    description:
      "Share the report, save it by email, or book a consultation when the projected savings are large enough to justify deeper help.",
  },
];

const Home = () => {
  return (
    <div className="relative overflow-hidden">
      <div className="hero-mesh" />
      <div className="floating-orb absolute left-[6%] top-28 -z-10 h-44 w-44 rounded-full bg-[#0f9f95]/12 blur-[90px]" />
      <div className="floating-orb absolute right-[4%] top-52 -z-10 h-56 w-56 rounded-full bg-[#f0a36b]/15 blur-[110px]" />

      <section className="section-spacing relative overflow-hidden pb-10 pt-16 md:pt-24">
        <div className="container-custom">
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <div className="eyebrow stagger-fade">
                <Sparkles size={14} />
                AI spend audit for startup teams
              </div>

              <h1 className="stagger-fade mt-7 max-w-4xl text-5xl font-semibold tracking-tight text-white md:text-7xl">
                Audit your AI stack like a
                <span className="gradient-text"> careful operator,</span> not a
                casual buyer.
              </h1>

              <p className="stagger-fade mt-7 max-w-2xl text-lg leading-8 text-slate-300 md:text-xl">
                BurnRate.ai reviews your tools, plans, seats, and use case to
                show where your team is overspending, where you are already
                optimized, and when a Credex conversation is actually worth it.
              </p>

              <div className="stagger-fade mt-9 flex flex-col gap-4 sm:flex-row">
                <Link
                  to="/audit"
                  className="group inline-flex items-center justify-center rounded-full bg-[#0f9f95] px-7 py-4 text-base font-semibold text-[#041015] shadow-[0_20px_40px_rgba(15,159,149,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1db7ab]"
                >
                  Run Free Audit
                  <ArrowRight
                    size={18}
                    className="ml-2 transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>

                <a
                  href="#how-it-works"
                  className="inline-flex items-center justify-center rounded-full border border-white/12 bg-white/[0.04] px-7 py-4 text-base font-semibold text-white transition-all duration-300 hover:border-[#6bd2c7]/30 hover:bg-white/[0.07]"
                >
                  See how it works
                </a>
              </div>

              <div className="mt-10 flex flex-wrap gap-3">
                {productSignals.map((signal) => (
                  <div
                    key={signal}
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-slate-300"
                  >
                    <CheckCircle2 size={16} className="text-[#6bd2c7]" />
                    {signal}
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="panel-card relative overflow-hidden rounded-[32px] p-6 md:p-8">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                <div className="flex items-center justify-between rounded-[28px] border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-slate-300">
                  <div className="flex items-center gap-2">
                    <CircleDashed size={16} className="text-[#6bd2c7]" />
                    Live savings preview
                  </div>
                  <span className="rounded-full bg-[#0f9f95]/12 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#b5f6ef]">
                    founder mode
                  </span>
                </div>

                <div className="mt-6 rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm uppercase tracking-[0.18em] text-slate-400">
                        Estimated annual savings
                      </p>
                      <h2 className="mt-3 text-5xl font-semibold text-white">
                        $7,080
                      </h2>
                    </div>

                    <div className="rounded-2xl bg-[#f0a36b]/12 px-4 py-3 text-right text-sm text-[#ffd7b5]">
                      <div>4 tools analyzed</div>
                      <div>2 actions recommended</div>
                    </div>
                  </div>

                  <div className="mt-8 space-y-4">
                    <div className="rounded-3xl border border-[#0f9f95]/20 bg-[#0f9f95]/10 p-4">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="text-sm font-semibold text-white">
                            ChatGPT Team to Plus mix
                          </p>
                          <p className="mt-1 text-sm text-slate-300">
                            Your current seat count suggests some light users do
                            not need the team tier.
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs uppercase tracking-[0.18em] text-[#b5f6ef]">
                            Monthly
                          </p>
                          <p className="text-2xl font-semibold text-white">
                            $280
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-4">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="text-sm font-semibold text-white">
                            Claude Team vs API direct mix
                          </p>
                          <p className="mt-1 text-sm text-slate-300">
                            High-spend usage may be cheaper with a hybrid seat
                            plus API approach.
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                            Monthly
                          </p>
                          <p className="text-2xl font-semibold text-white">
                            $310
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5 text-sm text-slate-400">
                    <div className="flex items-center gap-2">
                      <Radar size={16} className="text-[#6bd2c7]" />
                      Result includes AI summary, public URL, and lead intent
                    </div>
                    <ChevronRight size={16} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-8">
        <div className="container-custom">
          <div className="glass-card grid gap-5 rounded-[32px] p-6 md:grid-cols-[1fr_auto] md:items-center md:p-8">
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-[#b5f6ef]">
                Supported stack coverage
              </p>
              <p className="mt-3 max-w-2xl text-base text-slate-300">
                Designed around the tools startup teams actually combine across
                product, engineering, research, and content workflows.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {supportedTools.map((tool) => (
                <span
                  key={tool}
                  className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm text-slate-200"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-spacing pb-8">
        <div className="container-custom">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="glass-card metric-glow rounded-[30px] p-8">
              <p className="text-sm uppercase tracking-[0.18em] text-slate-400">
                Time to value
              </p>
              <h3 className="mt-4 text-4xl font-semibold text-white">Under 5 minutes</h3>
              <p className="mt-3 text-sm text-slate-400">
                Users get an answer before they are asked for email, account
                creation, or a sales call.
              </p>
            </div>

            <div className="glass-card metric-glow rounded-[30px] p-8">
              <p className="text-sm uppercase tracking-[0.18em] text-slate-400">
                Recommendation style
              </p>
              <h3 className="mt-4 text-4xl font-semibold text-white">Specific, not fuzzy</h3>
              <p className="mt-3 text-sm text-slate-400">
                Suggestions are tied to seats, spend, current plan, and usage
                context so they feel financially defensible.
              </p>
            </div>

            <div className="glass-card metric-glow rounded-[30px] p-8">
              <p className="text-sm uppercase tracking-[0.18em] text-slate-400">
                Public sharing
              </p>
              <h3 className="mt-4 text-4xl font-semibold text-white">Result-ready links</h3>
              <p className="mt-3 text-sm text-slate-400">
                Each audit can be shared with a clean public URL for teammates,
                decision-makers, or async review.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-spacing" id="features">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl text-center">
            <div className="eyebrow">
              <Sparkles size={14} />
              Product strengths
            </div>
            <h2 className="mt-6 text-4xl font-semibold tracking-tight text-white md:text-6xl">
              Built to feel like a product, not a spreadsheet with a button
            </h2>
            <p className="mt-6 text-lg text-slate-400">
              The experience is designed around clarity, trust, and useful
              next-step decisions for teams trying to control AI spend without
              slowing down adoption.
            </p>
          </div>

          <div className="mt-16 grid gap-6 lg:grid-cols-3">
            {featureCards.map(({ title, description, icon: Icon }) => (
              <div
                key={title}
                className="glass-card rounded-[30px] p-8 transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="inline-flex rounded-2xl bg-[#0f9f95]/12 p-4 text-[#79e0d8]">
                  <Icon size={28} />
                </div>

                <h3 className="mt-6 text-2xl font-semibold text-white">{title}</h3>
                <p className="mt-4 text-base leading-7 text-slate-400">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-spacing" id="how-it-works">
        <div className="container-custom">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <div className="eyebrow">
                <Sparkles size={14} />
                How it works
              </div>
              <h2 className="mt-6 text-4xl font-semibold tracking-tight text-white md:text-5xl">
                Fast enough for founders, clear enough for finance.
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-400">
                The flow stays simple for the user, but the output gives enough
                structure to support a real decision rather than a vague prompt
                response.
              </p>
            </div>

            <div className="space-y-5">
              {processSteps.map((item) => (
                <div
                  key={item.step}
                  className="glass-card rounded-[30px] p-6 md:p-7"
                >
                  <div className="flex flex-col gap-4 md:flex-row md:items-start">
                    <div className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white text-lg font-semibold text-[#081018]">
                      {item.step}
                    </div>

                    <div>
                      <h3 className="text-2xl font-semibold text-white">
                        {item.title}
                      </h3>
                      <p className="mt-3 text-base leading-7 text-slate-400">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
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
                Ready when you are
              </div>

              <h2 className="mx-auto mt-6 max-w-3xl text-4xl font-semibold tracking-tight text-white md:text-6xl">
                Start with the audit. Let the product earn the next step.
              </h2>

              <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-200">
                Run the flow, inspect the recommendations, and see whether your
                stack looks expensive, healthy, or worth a deeper consultation.
              </p>

              <div className="mt-10">
                <Link
                  to="/audit"
                  className="group inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-base font-semibold text-[#081018] transition-transform duration-300 hover:-translate-y-0.5"
                >
                  Start your free audit
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

export default Home;
