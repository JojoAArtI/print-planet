'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useInView, useMotionValue, useSpring } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, X } from 'lucide-react';
import Link from 'next/link';
import { ContactCanvas } from './ContactCanvas';

gsap.registerPlugin(ScrollTrigger);

const EASE = [0.22, 1, 0.36, 1] as const;

const SOCIALS = [
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/printplanet',
    svg: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/printplanet',
    svg: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
];

/* ── Magnetic CTA button ──────────────────────────────────────────────────── */
function MagneticCTA({
  label,
  onClick,
  variant = 'outline',
}: {
  label: string;
  onClick: () => void;
  variant?: 'outline' | 'solid';
}) {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 280, damping: 26 });
  const y = useSpring(rawY, { stiffness: 280, damping: 26 });

  const solid = variant === 'solid';

  return (
    <motion.button
      data-cursor="hire"
      style={{ x, y }}
      onClick={onClick}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        rawX.set((e.clientX - r.left - r.width / 2) * 0.3);
        rawY.set((e.clientY - r.top - r.height / 2) * 0.3);
      }}
      onMouseLeave={() => { rawX.set(0); rawY.set(0); }}
      className={
        solid
          ? 'group inline-flex items-center gap-3 bg-blue-600 text-white px-8 py-4 hover:bg-blue-700 transition-colors duration-300 cursor-pointer shadow-md shadow-blue-500/10'
          : 'group inline-flex items-center gap-3 border border-white/20 px-8 py-4 text-white/60 hover:text-white hover:border-white/50 transition-colors duration-300 cursor-pointer'
      }
      whileHover={!solid ? { backgroundColor: 'rgba(255,255,255,0.04)' } : undefined}
    >
      <span
        className="text-[0.65rem] tracking-[0.22em] uppercase font-medium"
        style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}
      >
        {label}
      </span>
      <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
    </motion.button>
  );
}

/* ── Validation ───────────────────────────────────────────────────────────── */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type FormState = { name: string; email: string; message: string };
type FieldErrors = Record<keyof FormState, string>;

function getErrors(f: FormState): FieldErrors {
  return {
    name: f.name.trim().length < 2 ? 'Please enter your name.' : '',
    email: !EMAIL_RE.test(f.email.trim()) ? 'Enter a valid email address.' : '',
    message: f.message.trim().length < 10 ? 'A little more detail helps (10+ characters).' : '',
  };
}

/* ── Contact modal ────────────────────────────────────────────────────────── */
function ContactModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    message: '',
  });
  const [touched, setTouched] = useState({ name: false, email: false, message: false });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const errors = getErrors(form);
  const isValid = !errors.name && !errors.email && !errors.message;

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValid) {
      setTouched({ name: true, email: true, message: true });
      return;
    }
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      setStatus(res.ok ? 'sent' : 'error');
    } catch {
      setStatus('error');
    }
  };

  const fieldClass = (hasError: boolean) =>
    `w-full bg-transparent border ${hasError ? 'border-red-400/50 focus:border-red-400/70' : 'border-white/12 focus:border-white/40'} text-white placeholder:text-white/18 px-5 py-3.5 text-sm focus:outline-none transition-colors duration-200`;

  const errorClass =
    'text-[0.58rem] tracking-[0.04em] text-red-400/70 mt-1.5 block';

  return (
    <motion.div
      className="fixed inset-0 z-100 flex items-end sm:items-center justify-center p-0 sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* Panel */}
      <motion.div
        data-theme="dark"
        className="relative w-full sm:max-w-xl bg-[#0d0d0d] border border-white/10 overflow-hidden"
        initial={{ y: '100%', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: '100%', opacity: 0 }}
        transition={{ duration: 0.55, ease: EASE }}
      >
        {/* Corner accents */}
        <div className="absolute top-0 right-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-px h-12 bg-white/20" />
          <div className="absolute top-0 right-0 w-12 h-px bg-white/20" />
        </div>
        <div className="absolute bottom-0 left-0 pointer-events-none">
          <div className="absolute bottom-0 left-0 w-px h-12 bg-white/10" />
          <div className="absolute bottom-0 left-0 w-12 h-px bg-white/10" />
        </div>

        <div className="p-8 sm:p-10">
          {/* Header */}
          <div className="flex items-start justify-between mb-8">
            <div>
              <span
                className="text-[0.55rem] tracking-[0.28em] uppercase text-white/25 font-medium block mb-2"
                style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}
              >
                Get in Touch
              </span>
              <h2
                className="font-black text-white tracking-[-0.035em] leading-tight"
                style={{
                  fontFamily: 'Satoshi, system-ui, sans-serif',
                  fontWeight: 900,
                  fontSize: 'clamp(1.6rem, 4vw, 2.2rem)',
                }}
              >
                Start a{' '}
                <span
                  style={{
                    fontFamily: 'var(--font-instrument), Georgia, serif',
                    fontStyle: 'italic',
                    fontWeight: 400,
                    color: 'rgba(255,255,255,0.32)',
                  }}
                >
                  conversation
                </span>
              </h2>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 border border-white/12 flex items-center justify-center text-white/30 hover:text-white hover:border-white/35 transition-colors duration-200 shrink-0 mt-1 cursor-pointer"
            >
              <X size={14} />
            </button>
          </div>

          <AnimatePresence mode="wait">
            {status === 'sent' ? (
              <motion.div
                key="sent"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="py-12 text-center"
              >
                <div className="w-12 h-px bg-white/20 mx-auto mb-8" />
                <p
                  className="text-white/55 leading-relaxed mb-2"
                  style={{
                    fontFamily: 'var(--font-instrument), Georgia, serif',
                    fontStyle: 'italic',
                    fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
                  }}
                >
                  Quote request received.
                </p>
                <p
                  className="text-white/30 text-sm"
                  style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}
                >
                  Our print specialists will be in touch within 24 hours.
                </p>
                <button
                  onClick={onClose}
                  className="mt-8 text-[0.6rem] tracking-[0.2em] uppercase text-white/25 hover:text-white/60 transition-colors cursor-pointer"
                  style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}
                >
                  Close
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                className="space-y-4"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      className="block text-[0.58rem] tracking-[0.18em] uppercase text-white/28 mb-2 font-medium"
                      style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                      onBlur={() => setTouched((p) => ({ ...p, name: true }))}
                      className={fieldClass(touched.name && !!errors.name)}
                      style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}
                      placeholder="Your name"
                      aria-invalid={touched.name && !!errors.name}
                    />
                    {touched.name && errors.name && (
                      <span className={errorClass} style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}>{errors.name}</span>
                    )}
                  </div>
                  <div>
                    <label
                      className="block text-[0.58rem] tracking-[0.18em] uppercase text-white/28 mb-2 font-medium"
                      style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                      onBlur={() => setTouched((p) => ({ ...p, email: true }))}
                      className={fieldClass(touched.email && !!errors.email)}
                      style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}
                      placeholder="your@email.com"
                      aria-invalid={touched.email && !!errors.email}
                    />
                    {touched.email && errors.email && (
                      <span className={errorClass} style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}>{errors.email}</span>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    className="block text-[0.58rem] tracking-[0.18em] uppercase text-white/28 mb-2 font-medium"
                    style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}
                  >
                    Message Details
                  </label>
                  <textarea
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                    onBlur={() => setTouched((p) => ({ ...p, message: true }))}
                    className={`${fieldClass(touched.message && !!errors.message)} resize-none`}
                    style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}
                    placeholder="Describe your custom print project (quantities, sizes, product categories, or deadline)..."
                    aria-invalid={touched.message && !!errors.message}
                  />
                  {touched.message && errors.message && (
                    <span className={errorClass} style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}>{errors.message}</span>
                  )}
                </div>

                {status === 'error' && (
                  <p
                    className="text-[0.6rem] tracking-[0.12em] text-red-400/70 font-medium"
                    style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}
                  >
                    Something went wrong — please try again or email directly.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === 'sending' || !isValid}
                  className="w-full bg-white text-black py-4 text-[0.62rem] tracking-[0.22em] uppercase font-semibold hover:bg-white/88 transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed mt-2 cursor-pointer"
                  style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}
                >
                  {status === 'sending' ? 'Sending...' : 'Send Quote Request'}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Main section ─────────────────────────────────────────────────────────── */
export function Contact() {
  const sectionRef   = useRef<HTMLElement>(null);
  const sectionInView = useInView(sectionRef, { once: true, margin: '-12%' });
  const [modal, setModal] = useState<null | 'message'>(null);

  useEffect(() => {
    const handler = () => {
      setModal('message');
    };
    window.addEventListener('open-contact-modal', handler);
    return () => window.removeEventListener('open-contact-modal', handler);
  }, []);

  const openWhatsApp = () => {
    window.open('https://wa.me/918292349048?text=Hello%20Print%20Planet,%20I%20would%20like%20to%20request%20a%20custom%20printing%20quote.', '_blank');
  };

  return (
    <>
      <section
        ref={sectionRef}
        id="contact"
        data-theme="dark"
        className="w-full bg-zinc-950 border-t border-blue-500/10 relative overflow-hidden"
      >
        {/* Constellation background */}
        <div className="absolute inset-0 pointer-events-none z-0" aria-hidden>
          <ContactCanvas />
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto px-[clamp(1.25rem,5vw,5rem)] pt-[clamp(5rem,10vw,11rem)] pb-0">

          {/* Section label */}
          <div className="flex items-center gap-4 mb-[clamp(3rem,6vw,8rem)]">
            <motion.span
              className="text-[0.6rem] tracking-[0.22em] uppercase text-white/20 font-medium shrink-0"
              style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}
              initial={{ opacity: 0, x: -16 }}
              animate={sectionInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, ease: EASE }}
            >
              09 / Contact
            </motion.span>
            <motion.div
              className="flex-1 h-px bg-white/10"
              initial={{ scaleX: 0, transformOrigin: 'left' }}
              animate={sectionInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.4, delay: 0.15, ease: EASE }}
            />
          </div>

          {/* Giant email CTA */}
          <div className="mb-[clamp(3rem,6vw,8rem)]">
            <motion.p
              className="text-white/30 mb-5"
              style={{
                fontFamily: 'var(--font-instrument), Georgia, serif',
                fontStyle: 'italic',
                fontSize: 'clamp(1rem, 2vw, 1.6rem)',
              }}
              initial={{ opacity: 0, y: 12 }}
              animate={sectionInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
            >
              Have a custom printing project in mind?
            </motion.p>

            <div className="overflow-hidden mb-8">
              <a
                href="mailto:onezero1solutions@gmail.com"
                className="block font-black text-zinc-50 tracking-[-0.04em] leading-[0.88] hover:text-blue-400 transition-colors duration-300 will-change-transform"
                style={{
                  fontFamily: 'Satoshi, system-ui, sans-serif',
                  fontWeight: 800,
                  fontSize: 'clamp(1.8rem, 5.5vw, 7rem)',
                  wordBreak: 'break-all',
                }}
              >
                onezero1solutions@gmail.com
              </a>
            </div>

            <motion.div
              className="flex flex-wrap items-center gap-4"
              initial={{ opacity: 0, y: 10 }}
              animate={sectionInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5, ease: EASE }}
            >
              <MagneticCTA label="WhatsApp Chat" variant="solid" onClick={openWhatsApp} />
              <MagneticCTA label="Request Quote" onClick={() => setModal('message')} />
              <a
                href="mailto:onezero1solutions@gmail.com"
                className="text-[0.62rem] tracking-[0.18em] uppercase text-white/28 hover:text-white/60 transition-colors duration-200 font-medium"
                style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}
              >
                or email directly →
              </a>
            </motion.div>
          </div>

          {/* Info strip */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-3 gap-0 border-t border-white/8 mb-0"
            initial={{ opacity: 0 }}
            animate={sectionInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.55, ease: EASE }}
          >
            {[
              { label: 'Location', value: 'Faridabad, Haryana · India' },
              { label: 'Response', value: 'Within 2 hours (WhatsApp)' },
              { label: 'Status', value: 'Accepting bulk orders', pulse: true },
            ].map((item, i) => (
              <div
                key={item.label}
                className={`py-8 pr-8 ${i > 0 ? 'sm:border-l sm:border-white/8 sm:pl-8 sm:pr-0' : ''}`}
              >
                <p
                  className="text-[0.55rem] tracking-[0.22em] uppercase text-white/22 font-medium mb-2"
                  style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}
                >
                  {item.label}
                </p>
                <div className="flex items-center gap-2">
                  {item.pulse && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />}
                  <p
                    className="text-white/55 font-medium"
                    style={{
                      fontFamily: 'Satoshi, system-ui, sans-serif',
                      fontSize: 'clamp(0.85rem, 1.3vw, 1rem)',
                    }}
                  >
                    {item.value}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── Footer ──────────────────────────────────────────────────────── */}
        <footer className="border-t border-white/6 mt-0 relative z-10 overflow-hidden bg-zinc-950/80">
          <div className="relative z-10 max-w-[1440px] mx-auto px-[clamp(1.25rem,5vw,5rem)] pt-16 pb-8">
            
            {/* 4-Column Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 text-left">
              
              {/* Column 1: Brand Info */}
              <div className="space-y-4">
                <span className="text-white font-extrabold text-xl tracking-tight block">
                  PRINT <span className="text-blue-500 font-light">PLANET</span>
                </span>
                <p className="text-white/40 text-xs leading-relaxed max-w-xs">
                  Your premier printing destination. We turn your creative visions and memories into high-resolution, long-lasting custom merchandise.
                </p>
                {/* Socials */}
                <div className="flex items-center gap-2 pt-2">
                  {SOCIALS.map(({ label, href, svg }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="w-8 h-8 border border-white/10 flex items-center justify-center text-white/30 hover:text-blue-400 hover:border-blue-400/50 transition-all duration-200 cursor-pointer"
                    >
                      {svg}
                    </a>
                  ))}
                </div>
              </div>

              {/* Column 2: Explore Catalog */}
              <div>
                <h4 className="text-[0.58rem] tracking-[0.2em] uppercase text-white/50 font-bold mb-4" style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}>
                  Explore Catalog
                </h4>
                <ul className="space-y-2.5">
                  {[
                    { label: 'Custom Apparel', href: '/products' },
                    { label: 'Insulated Bottles', href: '/products' },
                    { label: 'Photo Mugs', href: '/products' },
                    { label: 'Bespoke Frames', href: '/products' },
                    { label: 'ID Cards & Merch', href: '/products' },
                  ].map((link, i) => (
                    <li key={i}>
                      <Link
                        href={link.href}
                        className="text-xs text-white/35 hover:text-blue-400 transition-colors no-underline font-medium"
                        style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 3: Resources */}
              <div>
                <h4 className="text-[0.58rem] tracking-[0.2em] uppercase text-white/50 font-bold mb-4" style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}>
                  Resources
                </h4>
                <ul className="space-y-2.5">
                  {[
                    { label: 'About Us', href: '/about' },
                    { label: 'Showcase Gallery', href: '/gallery' },
                    { label: 'Quality Guarantee', href: '/about#quality' },
                    { label: 'Frequently Asked', href: '/#faq' },
                    { label: 'Request a Quote', href: '/contact' },
                  ].map((link, i) => (
                    <li key={i}>
                      <Link
                        href={link.href}
                        className="text-xs text-white/35 hover:text-blue-400 transition-colors no-underline font-medium"
                        style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 4: Office Info */}
              <div className="space-y-3">
                <h4 className="text-[0.58rem] tracking-[0.2em] uppercase text-white/50 font-bold mb-4" style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}>
                  Office Coordinates
                </h4>
                <p className="text-xs text-white/40 leading-relaxed font-medium" style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}>
                  Faridabad, Haryana · India
                </p>
                <p className="text-xs font-semibold">
                  <a href="mailto:onezero1solutions@gmail.com" className="text-white/35 hover:text-blue-400 transition-colors no-underline">
                    onezero1solutions@gmail.com
                  </a>
                </p>
                <p className="text-xs font-semibold">
                  <a href="https://wa.me/918292349048" target="_blank" rel="noopener noreferrer" className="text-white/35 hover:text-blue-400 transition-colors no-underline">
                    +91 8292349048 (WhatsApp)
                  </a>
                </p>
                <span className="inline-flex items-center gap-1.5 bg-blue-500/10 border border-blue-500/20 text-blue-400 px-2 py-0.5 text-[0.52rem] font-bold tracking-wider uppercase mt-1">
                  <span className="w-1 h-1 rounded-full bg-blue-400 animate-pulse" /> Established 2026
                </span>
              </div>

            </div>

            {/* Bottom Copyright Bar */}
            <div className="flex flex-col items-center sm:flex-row sm:items-center sm:justify-between gap-4 border-t border-white/6 pt-8 text-center sm:text-left">
              <p
                className="text-[0.55rem] tracking-[0.16em] uppercase text-white/20 font-medium"
                style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}
              >
                © 2026 Print Planet. All rights reserved. Custom Printing Services.
              </p>
              <p
                className="text-[0.55rem] tracking-[0.14em] uppercase text-white/12"
                style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}
              >
                Designed &amp; Developed for Print Planet
              </p>
            </div>

          </div>  {/* end z-10 wrapper */}
        </footer>
      </section>

      {/* Modal portal */}
      <AnimatePresence>
        {modal && <ContactModal onClose={() => setModal(null)} />}
      </AnimatePresence>
    </>
  );
}
