'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SmoothScroll } from '@/lib/SmoothScroll';
import { Navbar } from '@/components/Navbar';
import { Contact as FooterContact } from '@/components/Contact';
import { CustomCursor } from '@/components/CustomCursor';
import { Mail, Phone, MapPin, CheckCircle2, Clock } from 'lucide-react';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type FormState = {
  name: string;
  email: string;
  phone: string;
  category: string;
  quantity: string;
  message: string;
};

type FieldErrors = Record<keyof FormState, string>;

function getErrors(f: FormState): FieldErrors {
  return {
    name: f.name.trim().length < 2 ? 'Please enter your name.' : '',
    email: !EMAIL_RE.test(f.email.trim()) ? 'Enter a valid email address.' : '',
    phone: f.phone.trim().length < 8 ? 'Enter a valid phone number.' : '',
    category: f.category === '' ? 'Please select a product category.' : '',
    quantity: f.quantity.trim() === '' ? 'Please specify an approximate quantity.' : '',
    message: f.message.trim().length < 10 ? 'Describe your print details (10+ characters).' : '',
  };
}

export default function ContactPage() {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    phone: '',
    category: '',
    quantity: '',
    message: '',
  });
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    phone: false,
    category: false,
    quantity: false,
    message: false,
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const errors = getErrors(form);
  const isValid = !errors.name && !errors.email && !errors.phone && !errors.category && !errors.quantity && !errors.message;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValid) {
      setTouched({
        name: true,
        email: true,
        phone: true,
        category: true,
        quantity: true,
        message: true,
      });
      return;
    }
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: `Phone: ${form.phone}\nCategory: ${form.category}\nQuantity: ${form.quantity}\n\nMessage Details:\n${form.message}`,
        }),
      });
      setStatus(res.ok ? 'sent' : 'error');
    } catch {
      setStatus('error');
    }
  };

  const fieldClass = (hasError: boolean) =>
    `w-full bg-transparent border ${hasError ? 'border-red-500/50 focus:border-red-500/70' : 'border-black/15 focus:border-black/40'} text-black placeholder:text-black/25 px-5 py-3.5 text-sm focus:outline-none transition-colors duration-200`;

  const errorClass = 'text-[0.58rem] tracking-[0.04em] text-red-500/80 mt-1.5 block font-bold';

  return (
    <>
      <CustomCursor />
      <SmoothScroll>
        <Navbar />
        <main className="bg-white min-h-screen">
          {/* Header */}
          <section className="relative overflow-hidden pt-36 pb-12 border-b border-black/[0.08]">
            <div className="max-w-[1440px] mx-auto px-[clamp(1.25rem,5vw,5rem)]">
              <span className="text-[0.6rem] tracking-[0.25em] uppercase text-black/35 font-bold block mb-4">
                04 / Custom Quote
              </span>
              <h1
                className="font-black text-black tracking-tighter leading-[0.9] max-w-5xl"
                style={{
                  fontFamily: 'Satoshi, system-ui, sans-serif',
                  fontSize: 'clamp(3rem, 7.5vw, 7.5rem)'
                }}
              >
                Let&apos;s Print{' '}
                <span className="font-light italic text-black/30 font-serif">Together</span>
              </h1>
            </div>
          </section>

          {/* Split Content */}
          <section className="py-16">
            <div className="max-w-[1440px] mx-auto px-[clamp(1.25rem,5vw,5rem)]">
              <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1fr] gap-16 items-start">
                
                {/* LEFT: Info / Map */}
                <div className="space-y-12">
                  <div>
                    <h2 className="text-xs font-bold tracking-[0.2em] uppercase text-black/30 mb-8">
                      Contact Details
                    </h2>
                    
                    <div className="space-y-6">
                      <div className="flex gap-4 items-start">
                        <div className="w-10 h-10 rounded-full border border-black/5 flex items-center justify-center text-black/50 shrink-0">
                          <Mail size={16} />
                        </div>
                        <div>
                          <span className="text-[0.55rem] tracking-[0.16em] uppercase text-black/30 block mb-1 font-bold">Email Address</span>
                          <a href="mailto:onezero1solutions@gmail.com" className="text-black font-semibold hover:text-black/60 transition-colors">
                            onezero1solutions@gmail.com
                          </a>
                        </div>
                      </div>

                      <div className="flex gap-4 items-start">
                        <div className="w-10 h-10 rounded-full border border-black/5 flex items-center justify-center text-black/50 shrink-0">
                          <Phone size={16} />
                        </div>
                        <div>
                          <span className="text-[0.55rem] tracking-[0.16em] uppercase text-black/30 block mb-1 font-bold">Phone / WhatsApp</span>
                          <a href="https://wa.me/918292349048" target="_blank" rel="noopener noreferrer" className="text-black font-semibold hover:text-black/60 transition-colors block">
                            +91 8292349048
                          </a>
                        </div>
                      </div>

                      <div className="flex gap-4 items-start">
                        <div className="w-10 h-10 rounded-full border border-black/5 flex items-center justify-center text-black/50 shrink-0">
                          <MapPin size={16} />
                        </div>
                        <div>
                          <span className="text-[0.55rem] tracking-[0.16em] uppercase text-black/30 block mb-1 font-bold">Office Address</span>
                          <p className="text-black font-semibold">
                            Faridabad, Haryana · India
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-4 items-start">
                        <div className="w-10 h-10 rounded-full border border-black/5 flex items-center justify-center text-black/50 shrink-0">
                          <Clock size={16} />
                        </div>
                        <div>
                          <span className="text-[0.55rem] tracking-[0.16em] uppercase text-black/30 block mb-1 font-bold">Working Hours</span>
                          <p className="text-black font-semibold">
                            Mon - Sat: 9:00 AM - 7:00 PM IST
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Clean design grid representation of map */}
                  <div className="border border-black/[0.08] p-8 bg-black/[0.015] relative overflow-hidden aspect-[4/3] w-full flex flex-col justify-between">
                    <div className="absolute top-0 right-0 pointer-events-none">
                      <div className="absolute top-0 right-0 w-px h-8 bg-black/10" />
                      <div className="absolute top-0 right-0 w-8 h-px bg-black/10" />
                    </div>
                    <div>
                      <span className="text-[0.55rem] tracking-[0.16em] uppercase text-black/30 block mb-1 font-bold">Geographic Coverage</span>
                      <h3 className="font-black text-xl text-black tracking-tight" style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}>
                        Shipping India-Wide
                      </h3>
                    </div>
                    <div className="relative h-32 w-full border border-black/5 bg-white/50 flex items-center justify-center">
                      {/* Stylized vector map graphic */}
                      <svg className="w-24 h-24 text-black/10" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
                        <circle cx="50" cy="50" r="40" strokeDasharray="3 3" />
                        <circle cx="50" cy="50" r="25" />
                        <circle cx="50" cy="50" r="8" fill="currentColor" fillOpacity="0.3" />
                        <line x1="50" y1="10" x2="50" y2="90" strokeDasharray="2 2" />
                        <line x1="10" y1="50" x2="90" y2="50" strokeDasharray="2 2" />
                      </svg>
                      <span className="absolute bottom-2 right-2 text-[0.45rem] tracking-wider text-black/35 font-bold uppercase">Faridabad Center</span>
                    </div>
                    <p className="text-black/45 text-xs">
                      Our production hub in Haryana dispatches customized bulk cargo across north, south, and central provinces.
                    </p>
                  </div>
                </div>

                {/* RIGHT: Custom Form */}
                <div className="border border-black/[0.08] p-8 sm:p-10 bg-white relative">
                  <div className="absolute top-0 right-0 pointer-events-none">
                    <div className="absolute top-0 right-0 w-px h-10 bg-black/15" />
                    <div className="absolute top-0 right-0 w-10 h-px bg-black/15" />
                  </div>

                  <AnimatePresence mode="wait">
                    {status === 'sent' ? (
                      <motion.div
                        key="sent"
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="py-16 text-center"
                      >
                        <CheckCircle2 size={40} className="text-emerald-500 mx-auto mb-6" />
                        <h3 className="font-black text-2xl text-black mb-3 tracking-tight" style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}>
                          Quote Request Dispatched
                        </h3>
                        <p className="text-black/55 text-sm max-w-md mx-auto leading-relaxed mb-8">
                          Thank you for choosing Print Planet. Our procurement desk will verify the details and send a PDF quotation with shipping estimates to your inbox within 24 hours.
                        </p>
                        <button
                          onClick={() => setStatus('idle')}
                          className="px-6 py-2.5 border border-black/15 text-black hover:bg-black hover:text-white transition-colors text-[0.62rem] tracking-[0.18em] uppercase font-bold cursor-pointer"
                          style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}
                        >
                          Submit Another Quote
                        </button>
                      </motion.div>
                    ) : (
                      <motion.form key="form" onSubmit={handleSubmit} className="space-y-6">
                        <h2 className="text-xs font-bold tracking-[0.2em] uppercase text-black/30 mb-8">
                          Quote Calculator
                        </h2>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-[0.58rem] tracking-[0.18em] uppercase text-black/45 mb-2 font-bold" style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}>
                              Full Name
                            </label>
                            <input
                              type="text"
                              value={form.name}
                              onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                              onBlur={() => setTouched((p) => ({ ...p, name: true }))}
                              className={fieldClass(touched.name && !!errors.name)}
                              style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}
                              placeholder="John Doe"
                            />
                            {touched.name && errors.name && <span className={errorClass}>{errors.name}</span>}
                          </div>

                          <div>
                            <label className="block text-[0.58rem] tracking-[0.18em] uppercase text-black/45 mb-2 font-bold" style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}>
                              Email Address
                            </label>
                            <input
                              type="email"
                              value={form.email}
                              onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                              onBlur={() => setTouched((p) => ({ ...p, email: true }))}
                              className={fieldClass(touched.email && !!errors.email)}
                              style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}
                              placeholder="john@example.com"
                            />
                            {touched.email && errors.email && <span className={errorClass}>{errors.email}</span>}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-[0.58rem] tracking-[0.18em] uppercase text-black/45 mb-2 font-bold" style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}>
                              Phone Number
                            </label>
                            <input
                              type="text"
                              value={form.phone}
                              onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                              onBlur={() => setTouched((p) => ({ ...p, phone: true }))}
                              className={fieldClass(touched.phone && !!errors.phone)}
                              style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}
                              placeholder="e.g. +91 9999999999"
                            />
                            {touched.phone && errors.phone && <span className={errorClass}>{errors.phone}</span>}
                          </div>

                          <div>
                            <label className="block text-[0.58rem] tracking-[0.18em] uppercase text-black/45 mb-2 font-bold" style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}>
                              Product Category
                            </label>
                            <select
                              value={form.category}
                              onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))}
                              onBlur={() => setTouched((p) => ({ ...p, category: true }))}
                              className={fieldClass(touched.category && !!errors.category)}
                              style={{ fontFamily: 'Satoshi, system-ui, sans-serif', color: form.category ? '#000' : 'rgba(0,0,0,0.4)' }}
                            >
                              <option value="">Select a category</option>
                              <option value="Apparel">Apparel (T-Shirts/Hoodies/Caps)</option>
                              <option value="Drinkware">Drinkware (Mugs/Bottles)</option>
                              <option value="Frames">Photo Frames Customization</option>
                              <option value="Accessories">Accessories (Keychains/Mouse Pads)</option>
                              <option value="Tech Covers">Mobile Back Covers</option>
                              <option value="Corporate/School">Corporate Merch & School Uniforms</option>
                            </select>
                            {touched.category && errors.category && <span className={errorClass}>{errors.category}</span>}
                          </div>
                        </div>

                        <div>
                          <label className="block text-[0.58rem] tracking-[0.18em] uppercase text-black/45 mb-2 font-bold" style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}>
                            Approximate Quantity
                          </label>
                          <input
                            type="text"
                            value={form.quantity}
                            onChange={(e) => setForm((p) => ({ ...p, quantity: e.target.value }))}
                            onBlur={() => setTouched((p) => ({ ...p, quantity: true }))}
                            className={fieldClass(touched.quantity && !!errors.quantity)}
                            style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}
                            placeholder="e.g. 50 items (or 'Single Gift')"
                          />
                          {touched.quantity && errors.quantity && <span className={errorClass}>{errors.quantity}</span>}
                        </div>

                        <div>
                          <label className="block text-[0.58rem] tracking-[0.18em] uppercase text-black/45 mb-2 font-bold" style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}>
                            Inquiry &amp; Brand Details
                          </label>
                          <textarea
                            rows={5}
                            value={form.message}
                            onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                            onBlur={() => setTouched((p) => ({ ...p, message: true }))}
                            className={`${fieldClass(touched.message && !!errors.message)} resize-none`}
                            style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}
                            placeholder="Please detail your print design ideas, sizing distribution, color schemes, and preferred delivery date..."
                          />
                          {touched.message && errors.message && <span className={errorClass}>{errors.message}</span>}
                        </div>

                        {status === 'error' && (
                          <p className="text-[0.6rem] tracking-[0.12em] text-red-500 font-bold" style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}>
                            Something went wrong — please try again or email directly.
                          </p>
                        )}

                        <button
                          type="submit"
                          disabled={status === 'sending' || !isValid}
                          className="w-full bg-black text-white py-4 text-[0.62rem] tracking-[0.22em] uppercase font-semibold hover:bg-black/85 transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                          style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}
                        >
                          {status === 'sending' ? 'Transmitting...' : 'Calculate & Send Quote'}
                        </button>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </section>
        </main>
        <FooterContact />
      </SmoothScroll>
    </>
  );
}
