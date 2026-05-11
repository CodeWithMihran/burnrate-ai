const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-[#0a0a0a] pb-10 pt-20 text-white">
      <div className="container-custom">
        <div className="grid auto-rows-fr gap-12 md:grid-cols-12 lg:gap-16">
          <div className="flex h-full flex-col md:col-span-5 lg:col-span-4">
            <div className="mb-6 flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-sm font-black italic text-white">
                BR
              </div>
              <div className="flex items-baseline">
                <span className="text-xl font-black uppercase italic tracking-tighter text-white">
                  Burn
                </span>
                <span className="ml-1.5 text-xl font-extralight tracking-tight text-gray-400">
                  Rate<span className="font-bold text-white">AI</span>
                </span>
              </div>
            </div>

            <p className="mb-6 min-h-[108px] max-w-sm text-sm leading-relaxed text-gray-500">
              A founder-style AI spend audit experience that turns scattered
              subscriptions, seats, and usage into a cleaner decision path for
              teams trying to spend with more discipline.
            </p>

            <div className="flex gap-4">
              <a
                href="mailto:hello@burnrate.ai"
                className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300 transition-all duration-300 hover:bg-white hover:text-black"
              >
                Email
              </a>
              <a
                href="/audit"
                className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300 transition-all duration-300 hover:bg-[#2383e2] hover:text-white"
              >
                Run Audit
              </a>
            </div>
          </div>

          <div className="flex h-full flex-col md:col-span-2 lg:col-span-2">
            <h3 className="mb-6 text-sm font-bold uppercase tracking-[0.2em] text-white">
              Platform
            </h3>
            <ul className="space-y-4 text-sm text-gray-500">
              <li>
                <a href="/#home" className="transition-colors duration-200 hover:text-white">
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/#features"
                  className="transition-colors duration-200 hover:text-white"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="/#workflow"
                  className="transition-colors duration-200 hover:text-white"
                >
                  Workflow
                </a>
              </li>
              <li>
                <a
                  href="/audit"
                  className="font-medium text-white/80 underline decoration-blue-500 underline-offset-8 hover:text-white"
                >
                  Get Started
                </a>
              </li>
            </ul>
          </div>

          <div className="flex h-full flex-col md:col-span-2 lg:col-span-3">
            <h3 className="mb-6 text-sm font-bold uppercase tracking-[0.2em] text-white">
              Audit Coverage
            </h3>
            <ul className="space-y-4 text-sm text-gray-500">
              {[
                "Seat-based plans",
                "API direct pricing",
                "Shareable public reports",
                "Consultation-ready savings flow",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-blue-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex h-full md:col-span-3 lg:col-span-3">
            <div className="h-full w-full rounded-2xl border border-white/10 bg-white/5 p-6">
              <h3 className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-white">
                Built For
              </h3>
              <p className="mb-2 text-base font-semibold text-white">
                Lean startup teams
              </p>
              <p className="mb-4 text-xs text-gray-500">
                Useful before asking for a call
              </p>
              <p className="break-words text-xs font-medium text-blue-400">
                Teams comparing ChatGPT, Claude, Copilot, Cursor, Gemini, and
                API-heavy workflows.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 flex min-h-[44px] flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-[13px] md:flex-row">
          <p className="text-gray-600">
            &copy; {new Date().getFullYear()}{" "}
            <span className="font-medium text-gray-400">BurnRate.ai</span>. All
            rights reserved.
          </p>
          <div className="flex gap-6 text-gray-600">
            <span className="cursor-default hover:text-gray-400">
              Founder-style product build
            </span>
            <span className="cursor-default hover:text-gray-400">
              Privacy-first report flow
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
