import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useInView, animate } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  ArrowDown,
  Scissors,
  Ruler,
  Heart,
  Sparkles,
} from "lucide-react";

// Uses same fonts as Navbar/Home/Footer/Collection/Contact/Gallery:
// <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600&family=Jost:wght@300;400;500&display=swap" rel="stylesheet">

// ---------- content ----------

// Same split-hero-carousel pattern as Gallery.jsx: headline + tag + image
// rotate together, the copy underneath stays fixed.
const HERO_SLIDES = [
  {
    tag: "Our Story",
    title: ["Stitched for You,", "Not for Everyone."],
    img: "https://img.magnific.com/free-photo/indoor-shot-adorable-female-buyer-spending-her-free-time-boutique-standing-near-dummy-with-clothes-reading-news-online-while-using-free-internet-connection-shop-assistant-selling-clothes_273609-175.jpg?semt=ais_hybrid&w=740&q=80",
  },
  {
    tag: "The Craft",
    title: ["One Tailor,", "One Order."],
    img: "https://t4.ftcdn.net/jpg/05/12/24/35/360_F_512243529_cw6Dv8hPWjrI1ycZDWXWv9KKJhnre8DN.jpg",
  },
  {
    tag: "Since 2020",
    title: ["Gobi, India,", "To Your Door."],
    img: "https://img.magnific.com/free-photo/elegant-indian-bride-adorning-herself-with-jewelry_23-2151996280.jpg?semt=ais_hybrid&w=740&q=80",
  },
];

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

// elegant left-to-right curtain wipe for photography, matches Gallery tiles
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
      className="absolute inset-0 bg-[#6B2C28]"
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

// ---------- Hero: split layout, offset image, circular slide indicator ----------
// Identical mechanism to GalleryHero in Gallery.jsx, restyled with About copy.
const HERO_RADIUS = 34;
const HERO_CIRCUMFERENCE = 2 * Math.PI * HERO_RADIUS;

const AboutHero = () => {
  const [index, setIndex] = useState(0);
  const total = HERO_SLIDES.length;
  const slide = HERO_SLIDES[index];

  const goTo = useCallback(
    (dir) => setIndex((i) => (i + dir + total) % total),
    [total]
  );

  useEffect(() => {
    const t = setInterval(() => goTo(1), 6000);
    return () => clearInterval(t);
  }, [goTo]);

  const scrollToStats = () => {
    document.getElementById("about-stats")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden bg-[#6B2C28]">
      {/* nav arrows */}
      <button
        onClick={() => goTo(-1)}
        aria-label="Previous"
        className="absolute left-3 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/15 p-2.5 text-[#F5EDE6]/80 transition-colors hover:border-[#D9AFAE] hover:text-[#D9AFAE] md:left-6"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={() => goTo(1)}
        aria-label="Next"
        className="absolute right-3 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/15 p-2.5 text-[#F5EDE6]/80 transition-colors hover:border-[#D9AFAE] hover:text-[#D9AFAE] md:right-6"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 pb-20 pt-24 md:grid-cols-2 md:px-10 md:pt-28">
        {/* left: copy */}
        <div>
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.55, ease: easeClassy }}
            >
              <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#D9AFAE] px-4 py-1.5 text-[11px] uppercase tracking-[0.18em] text-[#7B2434]">
                <Sparkles className="h-3.5 w-3.5" />
                {slide.tag}
              </span>
              <h1
                className="text-[46px] leading-[1.05] text-[#F5EDE6] md:text-[64px]"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600 }}
              >
                {slide.title[0]}
                <br />
                {slide.title[1]}
              </h1>
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 max-w-sm space-y-4">
            <p className="text-[13px] leading-relaxed text-[#F5EDE6]/65">
              JoJo Boutique began with a simple frustration: ready-made
              clothes rarely fit girls the way they should. So we built a
              boutique that does both — beautiful pieces ready to wear, and
              a customization service that fits like it was made for her.
              Because it was.
            </p>
          </div>

          {/* scroll cue */}
          <button
            onClick={scrollToStats}
            className="mt-10 flex items-center gap-3 text-[#F5EDE6]/50 transition-colors hover:text-[#D9AFAE]"
          >
            <span className="h-10 w-px bg-current opacity-40" />
            <motion.span
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowDown className="h-4 w-4" />
            </motion.span>
          </button>
        </div>

        {/* right: offset image + circular slide indicator */}
        <div className="relative">
          <div className="relative aspect-[4/5] w-full max-w-md overflow-hidden rounded-3xl bg-[#4A1E1B] shadow-xl shadow-black/40 ring-1 ring-white/10 md:ml-auto">
            <AnimatePresence mode="wait">
              <motion.img
                key={index}
                src={slide.img}
                alt={slide.title.join(" ")}
                initial={{ opacity: 0, scale: 1.08 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: easeClassy }}
                className="h-full w-full object-cover"
              />
            </AnimatePresence>
          </div>

          {/* founded badge, sits on the offset image like in the original About */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: easeClassy }}
            className="absolute -bottom-6 -left-6 hidden items-center gap-3 rounded-2xl bg-white px-5 py-4 shadow-lg ring-1 ring-black/5 md:flex"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#D9AFAE]/30">
              <Scissors className="h-4 w-4 text-[#7B2434]" />
            </span>
            <div className="leading-tight">
              <p className="text-[13px] font-medium text-[#111111]">Since 2020</p>
              <p className="text-[12px] text-[#111111]/60">Gobi, India</p>
            </div>
          </motion.div>

          {/* circular progress + slide numbers */}
          <div className="mt-10 flex items-center gap-4 md:ml-auto md:mt-16 md:w-max">
            <svg width="76" height="76" viewBox="0 0 76 76" className="shrink-0 -rotate-90">
              <circle cx="38" cy="38" r={HERO_RADIUS} fill="none" stroke="rgba(245,237,230,0.18)" strokeWidth="2" />
              <motion.circle
                cx="38"
                cy="38"
                r={HERO_RADIUS}
                fill="none"
                stroke="#D9AFAE"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray={HERO_CIRCUMFERENCE}
                animate={{
                  strokeDashoffset: HERO_CIRCUMFERENCE * (1 - (index + 1) / total),
                }}
                transition={{ duration: 0.6, ease: easeClassy }}
              />
            </svg>
            <div className="flex items-baseline gap-1.5 text-[13px]">
              {HERO_SLIDES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={
                    i === index
                      ? "text-[20px] text-[#F5EDE6]"
                      : "text-[#F5EDE6]/40 hover:text-[#F5EDE6]/70"
                  }
                  style={i === index ? { fontFamily: "'Cormorant Garamond', serif" } : undefined}
                >
                  {String(i + 1).padStart(2, "0")}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* shimmer line, matches navbar/gallery signature */}
      <div className="relative h-[2px] w-full overflow-hidden bg-white/10">
        <div className="absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-[#D9AFAE] to-transparent animate-[shimmer_5s_ease-in-out_infinite]" />
      </div>
    </section>
  );
};

const About = () => {
  return (
    <div className="bg-[#6B2C28] text-[#F5EDE6]" style={{ fontFamily: "'Jost', sans-serif" }}>
      {/* ---------- Hero: bold split carousel, same pattern as Gallery ---------- */}
      <AboutHero />

      {/* ---------- Stats strip — beige, matches Gallery's milestones section ---------- */}
      <section id="about-stats" className="border-b border-[#D9AFAE]/25 bg-[#F5EDE6]">
        <Reveal
          variants={staggerParent}
          className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 py-14 md:grid-cols-4 md:px-10"
        >
          {STATS.map((s) => (
            <motion.div key={s.label} variants={fadeUp} className="text-center">
              <p
                className="text-[34px] text-[#7B2434] md:text-[42px]"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                <Counter target={s.target} suffix={s.suffix} decimals={s.decimals} />
              </p>
              <span className="mx-auto mt-2 block h-px w-8 bg-[#7B2434]/30" />
              <p className="mt-2 text-[11px] uppercase tracking-[0.14em] text-[#2B1210]/55">
                {s.label}
              </p>
            </motion.div>
          ))}
        </Reveal>
      </section>

      {/* ---------- Values — beige, matches Gallery's "What We've Done" section ---------- */}
      <section className="bg-[#F5EDE6] px-6 py-24 md:px-10">
        <Reveal className="mx-auto mb-16 max-w-xl text-center">
          <span className="text-[11px] uppercase tracking-[0.2em] text-[#7B2434]/70">
            Our Principles
          </span>
          <h2
            className="mt-3 text-[32px] text-[#2B1210] md:text-[38px]"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            What We Believe
          </h2>
          <p className="mt-3 text-[14px] text-[#2B1210]/65">
            Three things guide every piece we make, ready-made or custom.
          </p>
        </Reveal>

        <Reveal variants={staggerParent} className="mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-3">
          {VALUES.map(({ icon: Icon, title, desc }) => (
            <motion.div
              key={title}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.4, ease: easeClassy }}
              className="rounded-2xl border border-[#D9AFAE]/40 bg-white p-8 transition-colors duration-300 hover:border-[#6B2C28]/50 hover:shadow-[0_20px_40px_-24px_rgba(107,44,40,0.25)]"
            >
              <motion.span
                whileHover={{ rotate: 8 }}
                transition={{ type: "spring", stiffness: 260, damping: 14 }}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-[#D9AFAE]/25"
              >
                <Icon className="h-5 w-5 text-[#7B2434]" strokeWidth={1.5} />
              </motion.span>
              <h3
                className="mt-5 text-[19px] text-[#2B1210]"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                {title}
              </h3>
              <p className="mt-2 text-[13px] leading-relaxed text-[#2B1210]/65">
                {desc}
              </p>
            </motion.div>
          ))}
        </Reveal>
      </section>

      {/* ---------- Process — stays in the beige zone, sits on a hairline divider ---------- */}
      <section className="border-t border-[#D9AFAE]/25 bg-[#F5EDE6] py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <Reveal className="mx-auto mb-16 max-w-xl text-center">
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#7B2434]/70">
              The Journey
            </span>
            <h2
              className="mt-3 text-[32px] text-[#2B1210] md:text-[38px]"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              How It Works
            </h2>
            <p className="mt-3 text-[14px] text-[#2B1210]/65">
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
                  className="text-[40px] text-[#7B2434]/25"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {p.step}
                </span>
                <h3 className="mt-2 text-[15px] font-medium text-[#2B1210]">
                  {p.title}
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-[#2B1210]/65">
                  {p.desc}
                </p>
                {i < PROCESS.length - 1 && (
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true, amount: 0.8 }}
                    transition={{ duration: 0.7, delay: 0.3, ease: easeClassy }}
                    style={{ transformOrigin: "left" }}
                    className="mt-6 hidden h-px w-full bg-[#D9AFAE]/30 lg:block"
                  />
                )}
              </motion.div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ---------- Founder / craftsmanship note — closes out the beige zone ---------- */}
      <section className="bg-[#F5EDE6] px-6 py-28 md:px-10">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 md:grid-cols-2">
          <Reveal className="order-2 md:order-1">
            <span className="mb-4 inline-block text-[12px] uppercase tracking-[0.16em] text-[#7B2434]">
              From Our Founder
            </span>
            <div className="relative">
              <span
                aria-hidden
                className="absolute -left-3 -top-6 text-[64px] leading-none text-[#7B2434]/15"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                "
              </span>
              <h2
                className="relative text-[28px] italic leading-snug text-[#2B1210] md:text-[34px]"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                I started JoJo Boutique because my own daughter could never
                find a dress that fit her right off the rack.
              </h2>
            </div>
            <p className="mt-5 text-[14px] leading-relaxed text-[#2B1210]/65">
              What began as altering a few dresses for neighborhood girls has
              grown into a full boutique — one that still treats every
              custom order the way it started: personally, carefully, one
              girl at a time.
            </p>
          </Reveal>
          <Reveal
            className="order-1 md:order-2"
            variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.6 } } }}
          >
            <CurtainImage
              src="https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80"
              alt="Founder fitting a custom dress"
              className="aspect-[4/3] w-full rounded-3xl ring-1 ring-black/5"
              curtainColor="bg-[#F5EDE6]"
            />
          </Reveal>
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="bg-[#4A1E1B] py-24">
        <Reveal className="mx-auto flex max-w-3xl flex-col items-center px-6 text-center md:px-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.7 }}
            transition={{ duration: 0.7, ease: easeClassy }}
          >
            <Scissors className="mb-5 h-8 w-8 text-[#D9AFAE]" strokeWidth={1.25} />
          </motion.div>
          <h2
            className="text-[28px] text-[#F5EDE6] md:text-[34px]"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Ready to find (or make) your fit?
          </h2>
          <p className="mt-3 max-w-md text-[14px] text-[#F5EDE6]/60">
            Explore our ready-made collection or start a custom order for
            your girl today.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="group flex items-center gap-2 rounded-full border border-[#5C4322] bg-gradient-to-b from-[#E8C377] via-[#C89B4A] to-[#8B6B2E] px-7 py-3.5 text-[13px] font-medium uppercase tracking-[0.14em] text-white shadow-md transition-all hover:from-[#F0D08E] hover:via-[#D6AC5E] hover:to-[#9A7936]"
            >
              Shop Ready-Made
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03, borderColor: "#D9AFAE", color: "#D9AFAE" }}
              whileTap={{ scale: 0.97 }}
              className="rounded-full border border-white/20 px-7 py-3.5 text-[13px] uppercase tracking-[0.14em] text-[#F5EDE6]"
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