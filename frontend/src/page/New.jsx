import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Heart, ArrowRight, ChevronLeft, ChevronRight, Clock } from "lucide-react";

// Uses same fonts as Navbar/Home/Footer/Collection/About/Contact:
// <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600&family=Jost:wght@300;400;500&display=swap" rel="stylesheet">

// New arrivals — mix of ready-made and girls customization pieces
const NEW_ARRIVALS = [
  {
    id: 1,
    name: "Aria Wrap Dress",
    price: 128,
    img: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=700&q=80",
    type: "Ready-Made",
    daysAgo: 1,
  },
  {
    id: 2,
    name: "Petal Party Frock",
    price: 74,
    img: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=700&q=80",
    type: "Customizable",
    daysAgo: 1,
  },
  {
    id: 3,
    name: "Anarkali Kurti",
    price: 82,
    img: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=700&q=80",
    type: "Ready-Made",
    daysAgo: 2,
  },
  {
    id: 4,
    name: "Ruffle Lehenga",
    price: 156,
    img: "https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?w=700&q=80",
    type: "Customizable",
    daysAgo: 3,
  },
  {
    id: 5,
    name: "Nova Silk Scarf",
    price: 56,
    img: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=700&q=80",
    type: "Ready-Made",
    daysAgo: 4,
  },
  {
    id: 6,
    name: "Blossom A-Line Dress",
    price: 68,
    img: "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=700&q=80",
    type: "Customizable",
    daysAgo: 5,
  },
  {
    id: 7,
    name: "Tailored Blazer",
    price: 142,
    img: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=700&q=80",
    type: "Ready-Made",
    daysAgo: 6,
  },
  {
    id: 8,
    name: "Palazzo Jumpsuit",
    price: 98,
    img: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=700&q=80",
    type: "Customizable",
    daysAgo: 7,
  },
];

const FILTERS = ["All", "Ready-Made", "Customizable"];
const easeClassy = [0.16, 1, 0.3, 1];

const arrivalLabel = (days) => {
  if (days <= 1) return "Just In";
  return `${days} days ago`;
};

// ---------- Featured carousel (top 5 arrivals) ----------
const FEATURED = NEW_ARRIVALS.slice(0, 5);

const CarouselHero = () => {
  const [index, setIndex] = useState(0);

  const go = (dir) => setIndex((i) => (i + dir + FEATURED.length) % FEATURED.length);

  const getOffset = (i) => {
    let diff = i - index;
    if (diff > FEATURED.length / 2) diff -= FEATURED.length;
    if (diff < -FEATURED.length / 2) diff += FEATURED.length;
    return diff;
  };

  return (
    <section className="relative overflow-hidden bg-[#1F2937]">
      {/* blurred backdrop from the centered item */}
      <AnimatePresence mode="popLayout">
        <motion.img
          key={FEATURED[index].id}
          src={FEATURED[index].img}
          alt=""
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.55 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: easeClassy }}
          className="absolute inset-0 h-full w-full scale-110 object-cover blur-2xl"
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-b from-[#1F2937]/70 via-[#1F2937]/60 to-[#1F2937]/90" />

      <div className="relative mx-auto max-w-7xl px-6 pb-16 pt-16 md:px-10 md:pt-20">
        <motion.div
          initial={{ opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easeClassy }}
          className="text-center"
        >
          <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-[11px] uppercase tracking-[0.18em] text-[#D8CCFB] backdrop-blur-sm">
            <Clock className="h-3.5 w-3.5" />
            Updated This Week
          </span>
          <h1
            className="text-[38px] leading-tight text-white md:text-[52px]"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            New Arrivals
          </h1>
          <p
            className="mt-1 text-[22px] italic text-[#D8CCFB] md:text-[28px]"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Summer Wear
          </p>
        </motion.div>

        {/* ---------- Carousel ---------- */}
        <div className="relative mt-12 flex h-[300px] items-center justify-center md:h-[380px]">
          <button
            onClick={() => go(-1)}
            aria-label="Previous"
            className="absolute left-2 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-white/25 text-white/80 backdrop-blur-sm transition-colors hover:bg-white/10 hover:text-white md:left-8"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => go(1)}
            aria-label="Next"
            className="absolute right-2 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-white/25 text-white/80 backdrop-blur-sm transition-colors hover:bg-white/10 hover:text-white md:right-8"
          >
            <ChevronRight className="h-4 w-4" />
          </button>

          <div className="relative h-full w-full max-w-md md:max-w-2xl">
            {FEATURED.map((item, i) => {
              const offset = getOffset(i);
              if (Math.abs(offset) > 1) return null;
              const isCenter = offset === 0;
              return (
                <motion.button
                  key={item.id}
                  onClick={() => (isCenter ? null : setIndex(i))}
                  animate={{
                    x: `${offset * 62}%`,
                    scale: isCenter ? 1 : 0.82,
                    opacity: Math.abs(offset) > 1 ? 0 : isCenter ? 1 : 0.55,
                    zIndex: isCenter ? 10 : 5,
                  }}
                  transition={{ duration: 0.55, ease: easeClassy }}
                  className="absolute left-1/2 top-1/2 w-[190px] -translate-x-1/2 -translate-y-1/2 md:w-[240px]"
                  style={{ cursor: isCenter ? "default" : "pointer" }}
                >
                  <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-white shadow-2xl shadow-black/40">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                    {isCenter && (
                      <motion.span
                        initial={{ scale: 0, rotate: -20 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.2, duration: 0.5, ease: easeClassy }}
                        className="absolute right-3 top-3 flex h-14 w-14 flex-col items-center justify-center rounded-full bg-[#7C3AED] text-center leading-none text-white shadow-lg"
                      >
                        <span className="text-[9px] uppercase tracking-[0.06em] opacity-80">from</span>
                        <span className="text-[15px] font-medium">${item.price}</span>
                      </motion.span>
                    )}
                  </div>
                  {isCenter && (
                    <motion.p
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15, duration: 0.4 }}
                      className="mt-3 text-center text-[14px] text-white"
                      style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    >
                      {item.name}
                    </motion.p>
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* dots */}
        <div className="mt-4 flex justify-center gap-2">
          {FEATURED.map((item, i) => (
            <button
              key={item.id}
              onClick={() => setIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === index ? "w-6 bg-[#A78BFA]" : "w-1.5 bg-white/30 hover:bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="relative h-[2px] w-full overflow-hidden bg-white/10">
        <div className="absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-[#A78BFA] to-transparent animate-[shimmer_5s_ease-in-out_infinite]" />
      </div>
    </section>
  );
};

// ---------- shared grid motion ----------
const gridParent = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};
const gridItem = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeClassy } },
};

const New = () => {
  const [filter, setFilter] = useState("All");

  const filtered = useMemo(() => {
    if (filter === "All") return NEW_ARRIVALS;
    return NEW_ARRIVALS.filter((p) => p.type === filter);
  }, [filter]);

  return (
    <div className="overflow-hidden bg-white text-[#1F2937]" style={{ fontFamily: "'Jost', sans-serif" }}>
      <CarouselHero />

      {/* ---------- Filter bar ---------- */}
      <div className="sticky top-0 z-30 border-b border-[#EDE9FE] bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
          <div className="flex gap-2">
            {FILTERS.map((f) => {
              const isActive = filter === f;
              return (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`relative rounded-full px-5 py-2 text-[12px] uppercase tracking-[0.12em] transition-colors ${
                    isActive ? "text-white" : "border border-[#EDE9FE] text-[#1F2937]/70 hover:border-[#7C3AED] hover:text-[#7C3AED]"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="newArrivalsPill"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      className="absolute inset-0 rounded-full bg-[#7C3AED]"
                    />
                  )}
                  <span className="relative">{f}</span>
                </button>
              );
            })}
          </div>
          <p className="hidden text-[13px] text-[#1F2937]/50 sm:block">
            {filtered.length} {filtered.length === 1 ? "piece" : "pieces"}
          </p>
        </div>
      </div>

      {/* ---------- Product grid ---------- */}
      <section className="mx-auto max-w-7xl px-6 py-14 md:px-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            variants={gridParent}
            className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4"
          >
            {filtered.map((p) => (
              <motion.div key={p.id} variants={gridItem} className="group">
                <div className="relative mb-4 aspect-[3/4] overflow-hidden rounded-2xl bg-[#EDE9FE]/30">
                  <motion.img
                    src={p.img}
                    alt={p.name}
                    loading="lazy"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.6, ease: easeClassy }}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1F2937]/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  <div className="absolute left-3 top-3 flex flex-col gap-2">
                    <span
                      className={`rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.1em] transition-colors ${
                        p.daysAgo <= 1 ? "bg-[#7C3AED] text-white" : "bg-white text-[#7C3AED]"
                      }`}
                    >
                      {arrivalLabel(p.daysAgo)}
                    </span>
                  </div>

                  <button className="absolute right-3 top-3 flex h-8 w-8 translate-y-1 items-center justify-center rounded-full bg-white/90 text-[#1F2937] opacity-0 transition-all duration-300 hover:text-[#7C3AED] group-hover:translate-y-0 group-hover:opacity-100">
                    <Heart className="h-4 w-4" strokeWidth={1.5} />
                  </button>

                  <div className="absolute bottom-3 left-3 right-3 translate-y-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <button className="flex w-full items-center justify-center gap-1.5 rounded-full bg-white/95 py-2.5 text-[11px] uppercase tracking-[0.12em] text-[#1F2937] backdrop-blur-sm">
                      View Details
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>

                <p className="text-[14px] font-medium text-[#1F2937]">{p.name}</p>
                <div className="mt-0.5 flex items-center justify-between">
                  <p className="text-[13px] text-[#1F2937]/60">${p.price}</p>
                  <span className="text-[11px] uppercase tracking-[0.08em] text-[#7C3AED]/80">
                    {p.type}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <p className="text-[16px] text-[#1F2937]/60">
              No new arrivals in this category yet.
            </p>
            <button
              onClick={() => setFilter("All")}
              className="mt-4 text-[13px] uppercase tracking-[0.12em] text-[#7C3AED] hover:underline"
            >
              View all new arrivals
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default New;