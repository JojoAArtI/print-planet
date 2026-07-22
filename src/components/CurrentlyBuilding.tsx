'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const EASE = [0.22, 1, 0.36, 1] as const;

interface Chip { label: string; detail: string }

interface Build {
  logoSlot:  React.ReactNode;
  name:      string;
  tagline:   string;
  chips:     Chip[];
  link:      string;
}

function Row({
  build,
  inView,
  delay,
  divided,
}: {
  build:   Build;
  inView:  boolean;
  delay:   number;
  divided: boolean;
}) {
  return (
    <div
      style={
        divided
          ? { borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 'clamp(1.25rem,2.5vw,1.75rem)' }
          : {}
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr_auto] items-start lg:items-center gap-5 lg:gap-12">

        {/* ── Logo / badge slot ── */}
        <motion.div
          className="flex items-center gap-4"
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay, ease: EASE }}
        >
          {build.logoSlot}
        </motion.div>

        {/* ── Description ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: delay + 0.08, ease: EASE }}
        >
          <p
            className="text-white/80"
            style={{
              fontFamily: 'Satoshi, system-ui, sans-serif',
              fontSize:   'clamp(0.88rem,1.4vw,1.15rem)',
              fontWeight: 600,
            }}
          >
            {build.name}{' '}
            <span
              style={{
                fontFamily: 'var(--font-instrument), Georgia, serif',
                fontStyle:  'italic',
                fontWeight: 400,
                color:      'rgba(255,255,255,0.38)',
              }}
            >
              — {build.tagline}
            </span>
          </p>

          <div className="mt-2.5 flex flex-wrap gap-x-5 gap-y-1.5">
            {build.chips.map((chip) => (
              <span key={chip.label} className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-white/30 shrink-0" />
                <span
                  className="text-[0.6rem] tracking-[0.05em] text-white/35"
                  style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}
                >
                  <span className="text-white/55">{chip.label}</span>
                  {' '}· {chip.detail}
                </span>
              </span>
            ))}
          </div>
        </motion.div>

        {/* ── Link ── */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: delay + 0.16, ease: EASE }}
          className="shrink-0"
        >
          <Link
            href={build.link}
            className="group inline-flex items-center gap-2 text-white/35 hover:text-white transition-colors duration-200 no-underline cursor-pointer"
          >
            <span
              className="text-[0.58rem] tracking-[0.2em] uppercase font-medium"
              style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}
            >
              Learn More
            </span>
            <ArrowRight
              size={12}
              className="group-hover:translate-x-0.5 transition-transform duration-200"
            />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

export function CurrentlyBuilding() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-15%' });

  const BUILDS: Build[] = [
    {
      logoSlot: (
        <div className="flex items-center gap-4">
          <span className="inline-flex items-center gap-2 border border-emerald-400/25 px-3 py-1.5">
            <span className="relative flex w-1.5 h-1.5">
              <span className="absolute inset-0 rounded-full bg-emerald-400/50 animate-ping" />
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            </span>
            <span
              className="text-[0.55rem] tracking-[0.24em] uppercase text-emerald-300/70 font-semibold"
              style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}
            >
              Why Choose Us
            </span>
          </span>
          <div className="h-7 w-7 text-white/40 shrink-0 hidden sm:flex items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
          </div>
        </div>
      ),
      name:    'Superior Quality',
      tagline: 'materials and inks chosen to elevate your brand perception.',
      chips:   [
        { label: 'Combed Cotton', detail: 'long-lasting premium apparel fabrics' },
        { label: 'Vibrant Inks', detail: 'high-fidelity, wash-resistant dye transfers' },
        { label: 'Sublimation Durability', detail: 'microwave and dishwasher safe coatings' },
      ],
      link:    '/about#quality',
    },
    {
      logoSlot: (
        <div className="flex items-center gap-4">
          <div className="h-7 w-7 text-white/40 shrink-0 flex items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="12" cy="12" r="10"/>
              <path d="m9 12 2 2 4-4"/>
            </svg>
          </div>
          <span className="text-white/40 font-black text-[0.82rem] tracking-tight hidden sm:inline uppercase">
            Process
          </span>
        </div>
      ),
      name:     'Transparent Process',
      tagline:  'no guesswork, no hidden charges, sign-off on digital mockups.',
      chips:    [
        { label: 'Vector Checks', detail: 'free artwork verification before print' },
        { label: 'Layout Mockups', detail: 'visual digital proof approval' },
        { label: 'Direct Chat', detail: 'instant WhatsApp updates and quotes' },
      ],
      link:     '/#process',
    },
    {
      logoSlot: (
        <div className="flex items-center gap-4">
          <div className="h-7 w-7 text-white/40 shrink-0 flex items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M13 2 L3 14 H12 L11 22 L21 10 H12 Z"/>
            </svg>
          </div>
          <span className="text-white/40 font-black text-[0.82rem] tracking-tight hidden sm:inline uppercase">
            Speed
          </span>
        </div>
      ),
      name:     'Reliable Scaling',
      tagline:  'timely bulk corporate and school uniform orders.',
      chips:    [
        { label: 'Fast Turnaround', detail: '7-10 business days for bulk orders' },
        { label: 'Quality Checks', detail: 'individual item inspection before pack' },
        { label: 'Direct Logistics', detail: 'reliable courier shipping' },
      ],
      link:     '/products',
    },
    {
      logoSlot: (
        <div className="flex items-center gap-4">
          <div className="h-7 w-7 text-white/40 shrink-0 flex items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M21 12H3M12 3v18"/>
            </svg>
          </div>
          <span className="text-white/40 font-black text-[0.82rem] tracking-tight hidden sm:inline uppercase">
            Pricing
          </span>
        </div>
      ),
      name:     'No MOQ pricing',
      tagline:  'competitive price points whether you order one or one thousand.',
      chips:    [
        { label: 'Single Items', detail: 'ideal for customized gifts' },
        { label: 'Bulk Tiers', detail: 'staggered wholesale savings' },
        { label: 'Clear Invoices', detail: 'detailed quotes with no surprises' },
      ],
      link:     '/contact',
    },
  ];

  return (
    <section
      ref={ref}
      data-theme="dark"
      className="w-full bg-[#0A0A0A] border-t border-white/6 relative overflow-hidden"
    >
      {/* moving scan line */}
      <motion.div
        aria-hidden
        className="absolute top-0 bottom-0 w-px pointer-events-none"
        style={{
          background:
            'linear-gradient(180deg, transparent, rgba(255,255,255,0.18), transparent)',
        }}
        animate={{ left: ['-5%', '105%'] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'linear' }}
      />

      <div className="relative z-10 max-w-[1440px] mx-auto px-[clamp(1.25rem,5vw,5rem)] py-[clamp(3rem,5vw,4.5rem)]">
        <div className="flex flex-col gap-[clamp(1.25rem,2.5vw,1.75rem)]">
          <Row build={BUILDS[0]} inView={inView} delay={0}    divided={false} />
          <Row build={BUILDS[1]} inView={inView} delay={0.08} divided={true}  />
          <Row build={BUILDS[2]} inView={inView} delay={0.16} divided={true}  />
          <Row build={BUILDS[3]} inView={inView} delay={0.24} divided={true}  />
        </div>
      </div>
    </section>
  );
}
