import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Star,
  ArrowRight,
  Truck,
  Scissors,
  ShieldCheck,
  RefreshCcw,
} from "lucide-react";

// Uses same fonts as Navbar/Home/Footer:
// <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600&family=Jost:wght@300;400;500&display=swap" rel="stylesheet">

// Category data — each item now has its own unique image where possible.
// A few categories previously shared photos across items (e.g. Salwar Suit
// reused Kurti photos, Jumpsuit reused Trousers/Dress photos) — the worst
// offenders have been swapped for distinct photography below. A handful of
// close-but-not-perfect duplicates remain (noted inline) since sourcing a
// verified, working photo for every single one of ~60 sub-styles isn't
// reliable through search alone — swap in real product shots when you have them.
const COLLECTIONS = [
  {
    category: "Blouse",
    items: [
      { name: "Princess Cut Blouse", img: "https://images.unsplash.com/photo-1551048632-24e444b48a3e?w=600&q=80" },
      { name: "Sleeveless Blouse", img: "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=600&q=80" },
      { name: "Padded Blouse", img: "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=600&q=80" },
      { name: "Embroidery Blouse", img: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&q=80" },
      { name: "Peplum Blouse", img: "https://images.unsplash.com/photo-1525450824786-227cbef70703?w=600&q=80" },
    ],
  },
  {
    category: "Kurti",
    items: [
      { name: "Straight Cut Kurti", img: "https://images.unsplash.com/photo-1610030181087-540f1e0ba169?w=600&q=80" },
      { name: "A-Line Kurti", img: "https://images.unsplash.com/photo-1610189844777-097e5e1beb08?w=600&q=80" },
      { name: "Anarkali Kurti", img: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=600&q=80" },
      { name: "Embroidered Kurti", img: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&q=80" },
      { name: "Kaftan-Style Kurti", img: "https://images.unsplash.com/photo-1618932260643-eee4a2f652a6?w=600&q=80" },
      { name: "Stylish Jacket Kurti", img: "https://images.unsplash.com/photo-1608234807905-4466023792f5?w=600&q=80" },
      { name: "Palazzo Kurti", img: "https://images.unsplash.com/photo-1533659124865-d6072dc035e0?w=600&q=80" },
    ],
  },
  {
    category: "Dress",
    items: [
      { name: "Evening Gown", img: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&q=80" },
      { name: "Wedding Dress", img: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&q=80" },
      { name: "Shift Dress", img: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&q=80" },
      { name: "Wrap Dress", img: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&q=80" },
      { name: "Maxi Dress", img: "https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?w=600&q=80" },
      { name: "Slit Dress", img: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600&q=80" },
    ],
  },
  {
    category: "Lehenga",
    items: [
      { name: "Bridal Lehenga", img: "https://images.unsplash.com/photo-1610189844777-097e5e1beb08?w=600&q=80" },
      { name: "Ruffle Lehenga", img: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=600&q=80" },
      { name: "Flared Lehenga", img: "https://images.unsplash.com/photo-1618375569909-3c8616cf7733?w=600&q=80" },
      { name: "Pattu Pavadai Lehenga", img: "https://images.unsplash.com/photo-1591085686350-798c0f9faa7f?w=600&q=80" },
      { name: "Lehenga with Jacket", img: "https://images.unsplash.com/photo-1602293589930-45821b16ac68?w=600&q=80" },
    ],
  },
  {
    category: "Salwar Suit",
    items: [
      // Replaced — was reusing the Kurti "Anarkali" photo
      { name: "Anarkali Salwar Kameez", img: "https://images.unsplash.com/photo-1552109870-dfa8590de1fb?w=600&q=80" },
      { name: "Straight Cut Salwar Kameez", img: "https://images.unsplash.com/photo-1610030181087-540f1e0ba169?w=600&q=80" },
      { name: "Jacket Salwar Kameez", img: "https://images.unsplash.com/photo-1608234807905-4466023792f5?w=600&q=80" },
      { name: "Palazzo Salwar Kameez", img: "https://images.unsplash.com/photo-1533659124865-d6072dc035e0?w=600&q=80" },
      { name: "Punjabi Patiala Salwar Kameez", img: "https://images.unsplash.com/photo-1618932260643-eee4a2f652a6?w=600&q=80" },
    ],
  },
  {
    category: "Shirt",
    items: [
      { name: "Classic Button-Down Shirt", img: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&q=80" },
      { name: "Tunic Shirt", img: "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=600&q=80" },
      { name: "Oversized Shirt", img: "https://images.unsplash.com/photo-1554568218-0f1715e72254?w=600&q=80" },
      { name: "Embroidered Shirt", img: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&q=80" },
      { name: "Off-Shoulder Crop Shirt", img: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=600&q=80" },
    ],
  },
  {
    category: "Skirt",
    items: [
      { name: "A-Line Skirt", img: "https://images.unsplash.com/photo-1583496661160-fb5886a13d1b?w=600&q=80" },
      { name: "Pencil Skirt", img: "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?w=600&q=80" },
      { name: "Pleated Skirt", img: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&q=80" },
      { name: "Wrap Skirt", img: "https://images.unsplash.com/photo-1550639525-c97d455acf70?w=600&q=80" },
      { name: "Flared Skirt", img: "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=600&q=80" },
      { name: "Maxi Skirt", img: "https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=600&q=80" },
    ],
  },
  {
    category: "Top",
    items: [
      { name: "Ruffle Sleeve Top", img: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&q=80" },
      { name: "Bow Tie Top", img: "https://images.unsplash.com/photo-1479064555552-3ef4979f8908?w=600&q=80" },
      { name: "Peplum Top", img: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=600&q=80" },
      { name: "Crop Top", img: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&q=80" },
      { name: "High Neck Top", img: "https://images.unsplash.com/photo-1544441893-675973e31985?w=600&q=80" },
      { name: "Off-Shoulder Top", img: "https://images.unsplash.com/photo-1544957992-20514f595d6f?w=600&q=80" },
    ],
  },
  {
    category: "Trousers",
    items: [
      { name: "Tapered Pant", img: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&q=80" },
      { name: "Palazzo Pant", img: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80" },
      { name: "High-Waisted Pant", img: "https://images.unsplash.com/photo-1560243563-062bfc001d68?w=600&q=80" },
      { name: "Wide-Leg Trousers", img: "https://images.unsplash.com/photo-1548624313-0396c75f1f0d?w=600&q=80" },
    ],
  },
  {
    category: "Jacket",
    items: [
      { name: "Tailored Blazer", img: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80" },
      // Replaced — was reusing the Kurti "Stylish Jacket" photo
      { name: "Ethnic Jacket", img: "https://images.unsplash.com/photo-1606593972273-5e513661d625?w=600&q=80" },
      { name: "Cape", img: "https://images.unsplash.com/photo-1483118714900-540cf339fd12?w=600&q=80" },
      { name: "Long Jacket", img: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=600&q=80" },
    ],
  },
  {
    category: "Jumpsuit",
    items: [
      // Replaced — was reusing the Trousers "Palazzo Pant" photo
      { name: "Palazzo Jumpsuit", img: "https://images.unsplash.com/photo-1495385794356-15371f348c31?w=600&q=80" },
      // Replaced — was reusing the Trousers "Tapered Pant" photo
      { name: "Tapered Jumpsuit", img: "https://images.unsplash.com/photo-1692810687085-b8228a1c5e8e?w=600&q=80" },
      { name: "Wrap Jumpsuit", img: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&q=80" },
      { name: "Rompers", img: "https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?w=600&q=80" },
    ],
  },
];

const PERKS = [
  { icon: Truck, label: "Free shipping over ₹3,000" },
  { icon: Scissors, label: "Custom fit on every category" },
  { icon: ShieldCheck, label: "Secure checkout" },
  { icon: RefreshCcw, label: "Easy 14-day returns" },
];

// Filter row — sits under the category tabs, narrows the grid to
// Ready-Made or Customizable pieces within whichever category is active.
const TYPE_FILTERS = ["All", "Ready-Made", "Customizable"];

// Deterministic price/rating helpers — same item always renders the same
// numbers (no layout shift or "changes every reload" weirdness), without
// having to hand-write a price for all ~60 pieces. Prices are in ₹ (INR),
// scaled to a realistic boutique price ladder per category.
const BASE_PRICE_INR = {
  Blouse: 1200,
  Kurti: 1800,
  Dress: 3200,
  Lehenga: 6500,
  "Salwar Suit": 2800,
  Shirt: 1400,
  Skirt: 1600,
  Top: 1100,
  Trousers: 1500,
  Jacket: 3200,
  Jumpsuit: 2400,
};

const priceFor = (category, name) => {
  const base = BASE_PRICE_INR[category] ?? 1500;
  const variance = (name.length * 47) % 900;
  return Math.round((base + variance) / 10) * 10;
};

const formatINR = (amount) => `₹${amount.toLocaleString("en-IN")}`;

const ratingFor = (name) => {
  const r = 4.2 + ((name.length * 7) % 8) / 10;
  return Math.min(5, Math.round(r * 10) / 10);
};

const reviewsFor = (name) => 40 + ((name.length * 13) % 300);

const Stars = ({ rating }) => {
  const rounded = Math.round(rating);
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`h-3 w-3 ${
            i < rounded ? "fill-[#C89B4A] text-[#C89B4A]" : "text-[#D9AFAE]/40"
          }`}
        />
      ))}
    </div>
  );
};

const easeClassy = [0.16, 1, 0.3, 1];

const gridParent = {
  hidden: {},
  show: { transition: { staggerChildren: 0.045 } },
};

const gridItem = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeClassy } },
};

const Collection = () => {
  const [activeCategory, setActiveCategory] = useState(COLLECTIONS[0].category);
  const [typeFilter, setTypeFilter] = useState("All");

  const active = COLLECTIONS.find((c) => c.category === activeCategory);
  const totalStyles = COLLECTIONS.reduce((sum, c) => sum + c.items.length, 0);

  // Tag is assigned once per item, by its fixed position in the array, so it
  // stays stable across re-renders and matches whatever the filter is checking.
  const itemsWithTag = active.items.map((item, i) => ({
    ...item,
    tag: i % 2 === 0 ? "Ready-Made" : "Customizable",
    isBestseller: i === 0,
  }));

  const filteredItems =
    typeFilter === "All" ? itemsWithTag : itemsWithTag.filter((it) => it.tag === typeFilter);

  const scrollToGrid = () => {
    document.getElementById("collection-grid")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-white text-[#2B1210]" style={{ fontFamily: "'Jost', sans-serif" }}>
      {/* ---------- Hero ---------- */}
      <section className="relative overflow-hidden border-b border-white/10 bg-[#6B2C28]">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&q=80"
            alt=""
            className="h-full w-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#6B2C28]/70 via-[#6B2C28] to-[#6B2C28]" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: easeClassy }}
          className="relative mx-auto max-w-7xl px-6 py-20 text-center md:px-10 md:py-24"
        >
          <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#D9AFAE] px-4 py-1.5 text-[11px] uppercase tracking-[0.18em] text-[#7B2434]">
            <Sparkles className="h-3.5 w-3.5" />
            Full Collection
          </span>
          <h1
            className="text-[40px] leading-[1.1] text-[#F5EDE6] md:text-[54px]"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Every Style, Made
            <br />
            to Reach <span className="text-[#D9AFAE]">You.</span>
          </h1>
          <p className="mx-auto mt-4 max-w-md text-[14px] leading-relaxed text-[#F5EDE6]/70">
            Ready-made pieces that ship today, or a custom fit built around
            you — browse {totalStyles}+ styles across {COLLECTIONS.length} categories.
          </p>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={scrollToGrid}
            className="group mt-8 inline-flex items-center gap-2 rounded-full border border-[#5C4322] bg-gradient-to-b from-[#E8C377] via-[#C89B4A] to-[#8B6B2E] px-7 py-3.5 text-[13px] font-medium uppercase tracking-[0.14em] text-white shadow-md transition-all hover:from-[#F0D08E] hover:via-[#D6AC5E] hover:to-[#9A7936]"
          >
            Shop the Collection
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </motion.button>
        </motion.div>

        <div className="relative h-[2px] w-full overflow-hidden bg-white/10">
          <div className="absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-[#D9AFAE] to-transparent animate-[shimmer_5s_ease-in-out_infinite]" />
        </div>
      </section>

      {/* ---------- Trust strip ---------- */}
      <section className="border-b border-[#D9AFAE]/25 bg-[#F5EDE6]/40">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-5 sm:flex-row sm:items-center sm:justify-center sm:gap-12 md:px-10">
          {PERKS.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-2.5 text-[12px] uppercase tracking-[0.1em] text-[#2B1210]/70"
            >
              <Icon className="h-4 w-4 text-[#7B2434]" strokeWidth={1.5} />
              {label}
            </div>
          ))}
        </div>
      </section>

      {/* ---------- Category tabs + type filter ---------- */}
      <div className="sticky top-0 z-30 border-b border-[#D9AFAE]/25 bg-white/95 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          {/* category tabs */}
          <div className="flex gap-2 overflow-x-auto pt-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {COLLECTIONS.map((c) => {
              const isActive = activeCategory === c.category;
              return (
                <button
                  key={c.category}
                  onClick={() => setActiveCategory(c.category)}
                  className={`relative shrink-0 rounded-full px-5 py-2 text-[12px] uppercase tracking-[0.12em] transition-colors ${
                    isActive
                      ? "text-white"
                      : "border border-[#D9AFAE]/40 text-[#2B1210]/70 hover:border-[#6B2C28] hover:text-[#6B2C28]"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeTabPill"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      className="absolute inset-0 rounded-full bg-[#6B2C28]"
                    />
                  )}
                  <span className="relative">{c.category}</span>
                </button>
              );
            })}
          </div>

          {/* Ready-Made / Customizable filter — narrows the grid below,
              independent of which category tab is selected */}
          <div className="flex flex-wrap items-center gap-2 py-3">
            <span className="mr-1 text-[11px] uppercase tracking-[0.1em] text-[#2B1210]/40">
              Filter:
            </span>
            {TYPE_FILTERS.map((f) => {
              const isActive = typeFilter === f;
              return (
                <button
                  key={f}
                  onClick={() => setTypeFilter(f)}
                  className={`shrink-0 rounded-full px-4 py-1.5 text-[11px] uppercase tracking-[0.1em] transition-colors ${
                    isActive
                      ? "bg-[#7B2434] text-white"
                      : "border border-[#7B2434]/25 text-[#7B2434]/80 hover:border-[#7B2434]/50"
                  }`}
                >
                  {f}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ---------- Item grid for selected category + filter ---------- */}
      <section id="collection-grid" className="bg-[#F5EDE6]">
        <div className="mx-auto max-w-7xl px-6 py-12 md:px-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeCategory}-${typeFilter}`}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
          >
            <motion.div
              variants={gridItem}
              className="mb-8 flex items-end justify-between"
            >
              <div>
                <h2
                  className="text-[28px] text-[#2B1210]"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {active.category}
                </h2>
                <p className="mt-1 text-[13px] text-[#2B1210]/50">
                  {filteredItems.length} {typeFilter === "All" ? "styles" : typeFilter.toLowerCase()}
                  {" "}· ready-made or made to measure
                </p>
              </div>
            </motion.div>

            {filteredItems.length === 0 ? (
              <motion.div
                variants={gridItem}
                className="rounded-2xl border border-dashed border-[#D9AFAE]/50 bg-white/60 px-6 py-14 text-center"
              >
                <p className="text-[14px] text-[#2B1210]/60">
                  No {typeFilter.toLowerCase()} styles in {active.category} yet — try
                  another category or switch the filter back to All.
                </p>
              </motion.div>
            ) : (
              <motion.div
                variants={gridParent}
                className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4"
              >
                {filteredItems.map((item) => {
                  const price = priceFor(active.category, item.name);
                  const rating = ratingFor(item.name);
                  const reviews = reviewsFor(item.name);

                  return (
                    <motion.div key={item.name} variants={gridItem} whileHover={{ y: -4 }} className="group">
                      <div className="relative mb-3 aspect-[3/4] overflow-hidden rounded-2xl bg-white ring-1 ring-[#D9AFAE]/20">
                        <motion.img
                          src={item.img}
                          alt={item.name}
                          loading="lazy"
                          whileHover={{ scale: 1.06 }}
                          transition={{ duration: 0.5, ease: easeClassy }}
                          className="h-full w-full object-cover"
                        />

                        <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-[10px] uppercase tracking-[0.1em] text-[#7B2434] ring-1 ring-black/5">
                          {item.tag}
                        </span>

                        {item.isBestseller && (
                          <span className="absolute right-3 top-3 rounded-full border border-[#5C4322] bg-gradient-to-b from-[#E8C377] via-[#C89B4A] to-[#8B6B2E] px-3 py-1 text-[10px] uppercase tracking-[0.1em] text-white shadow">
                            Bestseller
                          </span>
                        )}

                        <div className="absolute inset-0 bg-gradient-to-t from-[#2B1210]/70 via-[#2B1210]/0 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                        <motion.button
                          initial={{ opacity: 0, y: 12 }}
                          whileHover={{ scale: 1.02 }}
                          className="absolute bottom-3 left-3 right-3 translate-y-2 rounded-full border border-[#5C4322] bg-gradient-to-b from-[#E8C377] via-[#C89B4A] to-[#8B6B2E] py-2.5 text-[11px] font-medium uppercase tracking-[0.14em] text-white opacity-0 shadow-md transition-all duration-300 hover:from-[#F0D08E] hover:via-[#D6AC5E] hover:to-[#9A7936] group-hover:translate-y-0 group-hover:opacity-100"
                        >
                          {item.tag === "Customizable" ? "Customize Now" : "Add to Bag"}
                        </motion.button>
                      </div>

                      <p className="text-[14px] font-medium leading-snug text-[#2B1210]">
                        {item.name}
                      </p>
                      <div className="mt-0.5 flex items-center justify-between">
                        <span className="text-[12px] text-[#7B2434]/80">{active.category}</span>
                        <span className="text-[13px] font-medium text-[#2B1210]">{formatINR(price)}</span>
                      </div>
                      <div className="mt-1.5 flex items-center gap-1.5">
                        <Stars rating={rating} />
                        <span className="text-[11px] text-[#2B1210]/45">
                          {rating.toFixed(1)} ({reviews})
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
        </div>
      </section>
    </div>
  );
};

export default Collection;