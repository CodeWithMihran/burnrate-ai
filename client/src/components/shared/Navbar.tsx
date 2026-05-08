import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, Menu, Sparkles, X } from "lucide-react";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Audit", path: "/audit" },
];

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[rgba(8,16,24,0.72)] backdrop-blur-2xl">
      <div className="container-custom">
        <div className="flex h-18 items-center justify-between py-4">
          <Link
            to="/"
            onClick={closeMenu}
            className="flex items-center gap-3 transition-opacity duration-300 hover:opacity-85"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0f9f95] via-[#6bd2c7] to-[#f0a36b] shadow-[0_14px_32px_rgba(15,159,149,0.28)]">
              <Sparkles size={18} className="text-[#041015]" />
            </div>

            <div className="flex flex-col">
              <span className="text-base font-semibold tracking-tight text-white">
                BurnRate.ai
              </span>
              <span className="text-xs uppercase tracking-[0.18em] text-slate-400">
                AI Spend Auditor
              </span>
            </div>
          </Link>

          <nav className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] p-2 md:flex">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;

              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-white text-[#071017] shadow-sm"
                      : "text-slate-300 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:block">
            <Link
              to="/audit"
              className="group inline-flex items-center justify-center rounded-full bg-[#0f9f95] px-5 py-3 text-sm font-semibold text-[#041015] shadow-[0_14px_28px_rgba(15,159,149,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#20b4a9]"
            >
              Run Free Audit
              <ArrowRight
                size={16}
                className="ml-2 transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen((current) => !current)}
            className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-slate-200 md:hidden"
            aria-label={isOpen ? "Close navigation" : "Open navigation"}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {isOpen ? (
          <div className="pb-4 md:hidden">
            <div className="glass-card rounded-[28px] p-4">
              <nav className="space-y-2">
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.path;

                  return (
                    <Link
                      key={link.name}
                      to={link.path}
                      onClick={closeMenu}
                      className={`block rounded-2xl px-4 py-3 text-sm font-medium transition-colors duration-300 ${
                        isActive
                          ? "bg-white text-[#081018]"
                          : "text-slate-200 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      {link.name}
                    </Link>
                  );
                })}
              </nav>

              <Link
                to="/audit"
                onClick={closeMenu}
                className="mt-4 inline-flex w-full items-center justify-center rounded-2xl bg-[#0f9f95] px-5 py-3.5 text-sm font-semibold text-[#041015]"
              >
                Start Your Audit
              </Link>
            </div>
          </div>
        ) : null}
      </div>
    </header>
  );
};

export default Navbar;
