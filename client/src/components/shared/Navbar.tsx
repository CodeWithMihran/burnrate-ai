import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, Menu, X } from "lucide-react";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Features", path: "/#features" },
  { name: "Workflow", path: "/#workflow" },
];

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  const isAuditPage = location.pathname === "/audit";

  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-[#0a0a0a]/90 backdrop-blur-md">
      <div className="container-custom">
        <div className="flex h-20 items-center justify-between transition-all duration-300">
          <Link
            to="/"
            onClick={closeMenu}
            className="group flex items-center gap-4"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-lg font-black italic text-white shadow-[0_0_24px_rgba(255,255,255,0.08)]">
              BR
            </div>

            <div className="flex flex-col">
              <div className="flex items-baseline">
                <span className="text-2xl font-black uppercase italic tracking-tighter text-white">
                  Burn
                </span>
                <span className="ml-2 bg-gradient-to-r from-gray-100 via-white to-gray-500 bg-clip-text text-2xl font-extralight tracking-tight text-transparent">
                  Rate<span className="font-bold">AI</span>
                </span>
              </div>
              <div className="mt-1 h-[2px] w-0 bg-gradient-to-r from-blue-500 to-transparent transition-all duration-500 group-hover:w-full" />
            </div>
          </Link>

          <div className="hidden items-center gap-10 md:flex">
            <div className="flex items-center gap-8 text-[13px] font-semibold uppercase tracking-[0.2em] text-gray-400">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.path}
                  className="relative transition-colors duration-300 hover:text-white"
                >
                  {link.name}
                  <span className="absolute -bottom-2 left-0 h-[2px] w-0 bg-gradient-to-r from-white to-transparent transition-all duration-300 hover:w-full" />
                </a>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <Link
                to={isAuditPage ? "/" : "/audit"}
                className="text-sm font-medium text-white/70 transition-colors hover:text-white"
              >
                {isAuditPage ? "Back to Home" : "Run Audit"}
              </Link>
              <Link
                to="/audit"
                className="inline-flex items-center rounded-full bg-white px-6 py-2.5 text-sm font-bold text-black shadow-[0_0_20px_rgba(255,255,255,0.08)] transition-all hover:scale-[1.03] hover:bg-gray-200"
              >
                Get Started
              </Link>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen((current) => !current)}
            className="rounded-xl p-2 text-white md:hidden"
            aria-label={isOpen ? "Close navigation" : "Open navigation"}
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {isOpen ? (
        <div className="border-t border-white/10 bg-[#0a0a0a] md:hidden">
          <div className="container-custom py-6">
            <div className="flex flex-col gap-4 text-center font-medium">
              <Link
                to="/"
                onClick={closeMenu}
                className="rounded-xl py-3 text-gray-300 transition-colors hover:bg-white/5 hover:text-white"
              >
                Home
              </Link>
              <a
                href="/#features"
                onClick={closeMenu}
                className="rounded-xl py-3 text-gray-300 transition-colors hover:bg-white/5 hover:text-white"
              >
                Features
              </a>
              <a
                href="/#workflow"
                onClick={closeMenu}
                className="rounded-xl py-3 text-gray-300 transition-colors hover:bg-white/5 hover:text-white"
              >
                Workflow
              </a>
              <Link
                to="/audit"
                onClick={closeMenu}
                className="inline-flex items-center justify-center rounded-2xl bg-white px-6 py-3 font-bold text-black"
              >
                Start Audit
                <ArrowRight size={16} className="ml-2" />
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
};

export default Navbar;
