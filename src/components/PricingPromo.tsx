'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

const EASE = [0.22, 1, 0.36, 1] as const;

const TIERS = [
  { label: 'Custom Gift Items', note: 'No minimum order quantity (MOQ)' },
  { label: 'Bulk Apparel & Wear', note: 'Volume discounts starting at 10+ items' },
  { label: 'Corporate Merch & Gifts', note: 'Fully managed custom order packs' },
];

export function PricingPromo() {
  const ref     = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const inView  = useInView(ref, { once: true, margin: '-10%' });

  return (
    <section
      ref={ref}
      id="pricing"
      className="w-full bg-white border-t border-black/[0.08] overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-[clamp(1.25rem,5vw,5rem)] py-[clamp(4rem,8vw,9rem)]">

        {/* Section label */}
        <div className="flex items-center gap-4 mb-[clamp(2rem,4vw,4rem)]">
          <motion.span
            className="text-[0.6rem] tracking-[0.22em] uppercase text-black/30 font-medium shrink-0"
            style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}
            initial={{ opacity: 0, x: -12 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE }}
          >
            08 / Pricing
          </motion.span>
          <motion.div
            ref={lineRef}
            className="flex-1 h-px bg-black/10"
            style={{ transformOrigin: 'left' }}
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.4, delay: 0.1, ease: EASE }}
          />
        </div>

        {/* Two-column layout — headline left, copy + CTA right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[clamp(3rem,6vw,8rem)] items-end">

          {/* Left — display headline */}
          <div>
            <h2
              className="font-black text-black tracking-tighter leading-[0.88]"
              style={{
                fontFamily: 'Satoshi, system-ui, sans-serif',
                fontWeight: 900,
                fontSize:   'clamp(3.5rem, 9vw, 11rem)',
              }}
            >
              {['Transparent'].map((word, i) => (
                <span key={word} className="block overflow-hidden">
                  <motion.span
                    className="block"
                    initial={{ y: '110%' }}
                    animate={inView ? { y: 0 } : {}}
                    transition={{ duration: 0.75, delay: 0.05 + i * 0.1, ease: EASE }}
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
              <span className="block overflow-hidden">
                <motion.span
                  className="block"
                  style={{
                    fontFamily: 'var(--font-instrument), Georgia, serif',
                    fontStyle:  'italic',
                    fontWeight: 400,
                    color:      'rgba(10,10,10,0.28)',
                  }}
                  initial={{ y: '110%' }}
                  animate={inView ? { y: 0 } : {}}
                  transition={{ duration: 0.75, delay: 0.18, ease: EASE }}
                >
                  Pricing
                </motion.span>
              </span>
            </h2>
          </div>

          {/* Right — descriptor + tiers + CTA */}
          <motion.div
            className="flex flex-col gap-8"
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.25, ease: EASE }}
          >
            <p
              className="text-black/55 leading-relaxed"
              style={{
                fontFamily: 'Satoshi, system-ui, sans-serif',
                fontWeight: 400,
                fontSize:   'clamp(1.05rem, 1.5vw, 1.3rem)',
              }}
            >
              Every custom job, clearly budgeted — no hidden setup costs or surprise
              charges. Request a rapid custom quote on the fly, pick the catalog category
              that fits, and approve design mockups within 24 hours.
            </p>

            {/* Tier pills */}
            <div className="flex flex-col gap-3">
              {TIERS.map((tier, i) => (
                <motion.div
                  key={tier.label}
                  className="flex items-center justify-between border-b border-black/8 pb-3"
                  initial={{ opacity: 0, x: -12 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.35 + i * 0.08, ease: EASE }}
                >
                  <span
                    className="font-black text-black tracking-tight"
                    style={{
                      fontFamily: 'Satoshi, system-ui, sans-serif',
                      fontWeight: 800,
                      fontSize:   'clamp(1.1rem, 1.6vw, 1.35rem)',
                    }}
                  >
                    {tier.label}
                  </span>
                  <span
                    className="text-black/35"
                    style={{
                      fontFamily: 'Satoshi, system-ui, sans-serif',
                      fontWeight: 400,
                      fontSize:   '0.72rem',
                      letterSpacing: '0.04em',
                    }}
                  >
                    {tier.note}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.div
              className="flex items-center gap-4"
              initial={{ opacity: 0, y: 8 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6, ease: EASE }}
            >
              <Link
                href="/contact"
                data-cursor="view"
                className="group flex items-center gap-2 bg-black text-white px-7 py-3.5 text-[0.68rem] font-medium tracking-[0.18em] uppercase hover:bg-black/80 transition-colors duration-200"
                style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}
              >
                Request a Quote
                <ArrowUpRight
                  size={12}
                  className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"
                />
              </Link>
              <span
                className="text-black/30"
                style={{
                  fontFamily:    'Satoshi, system-ui, sans-serif',
                  fontSize:      '0.65rem',
                  letterSpacing: '0.06em',
                }}
              >
                printplanet.in/quote
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
