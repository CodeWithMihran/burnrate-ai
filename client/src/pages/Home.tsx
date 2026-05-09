import { Link } from "react-router-dom";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  FileStack,
  Share2,
  Shield,
  Sparkles,
  Zap,
} from "lucide-react";

const features = [
  {
    icon: FileStack,
    title: "Structured review",
    description:
      "Every tool gets its own clean evaluation space so teams can see pricing choices without digging through scattered subscriptions.",
  },
  {
    icon: BarChart3,
    title: "No-noise output",
    description:
      "Recommendations are tied to plans and seats, so the output reads like an operator memo rather than a generic AI answer.",
  },
  {
    icon: Share2,
    title: "Shareable audits",
    description:
      "Each finished audit can be saved and shared publicly as a lightweight decision doc with teammates or leadership.",
  },
];

const workflow = [
  {
    step: "01",
    title: "Add Your Stack",
    description:
      "Enter the tools, plans, spend, and seat counts your team currently uses.",
  },
  {
    step: "02",
    title: "Run The Audit",
    description:
      "BurnRate.ai compares your setup against tighter-fit pricing paths.",
  },
  {
    step: "03",
    title: "Review Result",
    description:
      "See the savings summary, tool-by-tool actions, and AI takeaways.",
  },
  {
    step: "04",
    title: "Act On It",
    description:
      "Share the report or book a consultation for high-savings cases.",
  },
];

const Home = () => {
  return (
    <div className="bg-[#fcfcfd]">
      <section
        id="home"
        className="relative overflow-hidden pb-16 pt-28 md:pb-20 md:pt-32"
      >
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 h-[420px] w-[680px] -translate-x-1/2 rounded-full bg-gradient-to-b from-blue-50/80 to-transparent blur-3xl" />
        </div>

        <div className="container-custom max-w-6xl">
          <div className="mx-auto max-w-4xl text-center">
            <div className="eyebrow">
              <Sparkles size={14} />
              Intelligent AI Spend Auditing
            </div>

            <h1 className="mt-6 text-5xl font-extrabold leading-[1.05] tracking-tight text-[#111827] md:text-6xl lg:text-7xl">
              Your entire AI spend,
              <br />
              <span className="gradient-text">organized in one place.</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-500 md:text-xl">
              BurnRate.ai is the clean workspace for startups to audit
              subscriptions, reduce tool sprawl, and optimize burn rate with
              more structure.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                to="/audit"
                className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-[#111827] px-8 py-4 text-base font-bold text-white shadow-lg shadow-gray-200 transition-all hover:scale-[1.02] hover:bg-black active:scale-[0.98]"
              >
                Start Free Audit
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
              <a
                href="#features"
                className="rounded-2xl border border-gray-200 bg-white px-8 py-4 text-base font-bold text-gray-600 transition-all hover:bg-gray-50 active:scale-[0.98]"
              >
                Explore Features
              </a>
            </div>
          </div>

          <div className="mx-auto mt-14 max-w-5xl border-t border-gray-100 pt-6">
            <p className="mb-4 text-center text-xs font-bold uppercase tracking-[0.22em] text-gray-400">
              Analysis Engine Optimized For
            </p>
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm font-bold uppercase tracking-[0.14em] text-gray-500 md:gap-x-12">
              <span className="flex items-center gap-2">
                <CheckCircle2 size={15} />
                Plan Matching
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 size={15} />
                Seat Logic
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 size={15} />
                API Burn
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-20">
        <div className="container-custom max-w-4xl text-center">
          <div className="mb-6 flex justify-center">
            <div className="h-1 w-14 rounded-full bg-blue-600" />
          </div>

          <h2 className="text-3xl font-bold leading-tight text-[#111827] md:text-4xl lg:text-5xl">
            AI tools are everywhere.
            <br />
            Spend discipline usually is not.
          </h2>

          <div className="mx-auto mt-8 max-w-3xl rounded-3xl bg-gray-50 p-8 text-left md:p-9">
            <p className="text-lg italic leading-8 text-gray-600">
              "We adopted fast to stay competitive, but now we have three
              different coding assistants and half our seats are not even being
              used."
            </p>
            <p className="mt-5 text-sm font-bold uppercase tracking-wider text-blue-600">
              - Startup Ops Manager
            </p>
          </div>
        </div>
      </section>

      <section id="features" className="bg-[#fcfcfd] py-16 md:py-20">
        <div className="container-custom max-w-6xl">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-[#111827] md:text-4xl lg:text-5xl">
              Professional-grade auditing
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-500">
              Simple, structured, and built to feel more like an OS than a
              form.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {features.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="glass-card rounded-[28px] p-8 transition-all hover:border-blue-100 hover:shadow-xl hover:shadow-blue-50"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-50 text-amber-500">
                  <Icon size={24} />
                </div>
                <h3 className="text-2xl font-bold text-[#111827]">{title}</h3>
                <p className="mt-4 text-base leading-8 text-gray-500">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="workflow" className="bg-white py-16 md:py-20">
        <div className="container-custom max-w-6xl">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-[#111827] md:text-4xl lg:text-5xl">
              The Audit Flow
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {workflow.map((item) => (
              <div
                key={item.step}
                className="rounded-[28px] border border-gray-100 bg-[#fcfcfd] p-7 text-center"
              >
                <div className="mb-5 text-4xl font-black tracking-tight text-gray-200">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-[#111827]">
                  {item.title}
                </h3>
                <p className="mt-3 leading-7 text-gray-500">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container-custom max-w-6xl">
          <div className="relative overflow-hidden rounded-[36px] bg-[#111827] px-8 py-12 text-white md:px-12 md:py-14">
            <div className="absolute right-0 top-0 h-48 w-48 translate-x-1/3 -translate-y-1/3 rounded-full bg-blue-600 opacity-20 blur-[100px]" />

            <div className="relative z-10 grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="max-w-2xl">
                <h2 className="text-4xl font-extrabold leading-tight md:text-5xl">
                  Built for teams,
                  <br />
                  not just solo prompts.
                </h2>

                <div className="mt-7 space-y-5">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white">
                      <Shield size={18} />
                    </div>
                    <p className="text-lg leading-7 text-gray-300">
                      Audit a whole stack, not one subscription in isolation.
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white">
                      <Shield size={18} />
                    </div>
                    <p className="text-lg leading-7 text-gray-300">
                      Save reports, share results, and route high-savings cases
                      toward consultation.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-[24px] bg-white p-6 text-black shadow-2xl">
                <p className="mb-2 text-xs font-bold uppercase tracking-wider text-blue-600">
                  Sample Snapshot
                </p>
                <h4 className="mb-4 text-2xl font-bold">AI Spend Overview</h4>
                <div className="space-y-4">
                  <div>
                    <div className="mb-2 flex justify-between text-sm">
                      <span>Current spend</span>
                      <span className="font-bold">$1,260</span>
                    </div>
                    <div className="h-2.5 w-full overflow-hidden rounded-full bg-gray-100">
                      <div className="h-full w-full bg-green-500" />
                    </div>
                  </div>
                  <div>
                    <div className="mb-2 flex justify-between text-sm">
                      <span>Optimized spend</span>
                      <span className="font-bold">$670</span>
                    </div>
                    <div className="h-2.5 w-full overflow-hidden rounded-full bg-gray-100">
                      <div className="h-full w-[53%] bg-blue-500" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-20">
        <div className="container-custom max-w-5xl text-center">
          <h2 className="text-4xl font-extrabold text-[#111827] md:text-5xl">
            Ready to optimize?
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-gray-500">
            Join startups that are cutting redundant AI costs through more
            structured spend auditing.
          </p>
          <div className="mt-8">
            <Link
              to="/audit"
              className="inline-flex items-center gap-2 rounded-2xl bg-[#111827] px-10 py-4 text-lg font-bold text-white transition-all hover:scale-[1.02] hover:bg-black active:scale-[0.98]"
            >
              Get Started
              <Zap size={18} fill="currentColor" />
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm font-medium text-gray-500">
            <span className="flex items-center gap-2">
              <Shield size={15} />
              Privacy-First
            </span>
            <span className="flex items-center gap-2">
              <Shield size={15} />
              No CC Required
            </span>
            <span className="flex items-center gap-2">
              <Shield size={15} />
              PDF Export
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
