import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingBag, Search, User, Gem } from "lucide-react";

// Add these once in your index.html <head> (or via @font-face / next/font):
// <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600&family=Jost:wght@300;400;500&display=swap" rel="stylesheet">

const NAV_LINKS = [
  { label: "New Arrivals", to: "/new-arrivals" },
  { label: "Collections", to: "/collections" },
  { label: "Gallery", to: "/gallery" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

const easeClassy = [0.16, 1, 0.3, 1];

const drawerList = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } },
};

const drawerItem = {
  hidden: { opacity: 0, x: 24 },
  show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: easeClassy } },
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // lock body scroll while the mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // close drawer on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: easeClassy }}
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-[0_1px_0_0_#EDE9FE]"
            : "bg-white"
        }`}
      >
        {/* Shimmer line — signature element */}
        <div className="relative h-[2px] w-full overflow-hidden bg-[#EDE9FE]">
          <div className="absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-[#7C3AED] to-transparent animate-[shimmer_5s_ease-in-out_infinite]" />
        </div>

        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
          {/* Logo */}
          <Link to="/" className="group flex items-center gap-2.5">
            <motion.span
              whileHover={{ rotate: 18, scale: 1.06 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-[#EDE9FE] transition-colors duration-300 group-hover:bg-[#7C3AED]/10"
            >
              <Gem strokeWidth={1.5} className="h-5 w-5 text-[#7C3AED]" />
            </motion.span>
            <span
              className="text-[24px] leading-none tracking-wide text-[#1F2937] md:text-[26px]"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Jo<span className="text-[#7C3AED]">Jo</span>{" "}
              <span className="hidden font-medium sm:inline">Boutique</span>
            </span>
          </Link>

          {/* Desktop links — sliding active-state indicator */}
          <ul
            className="hidden items-center gap-1 md:flex"
            style={{ fontFamily: "'Jost', sans-serif" }}
          >
            {NAV_LINKS.map((link) => (
              <li key={link.label} className="relative">
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    `relative block rounded-full px-4 py-2 text-[13px] font-light uppercase tracking-[0.16em] transition-colors duration-200 ${
                      isActive
                        ? "text-[#7C3AED]"
                        : "text-[#1F2937]/70 hover:text-[#7C3AED]"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span className="relative z-10">{link.label}</span>
                      {isActive && (
                        <motion.span
                          layoutId="navActiveBg"
                          transition={{ type: "spring", stiffness: 380, damping: 32 }}
                          className="absolute inset-0 rounded-full bg-[#EDE9FE]"
                        />
                      )}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Right actions */}
          <div className="flex items-center gap-1.5">
            <button
              aria-label="Search"
              className="hidden rounded-full p-2.5 text-[#1F2937]/70 transition-colors hover:bg-[#EDE9FE] hover:text-[#7C3AED] sm:flex"
            >
              <Search strokeWidth={1.5} className="h-[18px] w-[18px]" />
            </button>
            <Link
              to="/signin"
              aria-label="Sign in"
              className="hidden rounded-full p-2.5 text-[#1F2937]/70 transition-colors hover:bg-[#EDE9FE] hover:text-[#7C3AED] md:flex"
            >
              <User strokeWidth={1.5} className="h-[18px] w-[18px]" />
            </Link>
            <Link to="/cart" aria-label="Cart" className="flex">
              <motion.span
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.94 }}
                className="relative flex rounded-full p-2.5 text-[#1F2937]/70 transition-colors hover:bg-[#EDE9FE] hover:text-[#7C3AED]"
              >
                <ShoppingBag strokeWidth={1.5} className="h-[18px] w-[18px]" />
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 12, delay: 0.5 }}
                  className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#7C3AED] text-[9px] font-medium text-white"
                >
                  2
                </motion.span>
              </motion.span>
            </Link>

            {/* Mobile toggle */}
            <button
              onClick={() => setIsOpen(true)}
              className="ml-1 flex rounded-full p-2.5 text-[#1F2937] md:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile drawer + backdrop, rendered outside the header so it overlays everything */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-[60] bg-[#1F2937]/40 backdrop-blur-sm md:hidden"
            />
            <motion.div
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.45, ease: easeClassy }}
              className="fixed right-0 top-0 z-[70] flex h-full w-[82%] max-w-sm flex-col bg-white shadow-2xl md:hidden"
            >
              <div className="flex items-center justify-between px-6 py-5">
                <span
                  className="text-[20px] text-[#1F2937]"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  Menu
                </span>
                <button
                  onClick={() => setIsOpen(false)}
                  aria-label="Close menu"
                  className="rounded-full p-2 text-[#1F2937]/70 hover:bg-[#EDE9FE] hover:text-[#7C3AED]"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="h-px w-full bg-[#EDE9FE]" />

              <motion.ul
                variants={drawerList}
                initial="hidden"
                animate="show"
                className="flex flex-col gap-1 px-4 py-6"
                style={{ fontFamily: "'Jost', sans-serif" }}
              >
                {NAV_LINKS.map((link) => (
                  <motion.li key={link.label} variants={drawerItem}>
                    <NavLink
                      to={link.to}
                      className={({ isActive }) =>
                        `block rounded-xl px-3 py-3 text-[15px] uppercase tracking-[0.14em] transition-colors ${
                          isActive
                            ? "bg-[#EDE9FE] text-[#7C3AED]"
                            : "text-[#1F2937] hover:bg-[#EDE9FE]/60 hover:text-[#7C3AED]"
                        }`
                      }
                    >
                      {link.label}
                    </NavLink>
                  </motion.li>
                ))}
              </motion.ul>

              <div className="mt-auto flex flex-col gap-3 border-t border-[#EDE9FE] px-6 py-6">
                <motion.div variants={drawerItem} initial="hidden" animate="show">
                  <Link
                    to="/signin"
                    className="flex items-center gap-2.5 text-[13px] uppercase tracking-[0.14em] text-[#1F2937]/75 hover:text-[#7C3AED]"
                  >
                    <User strokeWidth={1.5} className="h-4 w-4" />
                    Sign In
                  </Link>
                </motion.div>
                <motion.div
                  variants={drawerItem}
                  initial="hidden"
                  animate="show"
                  transition={{ delay: 0.05 }}
                >
                  <button className="flex items-center gap-2.5 text-[13px] uppercase tracking-[0.14em] text-[#1F2937]/75 hover:text-[#7C3AED]">
                    <Search strokeWidth={1.5} className="h-4 w-4" />
                    Search
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;