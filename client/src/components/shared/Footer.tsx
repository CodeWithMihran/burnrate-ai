import { Link } from "react-router-dom";
import { Sparkles, Github, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative mt-24 border-t border-white/10 bg-[rgba(255,255,255,0.02)] backdrop-blur-xl">
      
      {/* ----------------------------------
          BACKGROUND GLOW
      ---------------------------------- */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_bottom,rgba(124,58,237,0.15),transparent_45%)]" />

      <div className="container-custom">
        <div className="flex flex-col gap-12 py-14 md:flex-row md:items-start md:justify-between">
          
          {/* ----------------------------------
              BRAND SECTION
          ---------------------------------- */}
          <div className="max-w-sm">
            <Link
              to="/"
              className="inline-flex items-center gap-3 transition-opacity duration-300 hover:opacity-80"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-violet-400 shadow-lg shadow-violet-500/20">
                <Sparkles size={18} className="text-white" />
              </div>

              <div>
                <h2 className="text-lg font-bold tracking-tight text-white">
                  BurnRate.ai
                </h2>

                <p className="text-xs text-slate-400">
                  AI Spend Optimizer
                </p>
              </div>
            </Link>

            <p className="mt-5 text-sm leading-7 text-slate-400">
              BurnRate.ai helps teams analyze and reduce unnecessary spending on AI tools like ChatGPT, Claude, and other subscriptions through intelligent cost optimization.
            </p>
          </div>

          {/* ----------------------------------
              QUICK LINKS
          ---------------------------------- */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Navigation
            </h3>

            <div className="flex flex-col gap-3">
              <Link
                to="/"
                className="text-sm text-slate-400 transition-colors duration-300 hover:text-white"
              >
                Home
              </Link>

              <Link
                to="/audit"
                className="text-sm text-slate-400 transition-colors duration-300 hover:text-white"
              >
                Run Audit
              </Link>
            </div>
          </div>

          {/* ----------------------------------
              SOCIALS / CONTACT
          ---------------------------------- */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Connect
            </h3>

            <div className="flex items-center gap-4">
              
              <a
                href="#"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-400 transition-all duration-300 hover:border-violet-500/30 hover:bg-violet-500/10 hover:text-white"
              >
                <Github size={18} />
              </a>

              <a
                href="#"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-400 transition-all duration-300 hover:border-violet-500/30 hover:bg-violet-500/10 hover:text-white"
              >
                <Linkedin size={18} />
              </a>

              <a
                href="mailto:hello@burnrate.ai"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-400 transition-all duration-300 hover:border-violet-500/30 hover:bg-violet-500/10 hover:text-white"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* ----------------------------------
            BOTTOM BAR
        ---------------------------------- */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 py-6 text-center md:flex-row">
          
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} BurnRate.ai — Built for smarter AI spending.
          </p>

          <p className="text-sm text-slate-500">
            Designed & developed with focus on clean UX and product thinking.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;