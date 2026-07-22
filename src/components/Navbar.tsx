'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ArrowRight } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Home',     href: '/',         chevron: false },
  { label: 'About',    href: '/about',    chevron: false },
  { label: 'Products', href: '/products', chevron: false },
  { label: 'Gallery',  href: '/gallery',  chevron: false },
  { label: 'Contact',  href: '/contact',  chevron: false },
];

const SPRING = { type: 'spring' as const, stiffness: 280, damping: 32, mass: 0.75 };

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5 shrink-0 select-none no-underline">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-white" strokeWidth="2">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" className="opacity-30" />
        <ellipse cx="12" cy="12" rx="10" ry="3.5" stroke="currentColor" strokeWidth="1.5" transform="rotate(-28 12 12)" />
        <path d="M10 8v8M10 8h3a2.5 2.5 0 0 1 0 5h-3" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="font-black text-[0.88rem] tracking-[-0.03em] uppercase text-white font-sans">
        Print <span className="font-light text-white/55">Planet</span>
      </span>
    </Link>
  );
}

function NavLink({ label, href, chevron }: { label: string; href: string; chevron: boolean }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-1 px-2.5 py-2 rounded-full text-[0.62rem] font-medium tracking-wide uppercase hover:bg-white/8 transition-all duration-200 whitespace-nowrap no-underline"
      style={{ fontFamily: 'Satoshi, system-ui, sans-serif', color: '#D9D9D9', mixBlendMode: 'difference' }}
    >
      {label}
      {chevron && (
        <ChevronDown
          size={8}
          strokeWidth={2.5}
          style={{ color: '#D9D9D9', mixBlendMode: 'difference', marginTop: '1px' }}
        />
      )}
    </Link>
  );
}

function HireBtn() {
  return (
    <button
      onClick={() => window.dispatchEvent(new CustomEvent('open-contact-modal'))}
      className="group flex items-center bg-white rounded-full overflow-hidden hover:bg-white/80 transition-colors duration-200 shrink-0 cursor-pointer"
    >
      <span
        className="pl-4 pr-1.5 py-1.75 text-black text-[0.61rem] font-medium tracking-[0.14em] uppercase whitespace-nowrap"
        style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}
      >
        Get Quote
      </span>
      <span className="w-7 h-7 flex items-center justify-center rounded-full bg-black/10 group-hover:bg-black/15 transition-colors mr-0.5 shrink-0">
        <ArrowRight size={11} className="text-black" />
      </span>
    </button>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
   ONE pill. Spring-animates its width between compact and expanded.
   No AnimatePresence. No fading. Just physical expansion.
   Glass contrast is HIGH at default (top), lighter when expanded (scrolled).
   Sub-pages use static width, home page uses scrolling expand.
 ═══════════════════════════════════════════════════════════════════════════ */
export function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [expandedW, setExpandedW] = useState(1280);
  const [mobileOpen, setMobileOpen] = useState(false);

  /* Measure available width for the expanded state */
  useEffect(() => {
    const calc = () => {
      const padding = Math.min(Math.max(window.innerWidth * 0.04, 20), 80);
      setExpandedW(Math.min(window.innerWidth - padding * 2, 860));
    };
    calc();
    window.addEventListener('resize', calc);
    return () => window.removeEventListener('resize', calc);
  }, []);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    fn();
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  /* Compact ≈ logo(150) + sep + 5 links(~250) + sep + CTA(~90) + padding ≈ 680 */
  const COMPACT_W = 720;
  const targetW   = scrolled ? expandedW : COMPACT_W;

  return (
    <>
      {/* ══ DESKTOP ══════════════════════════════════════════════════════════ */}
      <div data-theme="dark" className="fixed top-0 left-0 right-0 z-50 hidden md:block pointer-events-none">

        {/* Centering wrapper — flex so no transform conflicts with Framer Motion */}
        <div className="absolute top-4 inset-x-0 flex justify-center">

        {/* THE pill — springs its width, centered by parent flex */}
        <motion.div
          animate={{ width: targetW }}
          transition={SPRING}
          className="pointer-events-auto flex items-center rounded-full relative"
          style={{
            /* Glass: contrast by default, lighter on expand */
            backdropFilter:  scrolled ? 'blur(16px)' : 'blur(28px)',
            WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'blur(28px)',
            backgroundColor: scrolled ? 'rgba(10,10,10,0.75)' : 'rgba(10,10,10,0.95)',
            border:          scrolled ? '1px solid rgba(255,255,255,0.10)' : '1px solid rgba(255,255,255,0.08)',
            boxShadow:       scrolled
              ? '0 4px 24px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.06)'
              : '0 8px 40px rgba(0,0,0,0.50), inset 0 1px 0 rgba(255,255,255,0.08)',
            transition: 'background-color 0.45s ease, backdrop-filter 0.45s ease, box-shadow 0.45s ease, border-color 0.45s ease',
            padding: '6px 10px 6px 16px',
            isolation: 'isolate',
          }}
        >
          {/* Logo — always left */}
          <Logo />

          {/* Separator */}
          <div className="h-5 w-px bg-white/12 shrink-0 ml-4 mr-3" />

          {/* Nav links — always in the absolute center of the pill */}
          <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-1.5">
            {NAV_LINKS.map((l) => <NavLink key={l.label} {...l} />)}
          </div>

          {/* Push CTA to the right */}
          <div className="flex-1" />

          {/* Separator */}
          <div className="h-5 w-px bg-white/12 shrink-0 ml-1 mr-3" />

          {/* CTA — always right */}
          <HireBtn />
        </motion.div>
        </div> {/* end centering wrapper */}
      </div>

      {/* ══ MOBILE ═══════════════════════════════════════════════════════════ */}
      <div className="fixed top-0 left-0 right-0 z-50 md:hidden pointer-events-none">
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-auto">

          {/* Logo pill */}
          <div
            className="flex items-center rounded-full px-4 py-2.5"
            style={{
              backdropFilter: 'blur(28px)',
              WebkitBackdropFilter: 'blur(28px)',
              backgroundColor: 'rgba(10,10,10,0.95)',
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow: '0 6px 28px rgba(0,0,0,0.40)',
            }}
          >
            <Logo />
          </div>

          {/* Menu pill */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex items-center gap-2.5 rounded-full px-4 py-3 cursor-pointer"
            style={{
              backdropFilter: 'blur(28px)',
              WebkitBackdropFilter: 'blur(28px)',
              backgroundColor: 'rgba(10,10,10,0.95)',
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow: '0 6px 28px rgba(0,0,0,0.40)',
            }}
            aria-label="Menu"
          >
            <div className="flex flex-col gap-1.25 w-3.75">
              <motion.span
                animate={mobileOpen ? { rotate: 45, y: 5.5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.22 }}
                className="block h-px bg-white w-full origin-center"
              />
              <motion.span
                animate={{ opacity: mobileOpen ? 0 : 1 }}
                transition={{ duration: 0.16 }}
                className="block h-px bg-white w-full"
              />
              <motion.span
                animate={mobileOpen ? { rotate: -45, y: -5.5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.22 }}
                className="block h-px bg-white w-full origin-center"
              />
            </div>
          </button>
        </div>

        {/* Mobile drawer — clips down from top */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ clipPath: 'inset(0 0 100% 0)' }}
              animate={{ clipPath: 'inset(0 0 0% 0)'   }}
              exit={{    clipPath: 'inset(0 0 100% 0)'  }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-x-0 top-0 h-screen overflow-y-auto bg-black/95 backdrop-blur-2xl pt-24 px-6 pb-10 flex flex-col pointer-events-auto"
            >
              {/* Visible close button */}
              <button
                onClick={() => setMobileOpen(false)}
                className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/8 flex items-center justify-center hover:bg-white/15 transition-colors"
                aria-label="Close menu"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 1l12 12M13 1L1 13" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>

              {NAV_LINKS.map((link, i) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="no-underline"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.06, duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                    className="flex items-center justify-between border-b border-white/8 py-4"
                  >
                    <span
                      className="font-black tracking-[-0.04em] text-white"
                      style={{ fontFamily: 'Satoshi, system-ui, sans-serif', fontWeight: 800, fontSize: 'clamp(2rem, 8vw, 2.8rem)' }}
                    >
                      {link.label}
                    </span>
                    <ArrowRight size={18} className="text-white/20" />
                  </motion.div>
                </Link>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.3 }}
                className="mt-auto pt-8"
              >
                <button
                  onClick={() => { setMobileOpen(false); window.dispatchEvent(new CustomEvent('open-contact-modal')); }}
                  className="flex items-center justify-center gap-2 bg-white text-black rounded-full py-4 w-full cursor-pointer"
                >
                  <span className="text-[0.68rem] font-medium tracking-[0.18em] uppercase" style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}>
                    Get Quote
                  </span>
                  <span className="w-6 h-6 rounded-full bg-black/10 flex items-center justify-center">
                    <ArrowRight size={10} className="text-black" />
                  </span>
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
