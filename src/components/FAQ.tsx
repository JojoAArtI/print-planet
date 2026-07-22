'use client';

import { useRef, useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect } from 'react';

gsap.registerPlugin(ScrollTrigger);

const EASE = [0.22, 1, 0.36, 1] as const;

const FAQS = [
  {
    question: 'How do I submit my designs or artwork?',
    answer: 'You can upload your design assets directly via WhatsApp or email (onezero1solutions@gmail.com). We accept vector formats (PDF, SVG, EPS) as well as high-resolution raster images (PNG, JPG). Our design team verifies the resolution and file quality before production starts.',
  },
  {
    question: 'Is there a minimum order quantity (MOQ)?',
    answer: 'No! We believe in celebrating all milestones, so we print single custom gift items. However, we offer highly competitive volume-based tier pricing for larger corporate, event, and school uniform orders.',
  },
  {
    question: 'How long does production and delivery take?',
    answer: 'Standard orders (single items and small batches) are processed and shipped within 3 to 5 business days. Bulk orders or complex uniform embroidery projects typically take 7 to 10 business days depending on design complexity and quantity.',
  },
  {
    question: 'Do you offer layout and design assistance?',
    answer: 'Yes, absolutely! If you only have a logo, an image, or a concept, our in-house designers will clean up vectors, align typography, and send you a digital mockup proof for your final approval before any printing begins.',
  },
  {
    question: 'What printing methods do you use?',
    answer: 'We utilize state-of-the-art print technologies including Dye Sublimation (for ceramic mugs, insulated bottles, and lanyards), Direct-to-Film (DTF) & Screen Printing (for breathable, long-lasting apparel), and Laser Engraving (for metal accessories).',
  },
];

function FAQItem({
  faq,
  index,
  isOpen,
  onToggle,
}: {
  faq: typeof FAQS[0];
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const rowRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rowRef, { once: true, margin: '-8%' });

  return (
    <motion.div
      ref={rowRef}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08, ease: EASE }}
      className="border-b border-white/8 relative overflow-hidden"
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-6 lg:py-8 text-left pl-4 cursor-pointer group"
      >
        <span
          className="font-bold text-white tracking-tight pr-4 group-hover:text-white/80 transition-colors"
          style={{
            fontFamily: 'Satoshi, system-ui, sans-serif',
            fontSize: 'clamp(1.1rem, 2vw, 1.6rem)',
          }}
        >
          {faq.question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: EASE }}
          className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-white/5 border border-white/10 group-hover:bg-white/10 group-hover:border-white/20 transition-colors"
        >
          <ChevronDown size={14} className="text-white/45" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="pb-8 pl-4 pr-12">
              <p
                className="text-white/50 leading-relaxed max-w-3xl"
                style={{
                  fontFamily: 'Satoshi, system-ui, sans-serif',
                  fontSize: 'clamp(0.92rem, 1.3vw, 1.05rem)',
                }}
              >
                {faq.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FAQ() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const sectionInView = useInView(sectionRef, { once: true, margin: '-12%' });
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useEffect(() => {
    if (!sectionRef.current || !lineRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0, transformOrigin: 'top center' },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 65%',
            end: 'bottom 35%',
            scrub: 1.5,
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="faq"
      data-theme="dark"
      className="w-full bg-[#0A0A0A] relative"
    >
      {/* Scroll-progress line — left edge */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-white/5 hidden lg:block pointer-events-none">
        <div ref={lineRef} className="w-full h-full bg-white/20" />
      </div>

      <div className="max-w-[1440px] mx-auto px-[clamp(1.25rem,5vw,5rem)] py-[clamp(5rem,10vw,11rem)]">
        {/* Section label + divider */}
        <div className="flex items-center gap-4 mb-[clamp(3rem,6vw,7rem)]">
          <motion.span
            className="text-[0.6rem] tracking-[0.22em] uppercase text-white/20 font-medium shrink-0"
            style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}
            initial={{ opacity: 0, x: -16 }}
            animate={sectionInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE }}
          >
            07 / FAQ
          </motion.span>
          <motion.div
            className="flex-1 h-px bg-white/10"
            initial={{ scaleX: 0, transformOrigin: 'left' }}
            animate={sectionInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.4, delay: 0.15, ease: EASE }}
          />
        </div>

        {/* Headline */}
        <h2
          className="font-black text-white tracking-[-0.04em] leading-[0.9] mb-[clamp(3rem,5vw,6rem)]"
          style={{
            fontFamily: 'Satoshi, system-ui, sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(2.8rem, 7vw, 8rem)',
          }}
        >
          {(['Common', 'questions'] as const).map((word, i) => (
            <span key={word} className="inline-block overflow-hidden mr-[0.25em]">
              <motion.span
                className="block"
                initial={{ y: '110%' }}
                animate={sectionInView ? { y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.05 + i * 0.1, ease: EASE }}
              >
                {word}
              </motion.span>
            </span>
          ))}
          {' '}
          <span className="inline-block overflow-hidden">
            <motion.span
              className="block"
              style={{
                fontFamily: 'var(--font-instrument), Georgia, serif',
                fontStyle: 'italic',
                fontWeight: 400,
                color: 'rgba(255,255,255,0.3)',
              }}
              initial={{ y: '110%' }}
              animate={sectionInView ? { y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.28, ease: EASE }}
            >
              answered
            </motion.span>
          </span>
        </h2>

        {/* FAQ list accordion */}
        <motion.div
          className="border-t border-white/8"
          initial={{ scaleX: 0, transformOrigin: 'left' }}
          animate={sectionInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
        >
          {FAQS.map((faq, i) => (
            <FAQItem
              key={i}
              faq={faq}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
