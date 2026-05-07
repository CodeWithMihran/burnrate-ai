import { Link, useLocation } from "react-router-dom";
import { Sparkles } from "lucide-react";

const Navbar = () => {
  const location = useLocation();

  const navLinks = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Audit",
      path: "/audit",
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[rgba(11,15,25,0.7)] backdrop-blur-xl">
      <div className="container-custom">
        <div className="flex h-16 items-center justify-between">
          
          {/* ----------------------------------
              LOGO / BRAND
          ---------------------------------- */}
          <Link
            to="/"
            className="flex items-center gap-2 transition-opacity duration-300 hover:opacity-80"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-violet-400 shadow-lg shadow-violet-500/20">
              <Sparkles size={18} className="text-white" />
            </div>

            <div className="flex flex-col">
              <span className="text-sm font-semibold tracking-tight text-white">
                BurnRate.ai
              </span>

              <span className="text-[11px] text-slate-400">
                AI Spend Optimizer
              </span>
            </div>
          </Link>

          {/* ----------------------------------
              NAVIGATION
          ---------------------------------- */}
          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;

              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative text-sm font-medium transition-colors duration-300 ${
                    isActive
                      ? "text-white"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {link.name}

                  {isActive && (
                    <span className="absolute -bottom-2 left-0 h-[2px] w-full rounded-full bg-violet-500" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* ----------------------------------
              CTA BUTTON
          ---------------------------------- */}
          <Link
            to="/audit"
            className="group inline-flex items-center justify-center rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-violet-500 hover:shadow-lg hover:shadow-violet-500/25"
          >
            Run Free Audit

            <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;