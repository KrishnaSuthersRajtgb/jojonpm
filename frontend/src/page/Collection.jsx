import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Uses same fonts as Navbar/Home/Footer:
// <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600&family=Jost:wght@300;400;500&display=swap" rel="stylesheet">

// Category data — each item now has its own unique image
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
      { name: "Anarkali Salwar Kameez", img: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=600&q=80" },
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
      { name: "Ethnic Jacket", img: "https://images.unsplash.com/photo-1608234807905-4466023792f5?w=600&q=80" },
      { name: "Cape", img: "https://images.unsplash.com/photo-1483118714900-540cf339fd12?w=600&q=80" },
      { name: "Long Jacket", img: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=600&q=80" },
    ],
  },
  {
    category: "Jumpsuit",
    items: [
      { name: "Palazzo Jumpsuit", img: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80" },
      { name: "Tapered Jumpsuit", img: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&q=80" },
      { name: "Wrap Jumpsuit", img: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&q=80" },
      { name: "Rompers", img: "https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?w=600&q=80" },
    ],
  },
];

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

  const active = COLLECTIONS.find((c) => c.category === activeCategory);

  return (
    <div className="bg-white text-[#1F2937]" style={{ fontFamily: "'Jost', sans-serif" }}>
      {/* ---------- Page header ---------- */}
      <section className="relative overflow-hidden bg-[#EDE9FE]">
        <motion.div
          initial={{ opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: easeClassy }}
          className="mx-auto max-w-7xl px-6 py-14 text-center md:px-10"
        >
          <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-[11px] uppercase tracking-[0.18em] text-[#7C3AED]">
            Full Collection
          </span>
          <h1
            className="text-[38px] leading-tight text-[#1F2937] md:text-[48px]"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Browse by Category
          </h1>
          <p className="mx-auto mt-3 max-w-md text-[14px] text-[#1F2937]/70">
            Every style we offer, ready-made or customized for you.
          </p>
        </motion.div>
        <div className="relative h-[2px] w-full overflow-hidden bg-white/40">
          <div className="absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-[#7C3AED] to-transparent animate-[shimmer_5s_ease-in-out_infinite]" />
        </div>
      </section>

      {/* ---------- Category tabs ---------- */}
      <div className="sticky top-0 z-30 border-b border-[#EDE9FE] bg-white/95 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="flex gap-2 overflow-x-auto py-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {COLLECTIONS.map((c) => {
              const isActive = activeCategory === c.category;
              return (
                <button
                  key={c.category}
                  onClick={() => setActiveCategory(c.category)}
                  className={`relative shrink-0 rounded-full px-5 py-2 text-[12px] uppercase tracking-[0.12em] transition-colors ${
                    isActive
                      ? "text-white"
                      : "border border-[#EDE9FE] text-[#1F2937]/70 hover:border-[#7C3AED] hover:text-[#7C3AED]"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeTabPill"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      className="absolute inset-0 rounded-full bg-[#7C3AED]"
                    />
                  )}
                  <span className="relative">{c.category}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ---------- Item grid for selected category ---------- */}
      <section className="mx-auto max-w-7xl px-6 py-12 md:px-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
          >
            <motion.div
              variants={gridItem}
              className="mb-8 flex items-end justify-between"
            >
              <h2
                className="text-[28px] text-[#1F2937]"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                {active.category}
              </h2>
              <span className="text-[13px] text-[#1F2937]/50">
                {active.items.length} styles
              </span>
            </motion.div>

            <motion.div
              variants={gridParent}
              className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4"
            >
              {active.items.map((item) => (
                <motion.div key={item.name} variants={gridItem} className="group">
                  <div className="relative mb-3 aspect-[3/4] overflow-hidden rounded-2xl bg-[#EDE9FE]/30">
                    <motion.img
                      src={item.img}
                      alt={item.name}
                      loading="lazy"
                      whileHover={{ scale: 1.06 }}
                      transition={{ duration: 0.5, ease: easeClassy }}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1F2937]/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </div>
                  <p className="text-[14px] font-medium leading-snug text-[#1F2937]">
                    {item.name}
                  </p>
                  <span className="text-[12px] text-[#7C3AED]/80">{active.category}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </section>
    </div>
  );
};

export default Collection;