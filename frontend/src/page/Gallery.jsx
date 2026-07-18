import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useInView, animate } from "framer-motion";
import {
  X,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  ArrowDown,
  Scissors,
  Users,
  Award,
  Ruler,
} from "lucide-react";

// lucide-react dropped brand/logo icons — small inline SVGs instead,
// styled to sit at the same 14px size as the lucide icons around them.
const FacebookIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M13.5 21v-7.5h2.5l.4-3H13.5V8.5c0-.87.24-1.46 1.5-1.46h1.6V4.36C16.3 4.25 15.4 4 14.3 4c-2.3 0-3.8 1.4-3.8 4v2.5H8v3h2.5V21h3z" />
  </svg>
);
const InstagramIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
  </svg>
);
const TwitterIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M20 5.9c-.63.28-1.3.47-2 .56.72-.43 1.27-1.12 1.53-1.94-.67.4-1.42.68-2.22.84A3.5 3.5 0 0 0 11.2 8.6 9.9 9.9 0 0 1 4 5.16a3.5 3.5 0 0 0 1.08 4.67c-.56-.02-1.1-.17-1.56-.43v.04a3.5 3.5 0 0 0 2.8 3.43c-.5.14-1.05.16-1.55.06a3.5 3.5 0 0 0 3.27 2.43A7 7 0 0 1 3 16.8a9.9 9.9 0 0 0 5.36 1.57c6.43 0 9.95-5.33 9.95-9.95l-.01-.45A7.1 7.1 0 0 0 20 5.9z" />
  </svg>
);
// Uses same fonts as Navbar/Home/About/Contact/Collection:
// <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600&family=Jost:wght@300;400;500&display=swap" rel="stylesheet">

const FILTERS = ["All", "Ready-Made", "Girls Customization", "Bridal", "Behind the Scenes"];

// tall/short pairing gives the grid a masonry rhythm without a real masonry lib
const GALLERY = [
  { id: 1, tag: "Ready-Made", title: "Aria Wrap Dress", size: "tall", img: "https://img.magnific.com/free-photo/young-woman-beautiful-red-dress_1303-17506.jpg" },
  { id: 2, tag: "Girls Customization", title: "Petal Party Frock", size: "tall", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8LPLHiIQlQMl91X-lT9J23h6LsGGpc8LpczReYxAjWxjjKWFZ83_a1hzp&s=10" },
  // { id: 3, tag: "Bridal", title: "Hand-Finished Lehenga", size: "short", img: "https://images.unsplash.com/photo-1610189844777-097e5e1beb08?w=800&q=80" },
  { id: 4, tag: "Behind the Scenes", title: "Cutting the First Pattern", size: "tall", img: "https://assets0.mirraw.com/images/13011318/image_zoom.jpeg?1735372138" },
  { id: 5, tag: "Ready-Made", title: "Kurti", size: "short", img: "https://cdn.shopify.com/s/files/1/0414/3552/9370/files/long_kurti_480x480.jpg?v=1730113232" },
  { id: 6, tag: "Girls Customization", title: "Blossom Girls Lehenga", size: "tall", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCZO3NyyZ2rAWQYARVFDj9P2_h9NM3M6QT8GOwY_BCMJIQ3XbwBLi37xJU&s=10" },
  // { id: 7, tag: "Behind the Scenes", title: "Thread & Trim Table", size: "short", img: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80" },
  { id: 8, tag: "Bridal", title: "Beadwork Detail", size: "tall", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4E0oHg7ynQfdH5p8uoqdDEAhclnIAZ1FFcICa_rNDoEvUr8PdlLiGzC0&s=10" },
  { id: 9, tag: "Ready-Made", title: "Evening Silhouette", size: "short", img: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80" },
  { id: 10, tag: "Girls Customization", title: "Fitting Day", size: "tall", img: "https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?w=800&q=80" },
  { id: 11, tag: "Behind the Scenes", title: "The Tailor's Hands", size: "tall", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZyRtLczMfAxScyFHGz6IUEvofOo3LOc0ZGtPTeDHJkb9Kmg5GS4c_FQA&s=10" },
  { id: 12, tag: "Bridal", title: "Final Fitting", size: "tall", img: "https://images.unsplash.com/photo-1591085686350-798c0f9faa7f?w=800&q=80" },
];

// Slides for the big split hero carousel — headline + tag + image rotate,
// the "Discover" / "About the Craft" copy stays put underneath them.
const HERO_SLIDES = [
  {
    tag: "Ready-Made",
    title: ["Every Stitch,", "On Display"],
    img: "https://voilastudio.in/voilastudio_myntra/images/model_images/international_model/eCommerce_photography_magdamodel_(9).webp",
  },
  {
    tag: "Girls Customization",
    title: ["Fit, Fabric,", "Finish."],
    img: "https://www.studio1emporio.com/wp-content/uploads/2024/08/3-scaled.jpg",
  },
  {
    tag: "Bridal",
    title: ["Hand-Finished,", "Head to Hem."],
    img: "https://img.magnific.com/free-photo/elegant-indian-bride-adorning-herself-with-jewelry_23-2151996280.jpg?semt=ais_hybrid&w=740&q=80",
  },
];

// what we've done — the story behind the wall of photos
const MILESTONES = [
  { icon: Ruler, target: 2400, suffix: "+", label: "Custom Fittings Completed" },
  { icon: Scissors, target: 850, suffix: "+", label: "Ready-Made Pieces Stitched" },
  { icon: Users, target: 1600, suffix: "+", label: "Happy Customers" },
  { icon: Award, target: 6, suffix: "", label: "Years in Business" },
];

const ACHIEVEMENTS = [
  {
    title: "Every Fitting, Documented",
    desc: "From the first measurement to the final stitch, we photograph the process — not just the finished piece — so you can see the care that goes into a custom order.",
  },
  {
    title: "Built on Referrals",
    desc: "Most of the fittings you see here came through word of mouth. Neighborhood by neighborhood, JoJo Boutique grew because customers brought their sisters, daughters, and friends.",
  },
  {
    title: "One Tailor, One Order",
    desc: "We don't split a custom order across a floor of workers. The same hands that take the first measurement finish the last stitch — that consistency is what this gallery shows.",
  },
];

const easeClassy = [0.16, 1, 0.3, 1];

const staggerParent = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easeClassy } },
};

const gridParent = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const gridItem = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easeClassy } },
};

// gentle count-up, triggers once when scrolled into view
const Counter = ({ target, suffix = "" }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, target, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(value) {
        setDisplay(Math.floor(value).toLocaleString("en-US"));
      },
    });
    return () => controls.stop();
  }, [inView, target]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
};

// ---------- Hero: split layout, offset image, circular slide indicator ----------
const HERO_RADIUS = 34;
const HERO_CIRCUMFERENCE = 2 * Math.PI * HERO_RADIUS;

const GalleryHero = () => {
  const [index, setIndex] = useState(0);
  const total = HERO_SLIDES.length;
  const slide = HERO_SLIDES[index];

  const goTo = useCallback(
    (dir) => setIndex((i) => (i + dir + total) % total),
    [total]
  );

  // gentle autoplay, pauses feel is fine to skip — keep it simple and predictable
  useEffect(() => {
    const t = setInterval(() => goTo(1), 6000);
    return () => clearInterval(t);
  }, [goTo]);

  const scrollToGrid = () => {
    document.getElementById("gallery-grid")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden bg-[#6B2C28]">
      {/* social icons, top right */}
      {/* <div className="absolute right-6 top-8 z-20 hidden flex-col items-end gap-3 text-[12px] text-[#F5EDE6]/80 sm:flex md:right-10">
        <a href="#" className="flex items-center gap-2 hover:text-[#D9AFAE]">
          <FacebookIcon className="h-3.5 w-3.5" /> Facebook
        </a>
        <a href="#" className="flex items-center gap-2 hover:text-[#D9AFAE]">
          <InstagramIcon className="h-3.5 w-3.5" /> Instagram
        </a>
        <a href="#" className="flex items-center gap-2 hover:text-[#D9AFAE]">
          <TwitterIcon className="h-3.5 w-3.5" /> Twitter
        </a>
      </div> */}

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

          <div className="mt-8 max-w-sm space-y-6">
            <div>
              <h3
                className="mb-1.5 text-[16px] text-[#F5EDE6]"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Discover
              </h3>
              <p className="text-[13px] leading-relaxed text-[#F5EDE6]/65">
                A closer look at ready-made pieces, custom fittings, and the
                hands that bring them together, one photograph at a time.
              </p>
            </div>
            <div>
              <h3
                className="mb-1.5 text-[16px] text-[#F5EDE6]"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                About the Craft
              </h3>
              <p className="text-[13px] leading-relaxed text-[#F5EDE6]/65">
                Every custom order is cut and finished by one tailor, start to
                finish — this gallery is a record of that process, not just
                the result.
              </p>
            </div>
          </div>

          {/* scroll cue */}
          <button
            onClick={scrollToGrid}
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

          {/* circular progress + slide numbers */}
          <div className="mt-6 flex items-center gap-4 md:ml-auto md:w-max">
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

          <button
            onClick={scrollToGrid}
            className="group mt-6 flex items-center gap-2 text-[12px] uppercase tracking-[0.14em] text-[#F5EDE6]/70 transition-colors hover:text-[#D9AFAE] md:ml-auto md:w-max"
          >
            View All
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>

      {/* shimmer line, matches navbar signature */}
      <div className="relative h-[2px] w-full overflow-hidden bg-white/10">
        <div className="absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-[#D9AFAE] to-transparent animate-[shimmer_5s_ease-in-out_infinite]" />
      </div>
    </section>
  );
};

const GalleryTile = ({ item, onOpen }) => (
  <motion.button
    variants={gridItem}
    onClick={() => onOpen(item)}
    className={`group relative w-full overflow-hidden rounded-2xl bg-[#F5EDE6]/50 text-left ${
      item.size === "tall" ? "aspect-[3/4]" : "aspect-[4/3]"
    }`}
  >
    <motion.img
      src={item.img}
      alt={item.title}
      loading="lazy"
      initial={{ scale: 1.12 }}
      whileInView={{ scale: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 1.2, ease: easeClassy }}
      className="h-full w-full object-cover"
    />
    {/* curtain wipe */}
    <motion.div
      className="absolute inset-0 bg-[#F5EDE6]"
      initial={{ scaleX: 1 }}
      whileInView={{ scaleX: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.8, ease: easeClassy }}
      style={{ transformOrigin: "right" }}
    />
    <div className="absolute inset-0 bg-gradient-to-t from-[#2B1210]/75 via-[#2B1210]/0 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
    <div className="absolute bottom-0 left-0 right-0 translate-y-3 p-5 opacity-0 transition-all duration-400 group-hover:translate-y-0 group-hover:opacity-100">
      <span className="text-[10px] uppercase tracking-[0.16em] text-[#D9AFAE]">
        {item.tag}
      </span>
      <p
        className="mt-1 text-[17px] text-white"
        style={{ fontFamily: "'Cormorant Garamond', serif" }}
      >
        {item.title}
      </p>
    </div>
  </motion.button>
);

const Gallery = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [lightboxItem, setLightboxItem] = useState(null);

  const filtered =
    activeFilter === "All" ? GALLERY : GALLERY.filter((g) => g.tag === activeFilter);

  const currentIndex = lightboxItem
    ? filtered.findIndex((g) => g.id === lightboxItem.id)
    : -1;

  const goToLightbox = useCallback(
    (dir) => {
      if (currentIndex === -1) return;
      const next = (currentIndex + dir + filtered.length) % filtered.length;
      setLightboxItem(filtered[next]);
    },
    [currentIndex, filtered]
  );

  useEffect(() => {
    if (!lightboxItem) return;
    const onKey = (e) => {
      if (e.key === "Escape") setLightboxItem(null);
      if (e.key === "ArrowRight") goToLightbox(1);
      if (e.key === "ArrowLeft") goToLightbox(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightboxItem, goToLightbox]);

  return (
    <div className="bg-white text-[#2B1210]" style={{ fontFamily: "'Jost', sans-serif" }}>
      {/* ---------- Hero: bold split carousel ---------- */}
      <GalleryHero />

      {/* ---------- Milestones — what success we've made ---------- */}
      <section className="border-b border-[#D9AFAE]/25 bg-[#F5EDE6] py-16">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerParent}
          className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 md:grid-cols-4 md:px-10"
        >
          {MILESTONES.map(({ icon: Icon, target, suffix, label }) => (
            <motion.div key={label} variants={fadeUp} className="text-center">
              <span className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-white">
                <Icon className="h-5 w-5 text-[#7B2434]" strokeWidth={1.5} />
              </span>
              <p
                className="text-[30px] text-[#7B2434] md:text-[36px]"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                <Counter target={target} suffix={suffix} />
              </p>
              <p className="mt-1 text-[11px] uppercase tracking-[0.12em] text-[#2B1210]/55">
                {label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ---------- What we've done ---------- */}
      <section className="bg-[#F5EDE6] px-6 py-20 md:px-10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className="mx-auto mb-14 max-w-xl text-center"
        >
          <span className="text-[11px] uppercase tracking-[0.2em] text-[#7B2434]/70">
            What We've Done
          </span>
          <h2
            className="mt-3 text-[30px] text-[#2B1210] md:text-[36px]"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            The Story Behind Every Photo
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerParent}
          className="mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-3"
        >
          {ACHIEVEMENTS.map(({ title, desc }) => (
            <motion.div
              key={title}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.4, ease: easeClassy }}
              className="rounded-2xl border border-[#D9AFAE]/40 bg-white p-8 transition-colors duration-300 hover:border-[#6B2C28]/50 hover:shadow-[0_20px_40px_-24px_rgba(107,44,40,0.25)]"
            >
              <h3
                className="text-[19px] text-[#2B1210]"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                {title}
              </h3>
              <p className="mt-2 text-[13px] leading-relaxed text-[#2B1210]/65">
                {desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ---------- Filter tabs ---------- */}
      <div className="sticky top-0 z-30 border-b border-[#D9AFAE]/25 bg-white/95 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="flex gap-2 overflow-x-auto py-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {FILTERS.map((f) => {
              const isActive = activeFilter === f;
              return (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`relative shrink-0 rounded-full px-5 py-2 text-[12px] uppercase tracking-[0.12em] transition-colors ${
                    isActive
                      ? "text-white"
                      : "border border-[#D9AFAE]/40 text-[#2B1210]/70 hover:border-[#6B2C28] hover:text-[#6B2C28]"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="galleryActivePill"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      className="absolute inset-0 rounded-full bg-[#6B2C28]"
                    />
                  )}
                  <span className="relative">{f}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ---------- Masonry-style grid ---------- */}
      <section id="gallery-grid" className="mx-auto max-w-7xl px-6 py-14 md:px-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            variants={gridParent}
            className="columns-2 gap-6 sm:columns-3 lg:columns-4 [&>*]:mb-6 [&>*]:break-inside-avoid"
          >
            {filtered.map((item) => (
              <GalleryTile key={item.id} item={item} onOpen={setLightboxItem} />
            ))}
          </motion.div>
        </AnimatePresence>
      </section>

      {/* ---------- Lightbox ---------- */}
      <AnimatePresence>
        {lightboxItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#2B1210]/90 backdrop-blur-sm px-4"
            onClick={() => setLightboxItem(null)}
          >
            <button
              onClick={() => setLightboxItem(null)}
              aria-label="Close"
              className="absolute right-5 top-5 rounded-full p-2.5 text-white/80 hover:bg-white/10 hover:text-white"
            >
              <X className="h-6 w-6" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                goToLightbox(-1);
              }}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full p-2.5 text-white/70 hover:bg-white/10 hover:text-white md:left-6"
            >
              <ChevronLeft className="h-7 w-7" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToLightbox(1);
              }}
              aria-label="Next image"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-2.5 text-white/70 hover:bg-white/10 hover:text-white md:right-6"
            >
              <ChevronRight className="h-7 w-7" />
            </button>

            <motion.div
              key={lightboxItem.id}
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4, ease: easeClassy }}
              onClick={(e) => e.stopPropagation()}
              className="flex max-h-[85vh] max-w-3xl flex-col items-center"
            >
              <img
                src={lightboxItem.img}
                alt={lightboxItem.title}
                className="max-h-[70vh] w-auto rounded-2xl object-contain shadow-2xl"
              />
              <div className="mt-5 text-center">
                <span className="text-[11px] uppercase tracking-[0.16em] text-[#D9AFAE]">
                  {lightboxItem.tag}
                </span>
                <p
                  className="mt-1 text-[22px] text-white"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {lightboxItem.title}
                </p>
                <p className="mt-1 text-[12px] text-white/50">
                  {currentIndex + 1} / {filtered.length}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;