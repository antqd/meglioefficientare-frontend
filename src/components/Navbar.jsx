import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

export default function Navbar({ cartCount = 0 }) {
  const [open, setOpen] = useState(false);

  // Link di navigazione: gli anchor (#...) NON usano NavLink => niente "active" arancione
  const NavItem = ({ to, children, external }) => {
    const isAnchor = typeof to === "string" && to.includes("#");

    if (external) {
      return (
        <a
          href={to}
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 py-2 text-gray-700 hover:text-orange-600 font-medium"
        >
          {children}
        </a>
      );
    }

    if (isAnchor) {
      return (
        <a
          href={to}
          className="px-3 py-2 text-gray-700 hover:text-orange-600 font-medium"
          onClick={() => setOpen(false)}
        >
          {children}
        </a>
      );
    }

    // NavLink solo per vere route (es. /ecommerce, /installatori)
    return (
      <NavLink
        to={to}
        end
        className={({ isActive }) =>
          `px-3 py-2 font-medium ${
            isActive ? "text-orange-600" : "text-gray-700 hover:text-orange-600"
          }`
        }
        onClick={() => setOpen(false)}
      >
        {children}
      </NavLink>
    );
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* top row */}
        <div className="h-16 flex items-center justify-between gap-4">
          {/* logo */}
          <Link to="/" className="flex items-center gap-2">
            <img
              src="/images/logo.png"
              alt="Energy Planner"
              className="h-12 w-auto"
            />
          </Link>

          {/* desktop menu */}
          <div className="hidden lg:flex items-center gap-2">
            <NavItem to="/#chi-siamo">Chi Siamo</NavItem>
            <NavItem to="/#servizi">Servizi</NavItem>
            <NavItem to="/#prodotti">Prodotti</NavItem>
            <NavItem to="/ecommerce">Shop</NavItem>
            <NavItem to="/installatori">Installatori</NavItem>
          </div>

          {/* azioni: profilo + carrello */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/account"
              className="p-2 rounded-full border border-gray-200 hover:border-orange-300 hover:bg-orange-50 transition"
              title="Profilo / Login"
            >
              <svg viewBox="0 0 24 24" className="w-6 h-6 text-gray-700">
                <path
                  d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5Zm0 2c-4.418 0-8 2.239-8 5v1h16v-1c0-2.761-3.582-5-8-5Z"
                  fill="currentColor"
                />
              </svg>
            </Link>

            <Link
              to="/ecommerce#carrello"
              className="relative p-2 rounded-full border border-gray-200 hover:border-orange-300 hover:bg-orange-50 transition"
              title="Carrello"
            >
              <svg viewBox="0 0 24 24" className="w-6 h-6 text-gray-700">
                <path
                  d="M7 4h-2l-1 2h2l3 9h9l3-7H9"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="10" cy="20" r="1.8" fill="currentColor" />
                <circle cx="18" cy="20" r="1.8" fill="currentColor" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-xs rounded-full h-5 min-w-[20px] px-1 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          {/* hamburger */}
          <button
            className="lg:hidden p-2 rounded-md border border-gray-200 text-gray-700"
            onClick={() => setOpen((v) => !v)}
            aria-label="Apri menu"
          >
            <svg
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              fill="none"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* mobile menu */}
        {open && (
          <div className="lg:hidden py-3 border-t border-gray-200 flex flex-col gap-1">
            <NavItem to="/#chi-siamo">Chi Siamo</NavItem>
            <NavItem to="/#servizi">Servizi</NavItem>
            <NavItem to="/#prodotti">Prodotti</NavItem>
            <NavItem to="/#assistenza">Assistenza</NavItem>
            <NavItem to="/ecommerce">Ecommerce</NavItem>
            <NavItem to="/installatori">Installatori</NavItem>

            <div className="flex items-center gap-3 pt-2">
              <Link
                to="/account"
                className="flex items-center gap-2 px-3 py-2 rounded-md border border-gray-200 hover:border-orange-300 hover:bg-orange-50 transition"
                onClick={() => setOpen(false)}
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-gray-700">
                  <path
                    d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5Zm0 2c-4.418 0-8 2.239-8 5v1h16v-1c0-2.761-3.582-5-8-5Z"
                    fill="currentColor"
                  />
                </svg>
                Profilo / Login
              </Link>

              <Link
                to="/ecommerce#carrello"
                className="flex items-center gap-2 px-3 py-2 rounded-md border border-gray-200 hover:border-orange-300 hover:bg-orange-50 transition"
                onClick={() => setOpen(false)}
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-gray-700">
                  <path
                    d="M7 4h-2l-1 2h2l3 9h9l3-7H9"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Carrello
                {cartCount > 0 && (
                  <span className="ml-1 bg-orange-600 text-white text-xs rounded-full h-5 min-w-[20px] px-1 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
