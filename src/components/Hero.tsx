'use client';

import { motion } from 'framer-motion';
import { ArrowDownRight, CheckCircle } from 'lucide-react';
import Link from 'next/link';

const EASE = [0.22, 1, 0.36, 1] as const;
const STACK_TAGS = ['Apparel', 'Drinkware', 'Photo Frames', 'Uniforms', 'Corporate Gifts', 'Accessories'];

export function Hero() {
  return (
    <section
      className="relative w-full min-h-screen bg-zinc-50 overflow-hidden flex items-center pt-24 pb-16"
      style={{ isolation: 'isolate' }}
    >
      {/* Soft atmospheric gradient orbs */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Blue Orb */}
        <div
          className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full opacity-[0.12] blur-[120px]"
          style={{
            background: 'radial-gradient(circle, #3B82F6 0%, transparent 80%)',
          }}
        />
        {/* Coral/Indigo Orb */}
        <div
          className="absolute bottom-[5%] right-[-5%] w-[45vw] h-[45vw] rounded-full opacity-[0.08] blur-[100px]"
          style={{
            background: 'radial-gradient(circle, #F43F5E 0%, transparent 80%)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-[clamp(1.25rem,5vw,5rem)] w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center">
          
          {/* LEFT COLUMN: Clean text copy */}
          <div className="flex flex-col">
            {/* Status Pill */}
            <motion.div
              className="inline-flex items-center gap-2 border border-blue-500/15 bg-blue-500/[0.03] px-3.5 py-1.5 self-start mb-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              <span
                className="text-[0.62rem] font-bold tracking-[0.18em] uppercase text-blue-600"
                style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}
              >
                Accepting Orders
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              className="font-black leading-[0.95] tracking-tight text-zinc-950"
              style={{
                fontFamily: 'Satoshi, system-ui, sans-serif',
                fontSize: 'clamp(2.8rem, 6.2vw, 5.8rem)',
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
            >
              Premium Custom Printing &{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                Merchandise
              </span>
            </motion.h1>

            {/* Tagline */}
            <motion.p
              className="mt-6 text-zinc-600 text-lg sm:text-xl font-medium leading-relaxed max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25, ease: EASE }}
            >
              We turn your creative ideas and cherished memories into reality. From high-quality custom apparel to personalized corporate gift kits, we handle every print run with uncompromised precision.
            </motion.p>

            {/* Category Tags */}
            <motion.div
              className="flex flex-wrap gap-2 mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {STACK_TAGS.map((tag) => (
                <span
                  key={tag}
                  className="bg-white border border-zinc-200 px-3 py-1.5 text-[0.65rem] font-bold tracking-[0.12em] uppercase text-zinc-500 rounded-none shadow-xs"
                  style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}
                >
                  {tag}
                </span>
              ))}
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              className="flex items-center gap-4 mt-10"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45, ease: EASE }}
            >
              <Link
                href="/products"
                className="group flex items-center gap-2 bg-blue-600 text-white px-7 py-4 text-[0.68rem] font-bold tracking-[0.18em] uppercase hover:bg-blue-700 transition-colors duration-200 no-underline shadow-md shadow-blue-500/10"
                style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}
              >
                Browse Catalog
                <ArrowDownRight
                  size={12}
                  className="group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform"
                />
              </Link>
              <button
                onClick={() => window.dispatchEvent(new CustomEvent('open-contact-modal'))}
                className="text-[0.68rem] font-bold tracking-[0.18em] uppercase border border-zinc-300 bg-white text-zinc-700 px-7 py-4 hover:bg-zinc-50 transition-colors duration-200 cursor-pointer shadow-xs"
                style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}
              >
                Get Custom Quote
              </button>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: Clean graphical mock card */}
          <motion.div
            className="relative flex items-center justify-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.96, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
          >
            {/* Outline Card Mock */}
            <div className="w-full max-w-md border border-zinc-200/80 bg-white p-8 shadow-xl shadow-zinc-200/50 relative flex flex-col justify-between aspect-[5/4]">
              {/* Top Accent */}
              <div className="absolute top-0 right-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-px h-8 bg-blue-500/20" />
                <div className="absolute top-0 right-0 w-8 h-px bg-blue-500/20" />
              </div>

              <div>
                <div className="flex justify-between items-center mb-6">
                  <span className="text-[0.55rem] tracking-[0.2em] uppercase text-zinc-400 font-bold">
                    Featured Collection
                  </span>
                  <span className="flex items-center gap-1.5 text-emerald-600 text-[0.55rem] font-bold tracking-wider uppercase bg-emerald-50 border border-emerald-200 px-2 py-0.5">
                    <CheckCircle size={10} /> Verified
                  </span>
                </div>
                
                <h3 className="font-extrabold text-2xl text-zinc-900 tracking-tight mb-2" style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}>
                  Signature Team Sweaters
                </h3>
                <p className="text-zinc-500 text-sm leading-relaxed mb-6">
                  Engineered with premium fleece fabrics and crack-resistant high-density prints for ultimate daily durability.
                </p>

                {/* SVG Visual Print representation */}
                <div className="border border-zinc-100 bg-zinc-50/50 rounded-xs h-28 flex items-center justify-center relative overflow-hidden">
                  <svg className="w-16 h-16 text-blue-500/8" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 30 L35 20 L50 28 L65 20 L80 30 L75 80 L25 80 Z" fill="url(#gradHero)" />
                    <circle cx="50" cy="50" r="10" stroke="currentColor" strokeWidth="1" />
                    <defs>
                      <linearGradient id="gradHero" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.1" />
                        <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.2" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute bottom-2 right-3 text-[0.48rem] tracking-widest text-zinc-400 font-bold uppercase">
                    360 GSM Fleece
                  </div>
                </div>
              </div>

              <div className="border-t border-zinc-100 pt-4 flex items-center justify-between mt-6">
                <span className="text-[0.55rem] tracking-[0.16em] uppercase text-zinc-400 font-bold">
                  Print Method: DTF Transfer
                </span>
                <span className="text-[0.55rem] tracking-[0.16em] uppercase text-indigo-600 font-extrabold">
                  MOQ: 1 Item
                </span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
