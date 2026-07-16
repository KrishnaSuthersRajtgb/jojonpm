import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useInView, animate } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Sparkles, Scissors, Users, Award, Ruler } from "lucide-react";
// import { motion, AnimatePresence, useInView, animate } from "framer-motion";
// Uses same fonts as Navbar/Home/About/Contact/Collection:
// <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600&family=Jost:wght@300;400;500&display=swap" rel="stylesheet">

const FILTERS = ["All", "Ready-Made", "Girls Customization", "Bridal", "Behind the Scenes"];

// tall/short pairing gives the grid a masonry rhythm without a real masonry lib
const GALLERY = [
  { id: 1, tag: "Ready-Made", title: "Aria Wrap Dress", size: "tall", img: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&q=80" },
  { id: 2, tag: "Girls Customization", title: "Petal Party Frock", size: "short", img: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=800&q=80" },
  { id: 3, tag: "Bridal", title: "Hand-Finished Lehenga", size: "short", img: "https://images.unsplash.com/photo-1610189844777-097e5e1beb08?w=800&q=80" },
  { id: 4, tag: "Behind the Scenes", title: "Cutting the First Pattern", size: "tall", img: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&q=80" },
  { id: 5, tag: "Ready-Made", title: "Nova Silk Scarf", size: "short", img: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=800&q=80" },
  { id: 6, tag: "Girls Customization", title: "Blossom Girls Lehenga", size: "tall", img: "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=800&q=80" },
  { id: 7, tag: "Behind the Scenes", title: "Thread & Trim Table", size: "short", img: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80" },
  { id: 8, tag: "Bridal", title: "Beadwork Detail", size: "tall", img: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=800&q=80" },
  { id: 9, tag: "Ready-Made", title: "Evening Silhouette", size: "short", img: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80" },
  { id: 10, tag: "Girls Customization", title: "Fitting Day", size: "tall", img: "https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?w=800&q=80" },
  { id: 11, tag: "Behind the Scenes", title: "The Tailor's Hands", size: "short", img: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80" },
  { id: 12, tag: "Bridal", title: "Final Fitting", size: "tall", img: "https://images.unsplash.com/photo-1591085686350-798c0f9faa7f?w=800&q=80" },
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

const GalleryTile = ({ item, onOpen }) => (
  <motion.button
    variants={gridItem}
    onClick={() => onOpen(item)}
    className={`group relative w-full overflow-hidden rounded-2xl bg-[#EDE9FE]/30 text-left ${
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
      className="absolute inset-0 bg-[#EDE9FE]"
      initial={{ scaleX: 1 }}
      whileInView={{ scaleX: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.8, ease: easeClassy }}
      style={{ transformOrigin: "right" }}
    />
    <div className="absolute inset-0 bg-gradient-to-t from-[#1F2937]/70 via-[#1F2937]/0 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
    <div className="absolute bottom-0 left-0 right-0 translate-y-3 p-5 opacity-0 transition-all duration-400 group-hover:translate-y-0 group-hover:opacity-100">
      <span className="text-[10px] uppercase tracking-[0.16em] text-[#A78BFA]">
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

  const goTo = useCallback(
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
      if (e.key === "ArrowRight") goTo(1);
      if (e.key === "ArrowLeft") goTo(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightboxItem, goTo]);

  return (
    <div className="bg-white text-[#1F2937]" style={{ fontFamily: "'Jost', sans-serif" }}>
      {/* ---------- Page header ---------- */}
      <section className="relative overflow-hidden bg-[#EDE9FE]">
        <motion.div
          initial={{ opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easeClassy }}
          className="mx-auto max-w-7xl px-6 py-16 text-center md:px-10"
        >
          <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-[11px] uppercase tracking-[0.18em] text-[#7C3AED]">
            <Sparkles className="h-3.5 w-3.5" />
            The Gallery
          </span>
          <h1
            className="text-[38px] leading-tight text-[#1F2937] md:text-[50px]"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Every Stitch, <span className="italic text-[#7C3AED]">On Display</span>
          </h1>
          <p className="mx-auto mt-3 max-w-md text-[14px] text-[#1F2937]/70">
            A closer look at ready-made pieces, custom fittings, and
            the hands that bring them together.
          </p>
        </motion.div>
        <div className="relative h-[2px] w-full overflow-hidden bg-white/40">
          <div className="absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-[#7C3AED] to-transparent animate-[shimmer_5s_ease-in-out_infinite]" />
        </div>
      </section>

      {/* ---------- Milestones — what success we've made ---------- */}
      <section className="border-b border-[#EDE9FE] py-16">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerParent}
          className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 md:grid-cols-4 md:px-10"
        >
          {MILESTONES.map(({ icon: Icon, target, suffix, label }) => (
            <motion.div key={label} variants={fadeUp} className="text-center">
              <span className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-[#EDE9FE]">
                <Icon className="h-5 w-5 text-[#7C3AED]" strokeWidth={1.5} />
              </span>
              <p
                className="text-[30px] text-[#7C3AED] md:text-[36px]"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                <Counter target={target} suffix={suffix} />
              </p>
              <p className="mt-1 text-[11px] uppercase tracking-[0.12em] text-[#1F2937]/55">
                {label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ---------- What we've done ---------- */}
      <section className="mx-auto max-w-7xl px-6 py-20 md:px-10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className="mx-auto mb-14 max-w-xl text-center"
        >
          <span className="text-[11px] uppercase tracking-[0.2em] text-[#7C3AED]/70">
            What We've Done
          </span>
          <h2
            className="mt-3 text-[30px] text-[#1F2937] md:text-[36px]"
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
          className="grid grid-cols-1 gap-6 md:grid-cols-3"
        >
          {ACHIEVEMENTS.map(({ title, desc }) => (
            <motion.div
              key={title}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.4, ease: easeClassy }}
              className="rounded-2xl border border-[#EDE9FE] p-8 transition-colors duration-300 hover:border-[#7C3AED]/40 hover:shadow-[0_20px_40px_-24px_rgba(124,58,237,0.25)]"
            >
              <h3
                className="text-[19px] text-[#1F2937]"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                {title}
              </h3>
              <p className="mt-2 text-[13px] leading-relaxed text-[#1F2937]/65">
                {desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ---------- Filter tabs ---------- */}
      <div className="sticky top-0 z-30 border-b border-[#EDE9FE] bg-white/95 backdrop-blur-md">
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
                      : "border border-[#EDE9FE] text-[#1F2937]/70 hover:border-[#7C3AED] hover:text-[#7C3AED]"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="galleryActivePill"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      className="absolute inset-0 rounded-full bg-[#7C3AED]"
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
      <section className="mx-auto max-w-7xl px-6 py-14 md:px-10">
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
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#1F2937]/90 backdrop-blur-sm px-4"
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
                goTo(-1);
              }}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full p-2.5 text-white/70 hover:bg-white/10 hover:text-white md:left-6"
            >
              <ChevronLeft className="h-7 w-7" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                goTo(1);
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
                <span className="text-[11px] uppercase tracking-[0.16em] text-[#A78BFA]">
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