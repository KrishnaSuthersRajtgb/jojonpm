import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

// Add these once in your index.html <head> (or via @font-face / next/font):
// <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600&family=Jost:wght@300;400;500&family=Marcellus&display=swap" rel="stylesheet">
//
// "Marcellus" is the wordmark-only font — used nowhere else on the site,
// so the logo stays visually distinct from headings (Cormorant Garamond)
// and body copy (Jost).

const NAV_LINKS = [
  // { label: "New Arrivals", to: "/new-arrivals" },
  { label: "Home", to: "/" },
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

  // close drawer on route change AND scroll the new page to the top
  useEffect(() => {
    setIsOpen(false);
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [location.pathname]);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: easeClassy }}
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? "bg-[#6B2C28]/95 backdrop-blur-md shadow-[0_1px_0_0_rgba(217,175,174,0.25)]"
            : "bg-[#6B2C28]"
        }`}
      >
        {/* Shimmer line — signature element, matches Home hero */}
        <div className="relative h-[2px] w-full overflow-hidden bg-white/10">
          <div className="absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-[#D9AFAE] to-transparent animate-[shimmer_5s_ease-in-out_infinite]" />
        </div>

        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
          {/* Wordmark — no icon, just type. Marcellus gives it a slim,
              engraved feel that's distinct from the rest of the page. */}
          <Link to="/" className="group flex flex-col leading-none">
            <span
              className="text-[24px] tracking-[0.08em] text-[#F5EDE6] transition-colors duration-300 group-hover:text-[#D9AFAE] md:text-[27px]"
              style={{ fontFamily: "'Marcellus', serif" }}
            >
              VELVET
            </span>
            <span
              className="mt-1 hidden text-[9.5px] uppercase tracking-[0.32em] text-[#D9AFAE]/80 sm:block"
              style={{ fontFamily: "'Jost', sans-serif" }}
            >
              Premium Unisex Salon
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
                  end={link.to === "/"}
                  className={({ isActive }) =>
                    `relative block rounded-full px-4 py-2 text-[13px] font-light uppercase tracking-[0.16em] transition-colors duration-200 ${
                      isActive
                        ? "text-[#6B2C28]"
                        : "text-[#F5EDE6]/75 hover:text-[#F5EDE6]"
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
                          className="absolute inset-0 rounded-full bg-[#D9AFAE]"
                        />
                      )}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Book Now CTA — desktop only, matches Home's gold gradient buttons */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="hidden md:block"
          >
            <Link
              to="/contact"
              className="rounded-full border border-[#5C4322] bg-gradient-to-b from-[#E8C377] via-[#C89B4A] to-[#8B6B2E] px-6 py-2.5 text-[12px] font-medium uppercase tracking-[0.14em] text-white shadow-md transition-all hover:from-[#F0D08E] hover:via-[#D6AC5E] hover:to-[#9A7936]"
              style={{ fontFamily: "'Jost', sans-serif" }}
            >
              Book Now
            </Link>
          </motion.div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(true)}
            className="flex rounded-full p-2.5 text-[#F5EDE6] md:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </button>
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
              className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm md:hidden"
            />
            <motion.div
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.45, ease: easeClassy }}
              className="fixed right-0 top-0 z-[70] flex h-full w-[82%] max-w-sm flex-col bg-[#6B2C28] shadow-2xl md:hidden"
            >
              <div className="flex items-center justify-between px-6 py-5">
                <span
                  className="text-[20px] tracking-[0.06em] text-[#F5EDE6]"
                  style={{ fontFamily: "'Marcellus', serif" }}
                >
                  VELVET
                </span>
                <button
                  onClick={() => setIsOpen(false)}
                  aria-label="Close menu"
                  className="rounded-full p-2 text-[#F5EDE6]/70 hover:bg-white/10 hover:text-[#D9AFAE]"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="h-px w-full bg-white/10" />

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
                      end={link.to === "/"}
                      className={({ isActive }) =>
                        `block rounded-xl px-3 py-3 text-[15px] uppercase tracking-[0.14em] transition-colors ${
                          isActive
                            ? "bg-[#D9AFAE] text-[#6B2C28]"
                            : "text-[#F5EDE6] hover:bg-white/10 hover:text-[#D9AFAE]"
                        }`
                      }
                    >
                      {link.label}
                    </NavLink>
                  </motion.li>
                ))}

                <motion.li variants={drawerItem} className="mt-4 px-3">
                  <Link
                    to="/contact"
                    className="block rounded-full border border-[#5C4322] bg-gradient-to-b from-[#E8C377] via-[#C89B4A] to-[#8B6B2E] py-3 text-center text-[13px] font-medium uppercase tracking-[0.14em] text-white shadow-md"
                  >
                    Book Now
                  </Link>
                </motion.li>
              </motion.ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;