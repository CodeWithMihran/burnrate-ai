import { Link } from "react-router-dom";
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  BarChart3,
  Zap,
  CheckCircle2,
} from "lucide-react";

const Home = () => {
  return (
    <div className="relative overflow-hidden">
      
      {/* ----------------------------------
          BACKGROUND GLOW EFFECTS
      ---------------------------------- */}
      <div className="absolute left-1/2 top-0 -z-10 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-violet-600/20 blur-[140px]" />

      <div className="absolute right-0 top-40 -z-10 h-[300px] w-[300px] rounded-full bg-fuchsia-500/10 blur-[120px]" />

      {/* ==================================
          HERO SECTION
      ================================== */}
      <section className="section-spacing relative">
        <div className="container-custom">
          <div className="mx-auto max-w-5xl text-center">
            
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-sm text-violet-200 backdrop-blur-xl">
              <Sparkles size={16} />
              AI Subscription Optimization Platform
            </div>

            {/* Headline */}
            <h1 className="mx-auto max-w-4xl text-5xl font-extrabold leading-tight tracking-tight text-white md:text-7xl">
              Stop Overspending on{" "}
              <span className="gradient-text">
                AI Tools
              </span>
            </h1>

            {/* Subheadline */}
            <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-slate-400 md:text-xl">
              BurnRate.ai analyzes your ChatGPT, Claude, and AI software spending
              to uncover hidden savings opportunities and smarter subscription plans.
            </p>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              
              <Link
                to="/audit"
                className="group inline-flex items-center justify-center rounded-2xl bg-violet-600 px-7 py-4 text-base font-semibold text-white transition-all duration-300 hover:bg-violet-500 hover:shadow-2xl hover:shadow-violet-500/30"
              >
                Run Free Audit

                <ArrowRight
                  size={18}
                  className="ml-2 transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>

              <a
                href="#features"
                className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-7 py-4 text-base font-semibold text-white transition-all duration-300 hover:border-violet-500/20 hover:bg-white/10"
              >
                Learn More
              </a>
            </div>

            {/* Trust Indicators */}
            <div className="mt-14 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-400">
              
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-violet-400" />
                Analyze ChatGPT & Claude
              </div>

              <div className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-violet-400" />
                Privacy-first audit flow
              </div>

              <div className="flex items-center gap-2">
                <Zap size={16} className="text-violet-400" />
                Personalized AI recommendations
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================
          STATS SECTION
      ================================== */}
      <section className="pb-12">
        <div className="container-custom">
          <div className="glass-card grid gap-6 rounded-3xl p-8 md:grid-cols-3">
            
            <div className="text-center">
              <h3 className="text-4xl font-bold text-white">$1,440+</h3>
              <p className="mt-2 text-sm text-slate-400">
                Average yearly savings identified
              </p>
            </div>

            <div className="text-center">
              <h3 className="text-4xl font-bold text-white">5 min</h3>
              <p className="mt-2 text-sm text-slate-400">
                Audit completion time
              </p>
            </div>

            <div className="text-center">
              <h3 className="text-4xl font-bold text-white">AI-Powered</h3>
              <p className="mt-2 text-sm text-slate-400">
                Smart recommendation engine
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================
          FEATURES SECTION
      ================================== */}
      <section
        id="features"
        className="section-spacing"
      >
        <div className="container-custom">
          
          {/* Section Header */}
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-violet-400">
              Features
            </p>

            <h2 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
              Everything you need to optimize AI spending
            </h2>

            <p className="mt-6 text-lg text-slate-400">
              BurnRate.ai combines pricing intelligence, usage analysis,
              and AI-powered recommendations to reduce unnecessary software costs.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="mt-16 grid gap-6 md:grid-cols-3">
            
            {/* Card 1 */}
            <div className="glass-card rounded-3xl p-8 transition-all duration-300 hover:-translate-y-1 hover:border-violet-500/20">
              <div className="mb-6 inline-flex rounded-2xl bg-violet-500/10 p-4 text-violet-300">
                <BarChart3 size={28} />
              </div>

              <h3 className="text-2xl font-semibold text-white">
                Smart Cost Analysis
              </h3>

              <p className="mt-4 text-slate-400 leading-7">
                Analyze current AI subscriptions and identify overpaying,
                redundant tools, and inefficient plans.
              </p>
            </div>

            {/* Card 2 */}
            <div className="glass-card rounded-3xl p-8 transition-all duration-300 hover:-translate-y-1 hover:border-violet-500/20">
              <div className="mb-6 inline-flex rounded-2xl bg-violet-500/10 p-4 text-violet-300">
                <Sparkles size={28} />
              </div>

              <h3 className="text-2xl font-semibold text-white">
                AI Recommendations
              </h3>

              <p className="mt-4 text-slate-400 leading-7">
                Receive personalized suggestions based on your team size,
                use case, and spending patterns.
              </p>
            </div>

            {/* Card 3 */}
            <div className="glass-card rounded-3xl p-8 transition-all duration-300 hover:-translate-y-1 hover:border-violet-500/20">
              <div className="mb-6 inline-flex rounded-2xl bg-violet-500/10 p-4 text-violet-300">
                <ShieldCheck size={28} />
              </div>

              <h3 className="text-2xl font-semibold text-white">
                Shareable Reports
              </h3>

              <p className="mt-4 text-slate-400 leading-7">
                Generate clean, shareable audit reports with estimated savings
                and actionable optimization insights.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================
          HOW IT WORKS
      ================================== */}
      <section className="section-spacing">
        <div className="container-custom">
          
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-violet-400">
              How it works
            </p>

            <h2 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
              Optimize your AI stack in minutes
            </h2>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            
            {[
              {
                step: "01",
                title: "Add Your Tools",
                description:
                  "Enter the AI tools, plans, and monthly spending your team currently uses.",
              },
              {
                step: "02",
                title: "Run AI Audit",
                description:
                  "BurnRate.ai analyzes your subscriptions using intelligent pricing and optimization rules.",
              },
              {
                step: "03",
                title: "Save More",
                description:
                  "Get personalized savings recommendations and shareable optimization reports.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="glass-card rounded-3xl p-8"
              >
                <div className="text-sm font-semibold tracking-[0.2em] text-violet-400">
                  {item.step}
                </div>

                <h3 className="mt-5 text-2xl font-semibold text-white">
                  {item.title}
                </h3>

                <p className="mt-4 leading-7 text-slate-400">
                  {item.description}
                </p>
              </div>
            ))}
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
              Start optimizing your AI spending today
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Discover hidden savings opportunities and make smarter decisions
              about your AI software stack.
            </p>

            <div className="mt-10">
              <Link
                to="/audit"
                className="group inline-flex items-center justify-center rounded-2xl bg-white px-8 py-4 text-base font-semibold text-black transition-all duration-300 hover:scale-[1.02]"
              >
                Run Free Audit

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

export default Home;