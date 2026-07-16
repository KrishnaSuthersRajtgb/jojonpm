import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Gem, Sparkles, Truck, RefreshCcw, ShieldCheck, Scissors } from "lucide-react";

// Uses same fonts as Navbar:
// <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600&family=Jost:wght@300;400;500&display=swap" rel="stylesheet">

// Only two categories JoJo Boutique offers
const CATEGORIES = [
  {
    name: "Ready-Made",
    tagline: "Shop pieces made and ready to wear",
    img: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=700&q=80",
  },
  {
    name: "Girls Customization",
    tagline: "Made-to-order fits for your little one",
    img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80",
  },
];

const PRODUCTS = [
  { name: "Aria Wrap Dress", price: "$128", img: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500&q=80", tag: "Ready-Made" },
  { name: "Petal Party Frock (Girls)", price: "$74", img: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=500&q=80", tag: "Customizable" },
  { name: "Nova Silk Scarf", price: "$56", img: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=500&q=80", tag: "Ready-Made" },
  { name: "Blossom Girls Lehenga", price: "$98", img: "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=500&q=80", tag: "Customizable" },
];

const PERKS = [
  { icon: Truck, label: "Free shipping over $75" },
  { icon: Scissors, label: "Custom fit for girls' wear" },
  { icon: ShieldCheck, label: "Secure checkout" },
];

// ---------- shared motion variants ----------
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const staggerParent = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

const heroText = {
  hidden: { opacity: 0, y: 22 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.15 + i * 0.12 },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.94 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.35 } },
};

// Reusable wrapper: reveals children once, when scrolled into view
const Reveal = ({ children, className, variants = fadeUp, ...rest }) => (
  <motion.div
    className={className}
    variants={variants}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, amount: 0.25 }}
    {...rest}
  >
    {children}
  </motion.div>
);

const Home = () => {
  return (
    <div className="bg-white text-[#1F2937]" style={{ fontFamily: "'Jost', sans-serif" }}>
      {/* ---------- Hero ---------- */}
      <section className="relative overflow-hidden bg-[#EDE9FE]">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 py-20 md:grid-cols-2 md:px-10 md:py-28">
          <div>
            <motion.span
              custom={0}
              initial="hidden"
              animate="show"
              variants={heroText}
              className="mb-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-[11px] uppercase tracking-[0.18em] text-[#7C3AED]"
            >
              <Sparkles className="h-3.5 w-3.5" />
              Ready-Made & Custom Girls Wear
            </motion.span>

            <motion.h1
              custom={1}
              initial="hidden"
              animate="show"
              variants={heroText}
              className="text-[44px] leading-[1.1] text-[#1F2937] md:text-[60px]"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Wear what
              <br />
              feels like <span className="text-[#7C3AED]">you.</span>
            </motion.h1>

            <motion.p
              custom={2}
              initial="hidden"
              animate="show"
              variants={heroText}
              className="mt-6 max-w-md text-[15px] leading-relaxed text-[#1F2937]/70"
            >
              Shop our ready-made collection, or customize a piece
              for your girl — fit, fabric, and finish, made to order.
            </motion.p>

            <motion.div
              custom={3}
              initial="hidden"
              animate="show"
              variants={heroText}
              className="mt-9 flex items-center gap-5"
            >
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="group flex items-center gap-2 rounded-full bg-[#7C3AED] px-7 py-3.5 text-[13px] uppercase tracking-[0.14em] text-white"
              >
                Shop Ready-Made
                <motion.span
                  className="inline-flex"
                  initial={{ x: 0 }}
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <ArrowRight className="h-4 w-4" />
                </motion.span>
              </motion.button>
              <motion.button
                whileHover={{ x: 2 }}
                className="text-[13px] uppercase tracking-[0.14em] text-[#1F2937] underline decoration-[#7C3AED]/40 underline-offset-4 hover:decoration-[#7C3AED]"
              >
                Customize for Girls
              </motion.button>
            </motion.div>
          </div>

          <motion.div initial="hidden" animate="show" variants={scaleIn} className="relative">
            <div className="aspect-[4/5] w-full overflow-hidden rounded-3xl bg-white shadow-xl shadow-[#7C3AED]/10">
              <motion.img
                src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80"
                alt="Girls customization showcase"
                className="h-full w-full object-cover"
                initial={{ scale: 1.12 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
            <motion.div
              initial={{ opacity: 0, y: 16, x: -8 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              transition={{ duration: 0.7, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="absolute -bottom-6 -left-6 flex items-center gap-3 rounded-2xl bg-white px-5 py-4 shadow-lg"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#EDE9FE]">
                <Scissors className="h-4 w-4 text-[#7C3AED]" />
              </span>
              <div className="leading-tight">
                <p className="text-[13px] font-medium text-[#1F2937]">Custom Fit Available</p>
                <p className="text-[12px] text-[#1F2937]/60">For girls' wear</p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* shimmer line, matches navbar signature */}
        <div className="relative h-[2px] w-full overflow-hidden bg-white/40">
          <div className="absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-[#7C3AED] to-transparent animate-[shimmer_5s_ease-in-out_infinite]" />
        </div>
      </section>

      {/* ---------- Perks strip ---------- */}
      <section className="border-b border-[#EDE9FE]">
        <Reveal
          variants={staggerParent}
          className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-6 sm:flex-row sm:items-center sm:justify-center sm:gap-14 md:px-10"
        >
          {PERKS.map(({ icon: Icon, label }) => (
            <motion.div
              key={label}
              variants={fadeUp}
              className="flex items-center gap-2.5 text-[12px] uppercase tracking-[0.1em] text-[#1F2937]/70"
            >
              <Icon className="h-4 w-4 text-[#7C3AED]" strokeWidth={1.5} />
              {label}
            </motion.div>
          ))}
        </Reveal>
      </section>

      {/* ---------- Two categories: Ready-Made & Girls Customization ---------- */}
      <section className="mx-auto max-w-7xl px-6 py-20 md:px-10">
        <Reveal>
          <h2
            className="mb-10 text-[32px] text-[#1F2937]"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Shop the Way You Want
          </h2>
        </Reveal>

        <Reveal variants={staggerParent} className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {CATEGORIES.map((cat) => (
            <motion.a
              key={cat.name}
              href="#"
              variants={fadeUp}
              whileHover="hover"
              className="group relative aspect-[16/10] overflow-hidden rounded-3xl"
            >
              <motion.img
                src={cat.img}
                alt={cat.name}
                variants={{ hover: { scale: 1.1 } }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1F2937]/80 via-[#1F2937]/10 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-[20px] font-medium text-white" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  {cat.name}
                </span>
                <p className="mt-1 text-[13px] text-white/80">{cat.tagline}</p>
                <motion.span
                  variants={{ hover: { x: 4 } }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="mt-3 inline-flex items-center gap-1.5 text-[12px] uppercase tracking-[0.12em] text-white"
                >
                  Explore <ArrowRight className="h-3.5 w-3.5" />
                </motion.span>
              </div>
            </motion.a>
          ))}
        </Reveal>
      </section>

      {/* ---------- Featured products ---------- */}
      <section className="bg-[#EDE9FE]/40 py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <Reveal className="mb-10 flex items-end justify-between">
            <h2
              className="text-[32px] text-[#1F2937]"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Just Dropped
            </h2>
            <a href="#new" className="text-[12px] uppercase tracking-[0.14em] text-[#7C3AED] hover:underline">
              Shop All
            </a>
          </Reveal>

          <Reveal variants={staggerParent} className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {PRODUCTS.map((p) => (
              <motion.div key={p.name} variants={fadeUp} whileHover="hover" className="group">
                <div className="relative mb-4 aspect-[3/4] overflow-hidden rounded-2xl bg-white">
                  <motion.img
                    src={p.img}
                    alt={p.name}
                    variants={{ hover: { scale: 1.06 } }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="h-full w-full object-cover"
                  />
                  {p.tag && (
                    <span className="absolute left-3 top-3 rounded-full bg-white px-3 py-1 text-[10px] uppercase tracking-[0.1em] text-[#7C3AED]">
                      {p.tag}
                    </span>
                  )}
                  <motion.button
                    variants={{
                      hover: { opacity: 1, y: 0 },
                    }}
                    initial={{ opacity: 0, y: 12 }}
                    transition={{ duration: 0.3 }}
                    className="absolute bottom-3 left-3 right-3 rounded-full bg-[#7C3AED] py-2.5 text-[11px] uppercase tracking-[0.14em] text-white"
                  >
                    {p.tag === "Customizable" ? "Customize Now" : "Add to Bag"}
                  </motion.button>
                </div>
                <p className="text-[14px] font-medium text-[#1F2937]">{p.name}</p>
                <p className="text-[13px] text-[#1F2937]/60">{p.price}</p>
              </motion.div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ---------- Brand statement banner ---------- */}
      <section className="mx-auto max-w-7xl px-6 py-24 text-center md:px-10">
        <Reveal>
          <motion.div
            initial={{ opacity: 0, scale: 0.6, rotate: -8 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <Gem className="mx-auto mb-6 h-8 w-8 text-[#7C3AED]" strokeWidth={1.25} />
          </motion.div>
          <h2
            className="mx-auto max-w-2xl text-[30px] leading-snug text-[#1F2937] md:text-[38px]"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Ready-made for the everyday,
            custom-made for your girl's big day.
          </h2>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="mt-8 rounded-full border border-[#7C3AED] px-7 py-3 text-[13px] uppercase tracking-[0.14em] text-[#7C3AED] transition-colors hover:bg-[#7C3AED] hover:text-white"
          >
            Start Customizing
          </motion.button>
        </Reveal>
      </section>

      {/* ---------- Newsletter ---------- */}
      <section className="bg-[#1F2937] py-16">
        <Reveal className="mx-auto flex max-w-3xl flex-col items-center px-6 text-center md:px-10">
          <h3
            className="text-[26px] text-white"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Get 10% off your first order
          </h3>
          <p className="mt-2 text-[13px] text-white/60">
            Join our list for early access to new drops and custom offers.
          </p>
          <form className="mt-6 flex w-full max-w-md gap-3">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 rounded-full border border-white/20 bg-transparent px-5 py-3 text-[13px] text-white placeholder-white/40 outline-none focus:border-[#7C3AED] transition-colors"
            />
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              type="submit"
              className="shrink-0 rounded-full bg-[#7C3AED] px-6 py-3 text-[12px] uppercase tracking-[0.14em] text-white hover:bg-[#6D28D9]"
            >
              Subscribe
            </motion.button>
          </form>
        </Reveal>
      </section>
    </div>
  );
};

export default Home;