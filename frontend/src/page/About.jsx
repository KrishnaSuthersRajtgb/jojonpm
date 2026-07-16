import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";
import { Gem, Scissors, Ruler, Heart, Sparkles } from "lucide-react";

// Uses same fonts as Navbar/Home/Footer/Collection:
// <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600&family=Jost:wght@300;400;500&display=swap" rel="stylesheet">

const VALUES = [
  {
    icon: Ruler,
    title: "Fit First",
    desc: "Every customized piece is measured and cut for your girl — not a size chart.",
  },
  {
    icon: Scissors,
    title: "Made by Hand",
    desc: "Our tailors finish each customization one at a time, not on an assembly line.",
  },
  {
    icon: Heart,
    title: "Honest Fabrics",
    desc: "We choose materials that feel as good as they look, wash after wash.",
  },
];

const PROCESS = [
  {
    step: "01",
    title: "Choose Ready-Made or Custom",
    desc: "Browse pieces ready to ship, or start a customization for your girl's exact fit.",
  },
  {
    step: "02",
    title: "Share the Details",
    desc: "For custom orders, tell us the measurements, fabric, and finish you want.",
  },
  {
    step: "03",
    title: "We Stitch It Together",
    desc: "Our in-house tailors bring the design to life, checked at every stage.",
  },
  {
    step: "04",
    title: "Delivered to Your Door",
    desc: "Ready-made or made-to-order, it arrives fitted, finished, and ready to wear.",
  },
];

// numeric target + suffix kept separate so we can count up cleanly
const STATS = [
  { target: 2400, suffix: "+", label: "Custom Orders Fitted" },
  { target: 35, suffix: "+", label: "Ready-Made Styles" },
  { target: 4.8, suffix: "/5", label: "Average Rating", decimals: 1 },
  { target: 6, suffix: "", label: "Years Stitching" },
];

// ---------- shared, unhurried motion ----------
const easeClassy = [0.16, 1, 0.3, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: easeClassy } },
};

const staggerParent = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.05 } },
};

const Reveal = ({ children, className, variants = fadeUp, ...rest }) => (
  <motion.div
    className={className}
    variants={variants}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, amount: 0.3 }}
    {...rest}
  >
    {children}
  </motion.div>
);

// elegant left-to-right curtain wipe for photography
const CurtainImage = ({ src, alt, className }) => (
  <div className={`relative overflow-hidden ${className}`}>
    <motion.img
      src={src}
      alt={alt}
      className="h-full w-full object-cover"
      initial={{ scale: 1.15 }}
      whileInView={{ scale: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 1.4, ease: easeClassy }}
    />
    <motion.div
      className="absolute inset-0 bg-[#EDE9FE]"
      initial={{ scaleX: 1 }}
      whileInView={{ scaleX: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.9, ease: easeClassy }}
      style={{ transformOrigin: "right" }}
    />
  </div>
);

// gentle count-up, triggers once when scrolled into view
const Counter = ({ target, suffix = "", decimals = 0 }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [display, setDisplay] = useState(decimals ? (0).toFixed(decimals) : "0");

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, target, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(value) {
        setDisplay(
          decimals ? value.toFixed(decimals) : Math.floor(value).toLocaleString("en-US")
        );
      },
    });
    return () => controls.stop();
  }, [inView, target, decimals]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
};

const About = () => {
  return (
    <div className="bg-white text-[#1F2937]" style={{ fontFamily: "'Jost', sans-serif" }}>
      {/* ---------- Hero ---------- */}
      <section className="relative overflow-hidden bg-[#EDE9FE]">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 py-20 md:grid-cols-2 md:px-10 md:py-28">
          <div>
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: easeClassy }}
              className="mb-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-[11px] uppercase tracking-[0.18em] text-[#7C3AED]"
            >
              <Sparkles className="h-3.5 w-3.5" />
              Our Story
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.15, ease: easeClassy }}
              className="text-[40px] leading-[1.15] text-[#1F2937] md:text-[54px]"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Stitched for you,
              <br />
              not for <span className="italic text-[#7C3AED]">everyone.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.35, ease: easeClassy }}
              className="mt-6 max-w-md text-[15px] leading-relaxed text-[#1F2937]/70"
            >
              JoJo Boutique began with a simple frustration: ready-made
              clothes rarely fit girls the way they should. So we built
              a boutique that does both — beautiful pieces ready to wear,
              and a customization service that fits like it was made
              for her. Because it was.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: easeClassy }}
            className="relative"
          >
            <CurtainImage
              src="https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&q=80"
              alt="JoJo Boutique tailoring"
              className="aspect-[4/5] w-full rounded-3xl shadow-xl shadow-[#7C3AED]/10"
            />
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1, ease: easeClassy }}
              className="absolute -bottom-6 -left-6 flex items-center gap-3 rounded-2xl bg-white px-5 py-4 shadow-lg"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#EDE9FE]">
                <Gem className="h-4 w-4 text-[#7C3AED]" />
              </span>
              <div className="leading-tight">
                <p className="text-[13px] font-medium text-[#1F2937]">Since 2020</p>
                <p className="text-[12px] text-[#1F2937]/60">Chennai, India</p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        <div className="relative h-[2px] w-full overflow-hidden bg-white/40">
          <div className="absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-[#7C3AED] to-transparent animate-[shimmer_5s_ease-in-out_infinite]" />
        </div>
      </section>

      {/* ---------- Stats strip ---------- */}
      <section className="border-b border-[#EDE9FE]">
        <Reveal
          variants={staggerParent}
          className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 py-14 md:grid-cols-4 md:px-10"
        >
          {STATS.map((s) => (
            <motion.div key={s.label} variants={fadeUp} className="text-center">
              <p
                className="text-[34px] text-[#7C3AED] md:text-[42px]"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                <Counter target={s.target} suffix={s.suffix} decimals={s.decimals} />
              </p>
              <span className="mx-auto mt-2 block h-px w-8 bg-[#7C3AED]/25" />
              <p className="mt-2 text-[11px] uppercase tracking-[0.14em] text-[#1F2937]/55">
                {s.label}
              </p>
            </motion.div>
          ))}
        </Reveal>
      </section>

      {/* ---------- Values ---------- */}
      <section className="mx-auto max-w-7xl px-6 py-24 md:px-10">
        <Reveal className="mx-auto mb-16 max-w-xl text-center">
          <span className="text-[11px] uppercase tracking-[0.2em] text-[#7C3AED]/70">
            Our Principles
          </span>
          <h2
            className="mt-3 text-[32px] text-[#1F2937] md:text-[38px]"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            What We Believe
          </h2>
          <p className="mt-3 text-[14px] text-[#1F2937]/70">
            Three things guide every piece we make, ready-made or custom.
          </p>
        </Reveal>

        <Reveal variants={staggerParent} className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {VALUES.map(({ icon: Icon, title, desc }) => (
            <motion.div
              key={title}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.4, ease: easeClassy }}
              className="rounded-2xl border border-[#EDE9FE] p-8 transition-colors duration-300 hover:border-[#7C3AED]/40 hover:shadow-[0_20px_40px_-24px_rgba(124,58,237,0.25)]"
            >
              <motion.span
                whileHover={{ rotate: 8 }}
                transition={{ type: "spring", stiffness: 260, damping: 14 }}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-[#EDE9FE]"
              >
                <Icon className="h-5 w-5 text-[#7C3AED]" strokeWidth={1.5} />
              </motion.span>
              <h3
                className="mt-5 text-[19px] text-[#1F2937]"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                {title}
              </h3>
              <p className="mt-2 text-[13px] leading-relaxed text-[#1F2937]/65">
                {desc}
              </p>
            </motion.div>
          ))}
        </Reveal>
      </section>

      {/* ---------- Process ---------- */}
      <section className="bg-[#EDE9FE]/40 py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <Reveal className="mx-auto mb-16 max-w-xl text-center">
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#7C3AED]/70">
              The Journey
            </span>
            <h2
              className="mt-3 text-[32px] text-[#1F2937] md:text-[38px]"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              How It Works
            </h2>
            <p className="mt-3 text-[14px] text-[#1F2937]/70">
              From browsing to your doorstep — ready-made or made just for her.
            </p>
          </Reveal>

          <Reveal
            variants={staggerParent}
            className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
          >
            {PROCESS.map((p, i) => (
              <motion.div key={p.step} variants={fadeUp} className="relative">
                <span
                  className="text-[40px] text-[#7C3AED]/20"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {p.step}
                </span>
                <h3 className="mt-2 text-[15px] font-medium text-[#1F2937]">
                  {p.title}
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-[#1F2937]/65">
                  {p.desc}
                </p>
                {i < PROCESS.length - 1 && (
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true, amount: 0.8 }}
                    transition={{ duration: 0.7, delay: 0.3, ease: easeClassy }}
                    style={{ transformOrigin: "left" }}
                    className="mt-6 hidden h-px w-full bg-[#7C3AED]/15 lg:block"
                  />
                )}
              </motion.div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ---------- Founder / craftsmanship note ---------- */}
      <section className="mx-auto max-w-7xl px-6 py-28 md:px-10">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
          <Reveal className="order-2 md:order-1">
            <span className="mb-4 inline-block text-[12px] uppercase tracking-[0.16em] text-[#7C3AED]">
              From Our Founder
            </span>
            <div className="relative">
              <span
                aria-hidden
                className="absolute -left-3 -top-6 text-[64px] leading-none text-[#7C3AED]/15"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                "
              </span>
              <h2
                className="relative text-[28px] italic leading-snug text-[#1F2937] md:text-[34px]"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                I started JoJo Boutique because my own daughter could
                never find a dress that fit her right off the rack.
              </h2>
            </div>
            <p className="mt-5 text-[14px] leading-relaxed text-[#1F2937]/70">
              What began as altering a few dresses for neighborhood
              girls has grown into a full boutique — one that still
              treats every custom order the way it started: personally,
              carefully, one girl at a time.
            </p>
          </Reveal>
          <Reveal className="order-1 md:order-2" variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.6 } } }}>
            <CurtainImage
              src="https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=800&q=80"
              alt="Founder fitting a custom dress"
              className="aspect-[4/3] w-full rounded-3xl"
            />
          </Reveal>
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="bg-[#1F2937] py-24">
        <Reveal className="mx-auto flex max-w-3xl flex-col items-center px-6 text-center md:px-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.7 }}
            transition={{ duration: 0.7, ease: easeClassy }}
          >
            <Gem className="mb-5 h-8 w-8 text-[#A78BFA]" strokeWidth={1.25} />
          </motion.div>
          <h2
            className="text-[28px] text-white md:text-[34px]"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Ready to find (or make) your fit?
          </h2>
          <p className="mt-3 max-w-md text-[14px] text-white/60">
            Explore our ready-made collection or start a custom order
            for your girl today.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="rounded-full bg-[#7C3AED] px-7 py-3.5 text-[13px] uppercase tracking-[0.14em] text-white"
            >
              Shop Ready-Made
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03, borderColor: "#A78BFA", color: "#A78BFA" }}
              whileTap={{ scale: 0.97 }}
              className="rounded-full border border-white/20 px-7 py-3.5 text-[13px] uppercase tracking-[0.14em] text-white"
            >
              Start Customizing
            </motion.button>
          </div>
        </Reveal>
      </section>
    </div>
  );
};

export default About;