import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Gem,
  Sparkles,
  Truck,
  RefreshCcw,
  ShieldCheck,
  Scissors,
  ShoppingBag,
  Ruler,
  Store,
  Users,
  TrendingUp,
  FileText,
  MapPin,
  Handshake,
  Rocket,
  CheckCircle2,
  Star,
  Quote,
} from "lucide-react";

// Uses same fonts as Navbar:
// <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600&family=Jost:wght@300;400;500&display=swap" rel="stylesheet">

// Four categories — ready-made, girls customization, and two premium sub-lines
// that give the "Shop the Way You Want" grid real range instead of two tiles.
const CATEGORIES = [
  {
    name: "Ready-Made",
    tagline: "Considered pieces, cut and finished — ready to wear today",
    img: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=700&q=80",
  },
  {
    name: "Girls Customization",
    tagline: "Fit, fabric, and finish, made to order for your little one",
    img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80",
  },
  {
    name: "Occasion Edit",
    tagline: "Festive and celebration wear, built for the moments that matter",
    img: "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=800&q=80",
  },
  {
    name: "Everyday Layers",
    tagline: "Soft separates and scarves for the days in between",
    img: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=800&q=80",
  },
];

// Expanded to 8 products with fabric/detail language and a clearer price ladder,
// so "Just Dropped" reads like a real edited collection rather than four samples.
const PRODUCTS = [
  {
    name: "Aria Wrap Dress",
    // price: "$128",
    detail: "Washed cotton-linen, off-shoulder frill",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxKYVvDcif8kk00YdCgM_tBeEYM5GRLIIfId0YKii19Q&s",
    tag: "Ready-Made",
  },
  {
    name: "Petal Party Frock",
    price: "$74",
    detail: "Girls' occasion set, made to measure",
    img: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=500&q=80",
    tag: "Customizable",
  },
  {
    name: "Nova Silk Scarf",
    price: "$56",
    detail: "Hand-rolled edge, mulberry silk",
    img: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=500&q=80",
    tag: "Ready-Made",
  },
  {
    name: "Blossom Girls Lehenga",
    price: "$98",
    detail: "Hand-block print, adjustable waist",
    img: "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=500&q=80",
    tag: "Customizable",
  },
  {
    name: "Linden Linen Set",
    price: "$142",
    detail: "Two-piece, breathable heavyweight linen",
    img: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=500&q=80",
    tag: "Ready-Made",
  },
  {
    name: "Marigold Anarkali (Girls)",
    price: "$89",
    detail: "Layered flare, festive gold trim",
    img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=500&q=80",
    tag: "Customizable",
  },
  {
    name: "Willow Midi Skirt",
    price: "$68",
    detail: "Bias-cut, hand-finished hem",
    img: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500&q=80",
    tag: "Ready-Made",
  },
  {
    name: "Sable Girls Co-ord",
    price: "$81",
    detail: "Matching top and shorts, sized to grow",
    img: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=500&q=80",
    tag: "Customizable",
  },
];

const PERKS = [
  { icon: Truck, label: "Free shipping over $75" },
  { icon: Scissors, label: "Custom fit for girls' wear" },
  { icon: ShieldCheck, label: "Secure checkout" },
  { icon: RefreshCcw, label: "Easy 14-day returns" },
];

// How the ordering process actually works — a real sequence, so numbered
// markers earn their place here.
const HOW_IT_WORKS = [
  {
    n: "01",
    icon: ShoppingBag,
    title: "Pick your path",
    copy: "Browse Ready-Made for pieces that ship today, or choose Girls Customization to build one from scratch.",
  },
  {
    n: "02",
    icon: Ruler,
    title: "Share the fit",
    copy: "For custom pieces, a short fitting conversation replaces the size chart — fabric, measurements, and finish, in your words.",
  },
  {
    n: "03",
    icon: Scissors,
    title: "We cut & stitch",
    copy: "Our tailors cut and finish the piece by hand to the fit you gave us. Track status from your account.",
  },
  {
    n: "04",
    icon: Truck,
    title: "Delivered to your door",
    copy: "Ready-made ships in 2–4 days. Custom pieces arrive in days, not weeks — with easy 14-day returns either way.",
  },
];

// Why partner, and the actual franchise process — also a real sequence.
const FRANCHISE_WHY = [
  {
    icon: Store,
    title: "Proven format",
    copy: "A tested ready-made + custom-fit model — real SKUs, a working fitting flow, real repeat customers.",
  },
  {
    icon: Scissors,
    title: "Tailoring know-how",
    copy: "We hand over the fitting process, measurement forms, and tailor network playbook, not just a logo.",
  },
  {
    icon: Users,
    title: "Local, run by you",
    copy: "You run the store and the customer relationship. We stay close on sourcing, quality, and training.",
  },
  {
    icon: TrendingUp,
    title: "Built to grow",
    copy: "Girls' customization keeps customers coming back for the next size, the next occasion, the next order.",
  },
];

const FRANCHISE_PROCESS = [
  {
    n: "01",
    icon: FileText,
    title: "Enquire",
    copy: "Submit the form below with your city, budget, and timeline.",
  },
  {
    n: "02",
    icon: MapPin,
    title: "Site & feasibility",
    copy: "We review your proposed location and local demand together, and align on investment range.",
  },
  {
    n: "03",
    icon: Handshake,
    title: "Agreement & training",
    copy: "Sign the franchise agreement, then your team trains on fitting, measurement forms, and store operations.",
  },
  {
    n: "04",
    icon: Rocket,
    title: "Setup & launch",
    copy: "Store fit-out, initial inventory, and systems go live — with our team on call through opening week.",
  },
];

// Customer reviews — a mix of ready-made and custom-fit experiences, so the
// section backs up both halves of the business, not just one.
const REVIEWS = [
  {
    name: "Divya R.",
    location: "Coimbatore",
    rating: 5,
    quote:
      "The customization team got my daughter's lehenga fit exactly right on the first try. No back-and-forth, no guesswork.",
  },
  {
    name: "Meera K.",
    location: "Chennai",
    rating: 5,
    quote:
      "Ordered the Aria Wrap Dress ready-made and it arrived in three days, exactly as pictured. The fabric feels genuinely premium.",
  },
  {
    name: "Priya S.",
    location: "Erode",
    rating: 4,
    quote:
      "Loved how easy the fitting conversation was — sent measurements over chat and the frock still fits perfectly six months later.",
  },
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

// Reusable numbered-step row used by both How It Works and the Franchise process.
// Both call sites now sit on the beige zone, so this is styled for a light background.
const StepGrid = ({ steps }) => (
  <Reveal variants={staggerParent} className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
    {steps.map(({ n, icon: Icon, title, copy }, i) => (
      <motion.div key={n} variants={fadeUp} className="relative">
        <div className="mb-5 flex items-center gap-4">
          <span
            className="text-[15px] text-[#7B2434]/60"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            {n}
          </span>
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#D9AFAE]/25">
            <Icon className="h-4 w-4 text-[#7B2434]" strokeWidth={1.5} />
          </span>
        </div>
        <h3
          className="mb-2 text-[18px] text-[#2B1210]"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          {title}
        </h3>
        <p className="text-[13px] leading-relaxed text-[#2B1210]/60">{copy}</p>
        {i < steps.length - 1 && (
          <div className="pointer-events-none absolute right-[-20px] top-[38px] hidden h-px w-10 bg-[#7B2434]/20 lg:block" />
        )}
      </motion.div>
    ))}
  </Reveal>
);

// Franchise form now lives on the beige zone — inputs restyled for a light background
const inputClass =
  "w-full rounded-xl border border-[#2B1210]/15 bg-white px-4 py-3 text-[13px] text-[#2B1210] placeholder-[#2B1210]/35 outline-none transition-colors focus:border-[#7B2434]";

// Frontend-only franchise enquiry form — holds its own state, no network call.
// Wire the handleSubmit body up to your backend endpoint when it's ready.
const FranchiseForm = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    investment: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-3xl bg-white px-8 py-14 text-center ring-1 ring-[#D9AFAE]/40">
        <CheckCircle2 className="h-8 w-8 text-[#7B2434]" strokeWidth={1.5} />
        <h3
          className="text-[22px] text-[#2B1210]"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Application received
        </h3>
        <p className="max-w-sm text-[13px] text-[#2B1210]/65">
          Our partnerships team will reach out within 3–5 business days to
          talk through next steps.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <input
        required
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Full name"
        className={inputClass}
      />
      <input
        required
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email address"
        className={inputClass}
      />
      <input
        required
        name="phone"
        value={form.phone}
        onChange={handleChange}
        placeholder="Phone number"
        className={inputClass}
      />
      <input
        required
        name="city"
        value={form.city}
        onChange={handleChange}
        placeholder="City you'd like to open in"
        className={inputClass}
      />
      <select
        required
        name="investment"
        value={form.investment}
        onChange={handleChange}
        className={`${inputClass} sm:col-span-2 text-[#2B1210]/90`}
      >
        <option value="" disabled className="text-black">
          Investment range you're considering
        </option>
        <option className="text-black" value="under-15L">Under ₹15L</option>
        <option className="text-black" value="15-30L">₹15L – ₹30L</option>
        <option className="text-black" value="30-50L">₹30L – ₹50L</option>
        <option className="text-black" value="50L-plus">₹50L+</option>
      </select>
      <textarea
        name="message"
        value={form.message}
        onChange={handleChange}
        placeholder="Tell us about your retail or business background (optional)"
        rows={4}
        className={`${inputClass} sm:col-span-2 resize-none`}
      />

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        className="sm:col-span-2 mt-2 flex items-center justify-center gap-2 rounded-full border border-[#5C4322] bg-gradient-to-b from-[#E8C377] via-[#C89B4A] to-[#8B6B2E] px-7 py-3.5 text-[13px] font-medium uppercase tracking-[0.14em] text-white shadow-md transition-all hover:from-[#F0D08E] hover:via-[#D6AC5E] hover:to-[#9A7936]"
      >
        Submit Application
        <ArrowRight className="h-4 w-4" />
      </motion.button>
    </form>
  );
};

const Home = () => {
  return (
    <div className="bg-[#6B2C28] text-[#F5EDE6]" style={{ fontFamily: "'Jost', sans-serif" }}>
      {/* ---------- Hero — #6B2C28 ---------- */}
      <section className="relative overflow-hidden bg-[#6B2C28] border-b border-white/10">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 py-20 md:grid-cols-2 md:px-10 md:py-28">
          <div>
            <motion.span
              custom={0}
              initial="hidden"
              animate="show"
              variants={heroText}
              className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#D9AFAE] px-4 py-1.5 text-[11px] uppercase tracking-[0.18em] text-[#7B2434]"
            >
              <Sparkles className="h-3.5 w-3.5" />
              Ready-Made & Custom Girls Wear
            </motion.span>

            <motion.h1
              custom={1}
              initial="hidden"
              animate="show"
              variants={heroText}
              className="text-[44px] leading-[1.1] text-[#F5EDE6] md:text-[60px]"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Wear what
              <br />
              feels like <span className="text-[#D9AFAE]">you.</span>
            </motion.h1>

            <motion.p
              custom={2}
              initial="hidden"
              animate="show"
              variants={heroText}
              className="mt-6 max-w-md text-[15px] leading-relaxed text-[#F5EDE6]/75"
            >
              Shop our ready-made collection, or customize a piece for your girl
              — fit, fabric, and finish, made to order and delivered in days,
              not weeks.
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
                className="group flex items-center gap-2 rounded-full border border-[#5C4322] bg-gradient-to-b from-[#E8C377] via-[#C89B4A] to-[#8B6B2E] px-7 py-3.5 text-[13px] font-medium uppercase tracking-[0.14em] text-white shadow-md transition-all hover:from-[#F0D08E] hover:via-[#D6AC5E] hover:to-[#9A7936]"
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
                className="text-[13px] uppercase tracking-[0.14em] text-[#F5EDE6] underline decoration-[#D9AFAE]/50 underline-offset-4 hover:decoration-[#D9AFAE]"
              >
                Customize for Girls
              </motion.button>
            </motion.div>
          </div>

          <motion.div initial="hidden" animate="show" variants={scaleIn} className="relative">
            <div className="aspect-[4/5] w-full overflow-hidden rounded-3xl bg-[#4A1E1B] shadow-xl shadow-black/40 ring-1 ring-white/10">
              <motion.img
                src="https://i.pinimg.com/736x/e9/97/b6/e997b631d300fde1c0ac0e34cbaab57d.jpg"
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
              className="absolute -bottom-6 -left-6 flex items-center gap-3 rounded-2xl bg-white px-5 py-4 shadow-lg ring-1 ring-black/5"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#D9AFAE]/30">
                <Scissors className="h-4 w-4 text-[#7B2434]" />
              </span>
              <div className="leading-tight">
                <p className="text-[13px] font-medium text-[#111111]">Custom Fit Available</p>
                <p className="text-[12px] text-[#111111]/60">For girls' wear</p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* shimmer line, matches navbar signature */}
        <div className="relative h-[2px] w-full overflow-hidden bg-white/10">
          <div className="absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-[#D9AFAE] to-transparent animate-[shimmer_5s_ease-in-out_infinite]" />
        </div>
      </section>

      {/* ---------- Perks strip — beige ---------- */}
      <section className="border-b border-[#D9AFAE]/25 bg-[#dccad7]">
        <Reveal
          variants={staggerParent}
          className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-6 sm:flex-row sm:items-center sm:justify-center sm:gap-14 md:px-10"
        >
          {PERKS.map(({ icon: Icon, label }) => (
            <motion.div
              key={label}
              variants={fadeUp}
              className="flex items-center gap-2.5 text-[12px] uppercase tracking-[0.1em] text-[#2B1210]/75"
            >
              <Icon className="h-4 w-4 text-[#7B2434]" strokeWidth={1.5} />
              {label}
            </motion.div>
          ))}
        </Reveal>
      </section>

      {/* ---------- Categories — #6B2C28 ---------- */}
      <section className="bg-[#6B2C28] px-6 py-20 md:px-10">
        <Reveal className="mx-auto max-w-7xl">
          <h2
            className="mb-2 text-[32px] text-[#F5EDE6]"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Shop the Way You Want
          </h2>
          <p className="mb-10 max-w-xl text-[14px] text-[#F5EDE6]/65">
            Pick a piece off the rack, or start from a blank fitting sheet
            and build one with us.
          </p>
        </Reveal>

        <Reveal variants={staggerParent} className="mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-2">
          {CATEGORIES.map((cat) => (
            <motion.a
              key={cat.name}
              href="#"
              variants={fadeUp}
              whileHover="hover"
              className="group relative aspect-[16/10] overflow-hidden rounded-3xl ring-1 ring-white/10"
            >
              <motion.img
                src={cat.img}
                alt={cat.name}
                variants={{ hover: { scale: 1.1 } }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-[20px] font-medium text-white" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  {cat.name}
                </span>
                <p className="mt-1 text-[13px] text-white/80">{cat.tagline}</p>
                <motion.span
                  variants={{ hover: { x: 4 } }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="mt-3 inline-flex items-center gap-1.5 text-[12px] uppercase tracking-[0.12em] text-[#D9AFAE]"
                >
                  Explore <ArrowRight className="h-3.5 w-3.5" />
                </motion.span>
              </div>
            </motion.a>
          ))}
        </Reveal>
      </section>

      {/* ---------- How It Works — beige ---------- */}
      <section className="bg-[#F5EDE6] px-6 py-20 md:px-10">
        <Reveal className="mx-auto max-w-7xl">
          <h2
            className="mb-2 text-[32px] text-[#2B1210]"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            How It Works
          </h2>
          <p className="mb-12 max-w-xl text-[14px] text-[#2B1210]/65">
            Same order, two ways to arrive at it — off the rack, or built
            from a fitting sheet.
          </p>
        </Reveal>
        <div className="mx-auto max-w-7xl">
          <StepGrid steps={HOW_IT_WORKS} />
        </div>
      </section>

      {/* ---------- Featured products — #6B2C28 ---------- */}
      <section className="bg-[#6B2C28] py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <Reveal className="mb-10 flex items-end justify-between">
            <div>
              <h2
                className="text-[32px] text-[#F5EDE6]"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Just Dropped
              </h2>
              <p className="mt-2 text-[13px] text-[#F5EDE6]/60">
                Eight new pieces across ready-made and made-to-order.
              </p>
            </div>
            <a href="#new" className="text-[12px] uppercase tracking-[0.14em] text-[#D9AFAE] hover:underline">
              Shop All
            </a>
          </Reveal>

          <Reveal variants={staggerParent} className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {PRODUCTS.map((p) => (
              <motion.div key={p.name} variants={fadeUp} whileHover="hover" className="group">
                <div className="relative mb-4 aspect-[3/4] overflow-hidden rounded-2xl bg-white ring-1 ring-white/10">
                  <motion.img
                    src={p.img}
                    alt={p.name}
                    variants={{ hover: { scale: 1.06 } }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="h-full w-full object-cover"
                  />
                  {p.tag && (
                    <span className="absolute left-3 top-3 rounded-full bg-white px-3 py-1 text-[10px] uppercase tracking-[0.1em] text-[#7B2434] ring-1 ring-black/10">
                      {p.tag}
                    </span>
                  )}
                  <motion.button
                    variants={{
                      hover: { opacity: 1, y: 0 },
                    }}
                    initial={{ opacity: 0, y: 12 }}
                    transition={{ duration: 0.3 }}
                    className="absolute bottom-3 left-3 right-3 rounded-full border border-[#5C4322] bg-gradient-to-b from-[#E8C377] via-[#C89B4A] to-[#8B6B2E] py-2.5 text-[11px] font-medium uppercase tracking-[0.14em] text-white shadow-md transition-all hover:from-[#F0D08E] hover:via-[#D6AC5E] hover:to-[#9A7936]"
                  >
                    {p.tag === "Customizable" ? "Customize Now" : "Add to Bag"}
                  </motion.button>
                </div>
                <p className="text-[14px] font-medium text-[#F5EDE6]">{p.name}</p>
                <p className="text-[12px] text-[#F5EDE6]/50">{p.detail}</p>
                <p className="mt-0.5 text-[13px] text-[#F5EDE6]/65">{p.price}</p>
              </motion.div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ---------- Reviews — beige (new section) ---------- */}
      <section className="bg-[#F5EDE6] px-6 py-24 md:px-10">
        <Reveal className="mx-auto mb-14 max-w-xl text-center">
          <span className="text-[11px] uppercase tracking-[0.2em] text-[#7B2434]/70">
            Customer Love
          </span>
          <h2
            className="mt-3 text-[32px] text-[#2B1210] md:text-[38px]"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Real Fittings, Real Reviews
          </h2>
          <div className="mt-4 flex items-center justify-center gap-2">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < 5 ? "fill-[#D9AFAE] text-[#D9AFAE]" : "fill-transparent text-[#D9AFAE]/40"
                  }`}
                />
              ))}
            </div>
            <span className="text-[13px] text-[#2B1210]/60">4.8 · 1,200+ reviews</span>
          </div>
        </Reveal>

        <Reveal
          variants={staggerParent}
          className="mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-3"
        >
          {REVIEWS.map(({ name, location, rating, quote }) => (
            <motion.div
              key={name}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative rounded-2xl border border-[#D9AFAE]/40 bg-white p-8 transition-colors duration-300 hover:border-[#7B2434]/40 hover:shadow-[0_20px_40px_-24px_rgba(107,44,40,0.25)]"
            >
              <Quote className="h-6 w-6 text-[#D9AFAE]" strokeWidth={1.5} />
              <div className="mt-4 flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3.5 w-3.5 ${
                      i < rating ? "fill-[#7B2434] text-[#7B2434]" : "fill-transparent text-[#7B2434]/25"
                    }`}
                  />
                ))}
              </div>
              <p className="mt-4 text-[14px] leading-relaxed text-[#2B1210]/75">
                "{quote}"
              </p>
              <div className="mt-6 flex items-center gap-3">
                <span
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-[#D9AFAE]/25 text-[13px] text-[#7B2434]"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {name.charAt(0)}
                </span>
                <div className="leading-tight">
                  <p className="text-[13px] font-medium text-[#2B1210]">{name}</p>
                  <p className="text-[12px] text-[#2B1210]/50">{location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </Reveal>
      </section>

      {/* ---------- Brand statement banner — #6B2C28 ---------- */}
      <section className="bg-[#6B2C28] px-6 py-24 text-center md:px-10">
        <Reveal className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.6, rotate: -8 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <Gem className="mx-auto mb-6 h-8 w-8 text-[#D9AFAE]" strokeWidth={1.25} />
          </motion.div>
          <h2
            className="mx-auto max-w-2xl text-[30px] leading-snug text-[#F5EDE6] md:text-[38px]"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Ready-made for the everyday,
            custom-made for your girl's big day.
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-[14px] text-[#F5EDE6]/65">
            Every custom order starts with a short fitting conversation, not a
            size chart — so the finish actually matches the child.
          </p>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="mt-8 rounded-full border border-[#5C4322] bg-gradient-to-b from-[#E8C377] via-[#C89B4A] to-[#8B6B2E] px-7 py-3 text-[13px] font-medium uppercase tracking-[0.14em] text-white shadow-md transition-all hover:from-[#F0D08E] hover:via-[#D6AC5E] hover:to-[#9A7936]"
          >
            Start Customizing
          </motion.button>
        </Reveal>
      </section>

      {/* ---------- Open a Franchise — beige ---------- */}
      <section id="franchise" className="bg-[#F5EDE6] py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <Reveal className="mb-4 text-center">
            <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#D9AFAE] px-4 py-1.5 text-[11px] uppercase tracking-[0.18em] text-[#7B2434]">
              Partner With Us
            </span>
            <h2
              className="mx-auto max-w-2xl text-[32px] text-[#2B1210] md:text-[38px]"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Open a Franchise
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-[14px] text-[#2B1210]/65">
              Bring the ready-made + custom-fit model to your city — our
              tailoring playbook, your storefront.
            </p>
          </Reveal>

          {/* why partner */}
          <Reveal
            variants={staggerParent}
            className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
          >
            {FRANCHISE_WHY.map(({ icon: Icon, title, copy }) => (
              <motion.div key={title} variants={fadeUp}>
                <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#D9AFAE]/25">
                  <Icon className="h-4 w-4 text-[#7B2434]" strokeWidth={1.5} />
                </span>
                <h3
                  className="mb-2 text-[17px] text-[#2B1210]"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {title}
                </h3>
                <p className="text-[13px] leading-relaxed text-[#2B1210]/60">{copy}</p>
              </motion.div>
            ))}
          </Reveal>

          {/* the process */}
          <div className="mt-20">
            <Reveal>
              <h3
                className="mb-2 text-[24px] text-[#2B1210]"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                How Franchising Works
              </h3>
              <p className="mb-12 max-w-xl text-[14px] text-[#2B1210]/65">
                From first enquiry to opening day, in four steps.
              </p>
            </Reveal>
            <StepGrid steps={FRANCHISE_PROCESS} />
          </div>

          {/* application form */}
          <div className="mx-auto mt-20 max-w-3xl">
            <Reveal className="mb-10 text-center">
              <h3
                className="text-[24px] text-[#2B1210]"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Start Your Application
              </h3>
              <p className="mt-3 text-[14px] text-[#2B1210]/65">
                Tell us a bit about you and where you'd like to open. No
                commitment yet — this starts the conversation.
              </p>
            </Reveal>
            <Reveal>
              <FranchiseForm />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- Newsletter — #6B2C28 ---------- */}
      <section className="bg-[#6B2C28] py-16">
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
              className="flex-1 rounded-full border border-white/20 bg-transparent px-5 py-3 text-[13px] text-white placeholder-white/40 outline-none focus:border-[#D9AFAE] transition-colors"
            />
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              type="submit"
              className="shrink-0 rounded-full border border-[#5C4322] bg-gradient-to-b from-[#E8C377] via-[#C89B4A] to-[#8B6B2E] px-6 py-3 text-[12px] font-medium uppercase tracking-[0.14em] text-white shadow-md transition-all hover:from-[#F0D08E] hover:via-[#D6AC5E] hover:to-[#9A7936]"
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