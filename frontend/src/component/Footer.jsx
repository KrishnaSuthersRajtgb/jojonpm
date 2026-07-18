import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";

// Uses same fonts as Navbar/Home, plus Marcellus for the wordmark:
// <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600&family=Jost:wght@300;400;500&family=Marcellus&display=swap" rel="stylesheet">

// Brand icons removed from current lucide-react — inline SVGs instead
const InstagramIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const FacebookIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const TwitterIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} {...props}>
    <path d="M22 4.01c-.9.4-1.85.67-2.85.8a4.9 4.9 0 0 0 2.15-2.7 9.9 9.9 0 0 1-3.1 1.18 4.9 4.9 0 0 0-8.4 4.47 13.9 13.9 0 0 1-10.1-5.12 4.9 4.9 0 0 0 1.52 6.55 4.87 4.87 0 0 1-2.22-.6v.06a4.9 4.9 0 0 0 3.93 4.8 4.9 4.9 0 0 1-2.21.08 4.9 4.9 0 0 0 4.58 3.4A9.87 9.87 0 0 1 0 19.54a13.9 13.9 0 0 0 7.55 2.21c9.05 0 14-7.5 14-14v-.64A9.9 9.9 0 0 0 22 4.01z" />
  </svg>
);

const SOCIALS = [
  { icon: InstagramIcon, href: "#", label: "Instagram" },
  { icon: FacebookIcon, href: "#", label: "Facebook" },
  { icon: TwitterIcon, href: "#", label: "Twitter" },
];

const Footer = () => {
  return (
    <footer
      className="bg-[#4A1E1B] text-white"
      style={{ fontFamily: "'Jost', sans-serif" }}
    >
      {/* shimmer line, matches navbar/hero signature */}
      <div className="relative h-[2px] w-full overflow-hidden bg-white/10">
        <div className="absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-[#D9AFAE] to-transparent animate-[shimmer_5s_ease-in-out_infinite]" />
      </div>

      <div className="mx-auto max-w-7xl px-6 py-16 md:px-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          {/* Brand */}
          <div>
            <a href="#home" className="flex flex-col leading-none">
              <span
                className="text-[24px] tracking-[0.08em] text-[#F5EDE6]"
                style={{ fontFamily: "'Marcellus', serif" }}
              >
                JoJo Boutique
              </span>
              <span
                className="mt-1 text-[9.5px] uppercase tracking-[0.32em] text-[#D9AFAE]/80"
                style={{ fontFamily: "'Jost', sans-serif" }}
              >
                Premium Unisex Salon
              </span>
            </a>
            <p className="mt-4 max-w-sm text-[13px] leading-relaxed text-white/60">
              Hair, skincare, bridal, and grooming for him and her —
              crafted with care, every visit.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {SOCIALS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-[#D9AFAE] hover:text-[#D9AFAE]"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="md:justify-self-end md:text-left">
            <h4 className="mb-5 text-[12px] uppercase tracking-[0.16em] text-white/50">
              Get in Touch
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#D9AFAE]" strokeWidth={1.5} />
                <span className="text-[13px] text-white/75">
                  JoJo Boutique Premium Unisex Salon, Bhavani, Erode District, Tamil Nadu
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-[#D9AFAE]" strokeWidth={1.5} />
                <a href="tel:+911234567890" className="text-[13px] text-white/75 hover:text-[#D9AFAE]">
                  +91 9597300773
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-[#D9AFAE]" strokeWidth={1.5} />
                <a href="mailto:hello@jojo boutique.com" className="text-[13px] text-white/75 hover:text-[#D9AFAE]">
                  hello@jojo boutique.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-[12px] text-white/50">
            © {new Date().getFullYear()} JoJo Boutique Premium Unisex Salon. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#privacy" className="text-[12px] text-white/50 hover:text-[#D9AFAE]">
              Privacy Policy
            </a>
            <a href="#terms" className="text-[12px] text-white/50 hover:text-[#D9AFAE]">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;