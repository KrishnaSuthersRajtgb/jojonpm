import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, Sparkles } from "lucide-react";

// Uses same fonts as Navbar/Home/Footer/Collection/About:
// <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600&family=Jost:wght@300;400;500&display=swap" rel="stylesheet">

const CONTACT_INFO = [
  {
    icon: MapPin,
    label: "Visit Us",
    lines: ["12 Boutique Lane", "Chennai, TN, India"],
  },
  {
    icon: Phone,
    label: "Call Us",
    lines: ["+91 12345 67890"],
  },
  {
    icon: Mail,
    label: "Email Us",
    lines: ["hello@jojoboutique.com"],
  },
  {
    icon: Clock,
    label: "Store Hours",
    lines: ["Mon – Sat: 10am – 8pm", "Sunday: 11am – 6pm"],
  },
];

const REASONS = [
  "General Inquiry",
  "Girls Customization Order",
  "Ready-Made Order Support",
  "Something Else",
];

const easeClassy = [0.16, 1, 0.3, 1];

const staggerParent = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easeClassy } },
};

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    reason: REASONS[0],
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Frontend only — wire this up to your backend/email service later
    setSubmitted(true);
  };

  const fieldClass = (field) =>
    `w-full rounded-xl border bg-white px-4 py-3 text-[14px] text-[#1F2937] outline-none transition-all duration-300 ${
      focusedField === field
        ? "border-[#7C3AED] shadow-[0_0_0_4px_rgba(124,58,237,0.1)]"
        : "border-[#EDE9FE] hover:border-[#7C3AED]/40"
    }`;

  return (
    <div className="overflow-hidden bg-white text-[#1F2937]" style={{ fontFamily: "'Jost', sans-serif" }}>
      {/* ---------- Page header ---------- */}
      <section className="relative overflow-hidden bg-[#EDE9FE]">
        {/* floating decorative accents */}
        <motion.span
          className="absolute left-[8%] top-10"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <Sparkles className="h-5 w-5 text-[#7C3AED]/30" />
        </motion.span>
        <motion.span
          className="absolute right-[12%] top-24"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
        >
          <Sparkles className="h-4 w-4 text-[#7C3AED]/25" />
        </motion.span>
        <motion.span
          className="absolute right-[25%] bottom-8"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2.4 }}
        >
          <Sparkles className="h-3.5 w-3.5 text-[#7C3AED]/20" />
        </motion.span>

        <motion.div
          initial="hidden"
          animate="show"
          variants={staggerParent}
          className="mx-auto max-w-7xl px-6 py-16 text-center md:px-10"
        >
          <motion.span
            variants={fadeUp}
            className="mb-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-[11px] uppercase tracking-[0.18em] text-[#7C3AED]"
          >
            Get in Touch
          </motion.span>
          <motion.h1
            variants={fadeUp}
            className="text-[38px] leading-tight text-[#1F2937] md:text-[48px]"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            We'd Love to Hear From You
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-3 max-w-md text-[14px] text-[#1F2937]/70"
          >
            Questions about an order, a custom fit, or just want to
            say hello — reach out any time.
          </motion.p>
        </motion.div>

        <div className="relative h-[2px] w-full overflow-hidden bg-white/40">
          <div className="absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-[#7C3AED] to-transparent animate-[shimmer_5s_ease-in-out_infinite]" />
        </div>
      </section>

      {/* ---------- Contact info cards ---------- */}
      <section className="mx-auto max-w-7xl px-6 py-16 md:px-10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerParent}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {CONTACT_INFO.map(({ icon: Icon, label, lines }) => (
            <motion.div
              key={label}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.4, ease: easeClassy }}
              className="group rounded-2xl border border-[#EDE9FE] p-7 transition-colors duration-300 hover:border-[#7C3AED]/40 hover:shadow-[0_20px_40px_-24px_rgba(124,58,237,0.25)]"
            >
              <motion.span
                whileHover={{ rotate: 8 }}
                transition={{ type: "spring", stiffness: 260, damping: 14 }}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-[#EDE9FE] transition-colors duration-500 group-hover:bg-[#7C3AED]"
              >
                <Icon
                  className="h-5 w-5 text-[#7C3AED] transition-colors duration-500 group-hover:text-white"
                  strokeWidth={1.5}
                />
              </motion.span>
              <h3
                className="mt-5 text-[18px] text-[#1F2937]"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                {label}
              </h3>
              <div className="mt-2 space-y-0.5">
                {lines.map((line) => (
                  <p key={line} className="text-[13px] leading-relaxed text-[#1F2937]/65">
                    {line}
                  </p>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ---------- Form + map ---------- */}
      <section className="bg-[#EDE9FE]/40 py-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 md:grid-cols-2 md:px-10">
          {/* Form */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerParent}
          >
            <motion.h2
              variants={fadeUp}
              className="text-[28px] text-[#1F2937]"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Send a Message
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-2 text-[14px] text-[#1F2937]/65">
              We typically reply within one business day.
            </motion.p>

            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: easeClassy }}
                  className="mt-8 flex items-start gap-3 rounded-2xl border border-[#7C3AED]/20 bg-white p-6"
                >
                  <motion.span
                    initial={{ scale: 0, rotate: -30 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.6, delay: 0.15, ease: easeClassy }}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#EDE9FE]"
                  >
                    <CheckCircle2 className="h-5 w-5 text-[#7C3AED]" strokeWidth={1.5} />
                  </motion.span>
                  <div>
                    <p className="text-[15px] font-medium text-[#1F2937]">
                      Message sent
                    </p>
                    <p className="mt-1 text-[13px] text-[#1F2937]/65">
                      Thanks, {form.name || "there"} — we've received your message
                      and will get back to you soon.
                    </p>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setForm({ name: "", email: "", reason: REASONS[0], message: "" });
                      }}
                      className="mt-4 text-[12px] uppercase tracking-[0.12em] text-[#7C3AED] hover:underline"
                    >
                      Send another message
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, transition: { duration: 0.2 } }}
                  onSubmit={handleSubmit}
                  className="mt-8 space-y-5"
                >
                  <motion.div variants={fadeUp} className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-[12px] uppercase tracking-[0.1em] text-[#1F2937]/60">
                        Your Name
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
                      <label className="mb-1.5 block text-[12px] uppercase tracking-[0.1em] text-[#1F2937]/60">
                        Email Address
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
                  </motion.div>

                  <motion.div variants={fadeUp}>
                    <label className="mb-1.5 block text-[12px] uppercase tracking-[0.1em] text-[#1F2937]/60">
                      Reason for Contact
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
                  </motion.div>

                  <motion.div variants={fadeUp}>
                    <label className="mb-1.5 block text-[12px] uppercase tracking-[0.1em] text-[#1F2937]/60">
                      Message
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={handleChange("message")}
                      onFocus={() => setFocusedField("message")}
                      onBlur={() => setFocusedField(null)}
                      placeholder="Tell us what you need — measurements, fabric preference, or just a question."
                      className={`resize-none ${fieldClass("message")}`}
                    />
                  </motion.div>

                  <motion.button
                    variants={fadeUp}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="group relative flex items-center gap-2 overflow-hidden rounded-full bg-[#7C3AED] px-7 py-3.5 text-[13px] uppercase tracking-[0.14em] text-white"
                  >
                    <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                    <span className="relative">Send Message</span>
                    <Send className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: easeClassy }}
            whileHover={{ y: -4 }}
            className="relative min-h-[320px] overflow-hidden rounded-3xl bg-white shadow-lg shadow-[#7C3AED]/10 transition-shadow duration-500 hover:shadow-2xl hover:shadow-[#7C3AED]/20 md:min-h-full"
          >
            <iframe
              title="JoJo Boutique location"
              src="https://www.google.com/maps?q=Chennai,Tamil%20Nadu,India&output=embed"
              className="h-full w-full min-h-[320px] border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;