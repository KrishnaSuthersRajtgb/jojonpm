import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Clock, ArrowUpRight, CheckCircle2 } from "lucide-react";

// Uses same fonts as Navbar/Home/Footer, plus Marcellus for ticket accents:
// <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600&family=Jost:wght@300;400;500&family=Marcellus&display=swap" rel="stylesheet">

const CONTACT_INDEX = [
  {
    icon: MapPin,
    label: "Visit",
    value: "JoJo Boutique, gobi,erode,tamilnadu",
  },
  {
    icon: Phone,
    label: "Call",
    value: "+91 95973 00773",
    href: "tel:+919597300773",
  },
  {
    icon: Mail,
    label: "Email",
    value: "hello@jojoboutique.com",
    href: "mailto:hello@jojoboutique.com",
  },
];

// Real weekly hours — drives both the printed hours line AND the live
// open/closed status below, so it can never say something the schedule
// doesn't actually support.
const HOURS = {
  weekday: { open: 10, close: 20 }, // Mon–Sat, 24hr clock
  sunday: { open: 11, close: 18 },
};

const REASONS = [
  "General Inquiry",
  "Girls Customization Order",
  "Ready-Made Order Support",
  "Something Else",
];

const easeClassy = [0.16, 1, 0.3, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeClassy } },
};

const staggerParent = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const getOpenStatus = () => {
  const now = new Date();
  const day = now.getDay(); // 0 = Sunday
  const hour = now.getHours() + now.getMinutes() / 60;
  const todays = day === 0 ? HOURS.sunday : HOURS.weekday;
  const isOpen = hour >= todays.open && hour < todays.close;
  const closeTime = todays.close > 12 ? `${todays.close - 12}pm` : `${todays.close}am`;
  const openTime = todays.open > 12 ? `${todays.open - 12}pm` : `${todays.open}am`;
  return { isOpen, openTime, closeTime };
};

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", reason: REASONS[0], message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const { isOpen, openTime, closeTime } = getOpenStatus();

  const handleChange = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    // Frontend only — wire this up to your backend/email service later
    setSubmitted(true);
  };

  const fieldClass = (field) =>
    `w-full border-b bg-transparent px-0.5 py-2.5 text-[14px] text-[#2C1810] placeholder-[#2C1810]/30 outline-none transition-colors duration-300 ${
      focusedField === field ? "border-[#8B6B2E]" : "border-[#2C1810]/15 hover:border-[#2C1810]/30"
    }`;

  return (
    <div className="overflow-hidden bg-[#F5EDE6] text-[#2C1810]" style={{ fontFamily: "'Jost', sans-serif" }}>
      {/* ---------- Split hero: photo panel + numbered contact index ---------- */}
      <section className="grid grid-cols-1 md:grid-cols-[1.1fr_1fr]">
        {/* Photo panel */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: easeClassy }}
          className="relative min-h-[280px] md:min-h-[640px]"
        >
          <img
            src="https://img.magnific.com/free-photo/happy-young-woman-uses-her-phone-posing-with-colorful-shopping-bags-studio_8353-5606.jpg?semt=ais_hybrid&w=740&q=80"
            alt="Inside JoJo Boutique"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2C1810]/50 via-transparent to-transparent" />

          {/* live status chip, anchored on the image */}
          <div className="absolute bottom-6 left-6 flex items-center gap-2.5 rounded-full bg-[#F5EDE6]/95 px-4 py-2 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              {isOpen && (
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#7A8B5C] opacity-60" />
              )}
              <span
                className={`relative inline-flex h-2 w-2 rounded-full ${
                  isOpen ? "bg-[#7A8B5C]" : "bg-[#B0413E]"
                }`}
              />
            </span>
            <span className="text-[11.5px] uppercase tracking-[0.1em] text-[#2C1810]">
              {isOpen ? `Open now · until ${closeTime}` : `Closed · opens ${openTime}`}
            </span>
          </div>
        </motion.div>

        {/* Numbered contact index */}
        <div className="flex flex-col justify-center px-6 py-16 md:px-14 md:py-0">
          <motion.div initial="hidden" animate="show" variants={staggerParent}>
            <motion.span
              variants={fadeUp}
              className="mb-4 inline-block text-[11px] uppercase tracking-[0.34em] text-[#8B6B2E]"
            >
              Get in Touch
            </motion.span>
            <motion.h1
              variants={fadeUp}
              className="text-[38px] leading-[1.08] text-[#2C1810] md:text-[46px]"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Let's talk about
              <br />
              your next order.
            </motion.h1>

            <motion.ul variants={staggerParent} className="mt-10 divide-y divide-[#2C1810]/10 border-t border-[#2C1810]/10">
              {CONTACT_INDEX.map(({ icon: Icon, label, value, href }, i) => (
                <motion.li key={label} variants={fadeUp} className="group flex items-start gap-5 py-5">
                  <span
                    className="mt-0.5 shrink-0 text-[12px] tabular-nums text-[#2C1810]/35"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    0{i + 1}
                  </span>
                  <Icon className="mt-0.5 h-4 w-4 shrink-0 text-[#8B6B2E]" strokeWidth={1.25} />
                  <div className="flex-1">
                    <p className="text-[10.5px] uppercase tracking-[0.16em] text-[#2C1810]/45">{label}</p>
                    {href ? (
                      <a href={href} className="mt-1 block text-[14.5px] text-[#2C1810] hover:text-[#8B6B2E]">
                        {value}
                      </a>
                    ) : (
                      <p className="mt-1 text-[14.5px] text-[#2C1810]">{value}</p>
                    )}
                  </div>
                </motion.li>
              ))}
              <motion.li variants={fadeUp} className="flex items-start gap-5 py-5">
                <span
                  className="mt-0.5 shrink-0 text-[12px] tabular-nums text-[#2C1810]/35"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  04
                </span>
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[#8B6B2E]" strokeWidth={1.25} />
                <div>
                  <p className="text-[10.5px] uppercase tracking-[0.16em] text-[#2C1810]/45">Store Hours</p>
                  <p className="mt-1 text-[14.5px] text-[#2C1810]">Mon – Sat: 10am – 8pm</p>
                  <p className="text-[14.5px] text-[#2C1810]">Sunday: 11am – 6pm</p>
                </div>
              </motion.li>
            </motion.ul>
          </motion.div>
        </div>
      </section>

      {/* ---------- Consultation ticket ---------- */}
      <section className="bg-[#5C2620] px-6 py-24 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8, ease: easeClassy }}
          className="mx-auto max-w-4xl"
        >
          <div className="mb-10 text-center">
            <span className="mb-3 inline-block text-[11px] uppercase tracking-[0.34em] text-[#D9AFAE]">
              Book a Consultation
            </span>
            <h2
              className="text-[30px] text-[#F5EDE6]"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Tell Us What You Have in Mind
            </h2>
          </div>

          {/* Ticket card: form stub + perforated tear line + branded counterfoil */}
          <div className="relative grid grid-cols-1 overflow-hidden rounded-2xl bg-[#F5EDE6] shadow-2xl shadow-black/30 md:grid-cols-[1fr_auto_240px]">
            {/* notches for the perforation illusion */}
            <div className="absolute left-[calc(100%-256px)] top-0 hidden h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#5C2620] md:block" />
            <div className="absolute left-[calc(100%-256px)] bottom-0 hidden h-5 w-5 -translate-x-1/2 translate-y-1/2 rounded-full bg-[#5C2620] md:block" />

            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-start justify-center gap-3 p-9 md:p-12"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#8B6B2E]/10">
                    <CheckCircle2 className="h-5 w-5 text-[#8B6B2E]" strokeWidth={1.5} />
                  </span>
                  <p className="text-[19px] text-[#2C1810]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                    Request received
                  </p>
                  <p className="text-[13.5px] leading-relaxed text-[#2C1810]/60">
                    Thanks, {form.name || "there"} — we've noted your request and
                    will reach out shortly to confirm details.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setForm({ name: "", email: "", reason: REASONS[0], message: "" });
                    }}
                    className="mt-2 text-[12px] uppercase tracking-[0.14em] text-[#8B6B2E] hover:underline"
                  >
                    Start another request
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-6 p-9 md:p-12"
                >
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-[10.5px] uppercase tracking-[0.14em] text-[#2C1810]/45">
                        Name
                      </label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={handleChange("name")}
                        onFocus={() => setFocusedField("name")}
                        onBlur={() => setFocusedField(null)}
                        placeholder="Ananya Sharma"
                        className={fieldClass("name")}
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-[10.5px] uppercase tracking-[0.14em] text-[#2C1810]/45">
                        Email
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={handleChange("email")}
                        onFocus={() => setFocusedField("email")}
                        onBlur={() => setFocusedField(null)}
                        placeholder="you@example.com"
                        className={fieldClass("email")}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-1 block text-[10.5px] uppercase tracking-[0.14em] text-[#2C1810]/45">
                      Service
                    </label>
                    <select
                      value={form.reason}
                      onChange={handleChange("reason")}
                      onFocus={() => setFocusedField("reason")}
                      onBlur={() => setFocusedField(null)}
                      className={fieldClass("reason")}
                    >
                      {REASONS.map((r) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="mb-1 block text-[10.5px] uppercase tracking-[0.14em] text-[#2C1810]/45">
                      Message
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={form.message}
                      onChange={handleChange("message")}
                      onFocus={() => setFocusedField("message")}
                      onBlur={() => setFocusedField(null)}
                      placeholder="Preferred date, or anything we should know"
                      className={`resize-none ${fieldClass("message")}`}
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="group flex items-center gap-2 rounded-full border border-[#5C4322] bg-gradient-to-b from-[#E8C377] via-[#C89B4A] to-[#8B6B2E] px-7 py-3 text-[12.5px] font-medium uppercase tracking-[0.14em] text-white shadow-md transition-all hover:from-[#F0D08E] hover:via-[#D6AC5E] hover:to-[#9A7936]"
                  >
                    Submit Request
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>

            {/* dashed tear line */}
            <div className="hidden border-l border-dashed border-[#2C1810]/20 md:block" />
            <div className="my-4 border-t border-dashed border-[#2C1810]/20 md:hidden" />

            {/* counterfoil / stub */}
            <div className="flex flex-col justify-between bg-[#EDE2D3] p-8">
              <div>
                <span
                  className="text-[18px] tracking-[0.06em] text-[#2C1810]"
                  style={{ fontFamily: "'Marcellus', serif" }}
                >
                  JOJO
                </span>
                <p className="mt-1 text-[9.5px] uppercase tracking-[0.28em] text-[#2C1810]/50">
                  Custom Order Slip
                </p>
              </div>
              <div className="mt-8 space-y-3 text-[12px] text-[#2C1810]/65">
                <p>No fee to submit</p>
                <p>Reply within one business day</p>
                <p>Chennai, Tamil Nadu</p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Contact;