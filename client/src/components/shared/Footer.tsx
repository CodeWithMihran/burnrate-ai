import { Link } from "react-router-dom";
import { Mail, Share2, Sparkles } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative mt-24 border-t border-white/10 bg-[rgba(8,16,24,0.78)] backdrop-blur-2xl">
      <div className="hero-mesh absolute inset-0 -z-10 opacity-70" />

      <div className="container-custom">
        <div className="grid gap-12 py-16 lg:grid-cols-[1.3fr_0.7fr_0.8fr]">
          <div className="max-w-lg">
            <Link
              to="/"
              className="inline-flex items-center gap-3 transition-opacity duration-300 hover:opacity-85"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0f9f95] via-[#6bd2c7] to-[#f0a36b]">
                <Sparkles size={18} className="text-[#041015]" />
              </div>

              <div>
                <h2 className="text-lg font-semibold tracking-tight text-white">
                  BurnRate.ai
                </h2>
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                  Audit before you overbuy
                </p>
              </div>
            </Link>

            <p className="mt-5 max-w-md text-sm leading-7 text-slate-400">
              BurnRate.ai helps teams pressure-test what they pay for ChatGPT,
              Claude, Copilot, Cursor, and API access so they can keep the
              productivity lift without carrying unnecessary spend.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-slate-300">
                Shareable reports
              </span>
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-slate-300">
                Lead capture
              </span>
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-slate-300">
                Consultation ready
              </span>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-white">
              Explore
            </h3>

            <div className="mt-5 flex flex-col gap-3">
              <Link
                to="/"
                className="text-sm text-slate-400 transition-colors duration-300 hover:text-white"
              >
                Product overview
              </Link>
              <Link
                to="/audit"
                className="text-sm text-slate-400 transition-colors duration-300 hover:text-white"
              >
                Run an audit
              </Link>
              <a
                href="#how-it-works"
                className="text-sm text-slate-400 transition-colors duration-300 hover:text-white"
              >
                How it works
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-white">
              Contact
            </h3>

            <div className="mt-5 space-y-3">
              <a
                href="mailto:hello@burnrate.ai"
                className="inline-flex w-full items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300 transition-all duration-300 hover:border-[#0f9f95]/40 hover:bg-[#0f9f95]/10 hover:text-white"
              >
                <Mail size={16} />
                hello@burnrate.ai
              </a>

              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm text-slate-400">
                <div className="mb-2 inline-flex items-center gap-2 text-white">
                  <Share2 size={16} className="text-[#6bd2c7]" />
                  Built for founder-grade decisions
                </div>
                Audits are instant, public-shareable, and designed to surface a
                real next step instead of vague cost advice.
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-white/10 py-6 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
          <p>&copy; {new Date().getFullYear()} BurnRate.ai. Smarter AI spend, less guesswork.</p>
          <p>Designed to feel useful before it asks for anything in return.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
