'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SmoothScroll } from '@/lib/SmoothScroll';
import { Navbar } from '@/components/Navbar';
import { Contact } from '@/components/Contact';
import { CustomCursor } from '@/components/CustomCursor';
import { Maximize2, X } from 'lucide-react';

const EASE = [0.22, 1, 0.36, 1] as const;

interface GalleryItem {
  id: string;
  title: string;
  category: 'Apparel' | 'Drinkware' | 'Frames' | 'Accessories' | 'Corporate' | 'School';
  client: string;
  desc: string;
  svgMockup: React.ReactNode;
}

const ITEMS: GalleryItem[] = [
  {
    id: '1',
    title: 'Varsity Football Jerseys',
    category: 'Apparel',
    client: 'Apex Football Academy',
    desc: 'High-density DTF prints on sweat-wicking lightweight athletic mesh fabric.',
    svgMockup: (
      <svg className="w-full h-full text-zinc-800" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20 30 L35 20 L50 28 L65 20 L80 30 L75 55 L70 85 L30 85 L25 55 Z" fill="url(#grad1)" />
        <path d="M50 28 L50 85" strokeDasharray="3 3" />
        <circle cx="50" cy="55" r="10" stroke="currentColor" strokeWidth="1.5" />
        <text x="47" y="58" fontSize="8" fill="currentColor" fontWeight="900" fontFamily="sans-serif">10</text>
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#18181b" />
            <stop offset="100%" stopColor="#3f3f46" />
          </linearGradient>
        </defs>
      </svg>
    )
  },
  {
    id: '2',
    title: 'Laser-Etched Stealth Bottles',
    category: 'Drinkware',
    client: 'Titanium Labs',
    desc: 'Matte black vacuum-insulated flasks with raw stainless steel exposed branding.',
    svgMockup: (
      <svg className="w-full h-full text-zinc-800" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="38" y="15" width="24" height="10" rx="2" fill="url(#grad2)" />
        <path d="M42 25 L30 40 L30 85 L70 85 L70 40 L58 25 Z" fill="url(#grad2)" />
        <rect x="42" y="48" width="16" height="20" rx="1" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
        <circle cx="50" cy="58" r="4" fill="currentColor" />
        <defs>
          <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#09090b" />
            <stop offset="100%" stopColor="#27272a" />
          </linearGradient>
        </defs>
      </svg>
    )
  },
  {
    id: '3',
    title: 'A3 Exhibition Poster Frames',
    category: 'Frames',
    client: 'Visual Arts Society',
    desc: 'Deep-shadow box profiles in textured matte black with museum-grade mounting board.',
    svgMockup: (
      <svg className="w-full h-full text-zinc-800" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="20" y="15" width="60" height="70" rx="1" fill="url(#grad3)" />
        <rect x="28" y="23" width="44" height="54" fill="#ffffff" fillOpacity="0.05" />
        <path d="M35 60 L50 45 L65 60" />
        <circle cx="42" cy="40" r="3" fill="currentColor" />
        <defs>
          <linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e1b4b" />
            <stop offset="100%" stopColor="#311042" />
          </linearGradient>
        </defs>
      </svg>
    )
  },
  {
    id: '4',
    title: 'Satin Corporate Lanyards',
    category: 'Corporate',
    client: 'Summit FinTech',
    desc: 'Silky smooth sublimation print with heavy alloy card clips and safety buckles.',
    svgMockup: (
      <svg className="w-full h-full text-zinc-800" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M35 15 C 35 45, 48 65, 48 75" fill="none" stroke="url(#grad4)" strokeWidth="6" />
        <path d="M65 15 C 65 45, 52 65, 52 75" fill="none" stroke="url(#grad4)" strokeWidth="6" />
        <rect x="44" y="75" width="12" height="15" rx="1" fill="currentColor" />
        <line x1="44" y1="80" x2="56" y2="80" stroke="#000" strokeWidth="1" />
        <defs>
          <linearGradient id="grad4" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#042f2e" />
            <stop offset="100%" stopColor="#115e59" />
          </linearGradient>
        </defs>
      </svg>
    )
  },
  {
    id: '5',
    title: 'Premium Combed Cotton Polos',
    category: 'School',
    client: 'Oakridge International School',
    desc: 'Dense double-pique stitch shirts with school chest monogram embroidery.',
    svgMockup: (
      <svg className="w-full h-full text-zinc-800" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20 30 L35 22 L45 28 L50 25 L55 28 L65 22 L80 30 L74 65 L26 65 Z" fill="url(#grad5)" />
        <path d="M35 22 L42 34 L58 34 L65 22" />
        <circle cx="35" cy="40" r="3" fill="#ffffff" fillOpacity="0.2" />
        <defs>
          <linearGradient id="grad5" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#064e3b" />
            <stop offset="100%" stopColor="#0f766e" />
          </linearGradient>
        </defs>
      </svg>
    )
  },
  {
    id: '6',
    title: 'Gloss Ceramic Coffee Mugs',
    category: 'Drinkware',
    client: 'Studio Bloom Cafe',
    desc: 'Rich ink transfer showing detailed brand illustrations, dishwasher certified.',
    svgMockup: (
      <svg className="w-full h-full text-zinc-800" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="25" y="25" width="40" height="50" rx="6" fill="url(#grad6)" />
        <path d="M65 35 C 75 35, 78 45, 78 50 C 78 55, 75 65, 65 65" stroke="currentColor" strokeWidth="5" fill="none" />
        <circle cx="45" cy="50" r="8" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
        <defs>
          <linearGradient id="grad6" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2e1065" />
            <stop offset="100%" stopColor="#581c87" />
          </linearGradient>
        </defs>
      </svg>
    )
  },
  {
    id: '7',
    title: 'High-Density Desk Mats',
    category: 'Accessories',
    client: 'HyperGrid eSports',
    desc: 'Extra large sublimation layouts with micro-weave texture and locked edges.',
    svgMockup: (
      <svg className="w-full h-full text-zinc-800" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="15" y="30" width="70" height="40" rx="2" fill="url(#grad7)" />
        <path d="M15 50 C30 35, 50 65, 70 50 L85 50" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.3" />
        <defs>
          <linearGradient id="grad7" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1c1917" />
            <stop offset="100%" stopColor="#44403c" />
          </linearGradient>
        </defs>
      </svg>
    )
  },
  {
    id: '8',
    title: 'Thermal Barcode Student IDs',
    category: 'School',
    client: 'DPS Campus Faridabad',
    desc: 'CR80 PVC cards printed with high-resolution details and protective sheen.',
    svgMockup: (
      <svg className="w-full h-full text-zinc-800" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="25" y="20" width="50" height="60" rx="3" fill="url(#grad8)" />
        <rect x="42" y="28" width="16" height="18" rx="1" fill="#fff" fillOpacity="0.2" />
        <line x1="35" y1="55" x2="65" y2="55" stroke="currentColor" strokeWidth="3" />
        <line x1="35" y1="63" x2="55" y2="63" stroke="currentColor" strokeWidth="1" />
        <line x1="35" y1="68" x2="60" y2="68" stroke="currentColor" strokeWidth="1" />
        <defs>
          <linearGradient id="grad8" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0c4a6e" />
            <stop offset="100%" stopColor="#0284c7" />
          </linearGradient>
        </defs>
      </svg>
    )
  },
  {
    id: '9',
    title: 'Solid Acrylic Keyrings',
    category: 'Accessories',
    client: 'Astra Realty Group',
    desc: 'Fine-line reverse mechanical engraving on high-grade solid crystal acrylic blanks.',
    svgMockup: (
      <svg className="w-full h-full text-zinc-800" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="50" cy="30" r="6" stroke="currentColor" strokeWidth="2" />
        <rect x="35" y="42" width="30" height="42" rx="3" fill="url(#grad9)" />
        <polygon points="50,52 57,67 43,67" fill="none" stroke="currentColor" strokeWidth="1" />
        <defs>
          <linearGradient id="grad9" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1f2937" />
            <stop offset="100%" stopColor="#111827" />
          </linearGradient>
        </defs>
      </svg>
    )
  }
];

const CATEGORIES = ['All', 'Apparel', 'Drinkware', 'Frames', 'Accessories', 'Corporate', 'School'] as const;

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

  const filteredItems = activeFilter === 'All'
    ? ITEMS
    : ITEMS.filter(item => item.category === activeFilter);

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
                03 / Printing Gallery
              </span>
              <h1
                className="font-black text-black tracking-tighter leading-[0.9] max-w-5xl"
                style={{
                  fontFamily: 'Satoshi, system-ui, sans-serif',
                  fontSize: 'clamp(3rem, 7.5vw, 7.5rem)'
                }}
              >
                Project{' '}
                <span className="font-light italic text-black/30 font-serif">Showcase</span>
              </h1>
              <p className="text-black/50 text-lg max-w-2xl mt-8 font-medium">
                Review unedited mockups and design blueprints of custom batches delivered countrywide. Use the filters below to browse by print categories.
              </p>
            </div>
          </section>

          {/* Filters */}
          <section className="py-8 bg-black/[0.01] border-b border-black/[0.05]">
            <div className="max-w-[1440px] mx-auto px-[clamp(1.25rem,5vw,5rem)]">
              <div className="flex flex-wrap items-center gap-3">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveFilter(cat)}
                    className={`px-5 py-2 text-[0.62rem] tracking-[0.18em] uppercase font-semibold transition-all cursor-pointer ${
                      activeFilter === cat
                        ? 'bg-black text-white'
                        : 'border border-black/10 text-black/60 hover:text-black hover:border-black/35'
                    }`}
                    style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Masonry Grid */}
          <section className="py-16">
            <div className="max-w-[1440px] mx-auto px-[clamp(1.25rem,5vw,5rem)]">
              <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                <AnimatePresence mode="popLayout">
                  {filteredItems.map(item => (
                    <motion.div
                      layout
                      key={item.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.45, ease: EASE }}
                      className="border border-black/[0.08] p-6 hover:border-black/25 bg-white relative flex flex-col group cursor-pointer"
                      onClick={() => setLightboxItem(item)}
                    >
                      {/* Mockup Container */}
                      <div className="relative aspect-square w-full bg-black/[0.015] border border-black/5 mb-6 flex items-center justify-center p-12 group-hover:bg-black/[0.03] transition-colors duration-300">
                        {item.svgMockup}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-300">
                          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-black shadow-lg translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                            <Maximize2 size={15} />
                          </div>
                        </div>
                      </div>

                      <div>
                        <span className="text-[0.52rem] tracking-[0.2em] uppercase text-black/30 font-bold block mb-1">
                          {item.category}
                        </span>
                        <h3 className="font-bold text-xl text-black mb-2 tracking-tight" style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}>
                          {item.title}
                        </h3>
                        <p className="text-black/40 text-xs font-semibold">
                          Client: {item.client}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            </div>
          </section>
        </main>

        {/* Lightbox Light Modal */}
        <AnimatePresence>
          {lightboxItem && (
            <motion.div
              className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Backdrop */}
              <div
                className="absolute inset-0 bg-black/85 backdrop-blur-sm"
                onClick={() => setLightboxItem(null)}
              />

              {/* Panel */}
              <motion.div
                className="relative bg-zinc-950 border border-white/10 w-full max-w-xl overflow-hidden shadow-2xl p-6 sm:p-8 flex flex-col items-center text-center text-white"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.45, ease: EASE }}
              >
                <button
                  onClick={() => setLightboxItem(null)}
                  className="absolute top-4 right-4 w-9 h-9 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/25 transition-colors cursor-pointer"
                >
                  <X size={15} />
                </button>

                {/* Vector Showcase */}
                <div className="w-48 h-48 bg-white/5 border border-white/10 rounded-full flex items-center justify-center p-10 mb-8 mt-4 shadow-inner">
                  {lightboxItem.svgMockup}
                </div>

                <span className="text-[0.55rem] tracking-[0.25em] uppercase text-emerald-400 font-bold block mb-2">
                  {lightboxItem.category} Case Showcase
                </span>
                <h3 className="font-black text-2xl sm:text-3xl text-white tracking-tight mb-2" style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}>
                  {lightboxItem.title}
                </h3>
                <p className="text-white/40 text-xs tracking-wider uppercase font-semibold mb-6">
                  Produced for: {lightboxItem.client}
                </p>

                <p className="text-white/60 text-sm leading-relaxed max-w-md mb-8">
                  {lightboxItem.desc}
                </p>

                <button
                  onClick={() => {
                    const text = `Hello, I'd like to inquire about a project similar to "${lightboxItem.title}" (${lightboxItem.category}).`;
                    window.open(`https://wa.me/918292349048?text=${encodeURIComponent(text)}`, '_blank');
                  }}
                  className="w-full bg-white text-black py-4 text-[0.62rem] tracking-[0.22em] uppercase font-semibold hover:bg-white/88 transition-colors cursor-pointer"
                  style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}
                >
                  Request Similar Print Quote
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <Contact />
      </SmoothScroll>
    </>
  );
}
