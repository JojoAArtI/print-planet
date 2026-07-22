'use client';

import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

interface Project {
  id: string;
  name: string;
  category: string;
  tagline: string;
  stack: readonly string[];
  year: string;
  svgIcon: React.ReactNode;
}

const PROJECTS: readonly Project[] = [
  {
    id: 'apparel',
    name: 'Custom Apparel',
    category: 'T-Shirts & Sweatshirts',
    tagline: 'Premium DTF and screen-printed hoodies, sweatshirts, and custom t-shirts. 100% combed cotton, vibrant color gradients, and long-lasting fabric prints.',
    stack: ['DTF Print', 'Screen Print', 'Embroidery'],
    year: 'Premium',
    svgIcon: (
      <svg className="w-12 h-12 text-blue-600/80" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20 30 L35 20 L50 28 L65 20 L80 30 L75 80 L25 80 Z" fill="url(#gradA)" />
        <path d="M35 20 C35 30, 65 30, 65 20" />
        <defs>
          <linearGradient id="gradA" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.15" />
          </linearGradient>
        </defs>
      </svg>
    )
  },
  {
    id: 'drinkware',
    name: 'Bespoke Drinkware',
    category: 'Mugs & Bottles',
    tagline: 'High-grade ceramic coffee mugs and double-walled insulated water bottles. Dishwasher-safe sublimation printing with crisp vector branding and photography.',
    stack: ['Sublimation', 'Laser Engrave'],
    year: 'Custom',
    svgIcon: (
      <svg className="w-12 h-12 text-indigo-600/80" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="30" y="30" width="30" height="45" rx="4" fill="url(#gradB)" />
        <path d="M60 40 C68 40, 72 45, 72 52 C72 60, 68 65, 60 65" strokeWidth="3" />
        <defs>
          <linearGradient id="gradB" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#4338ca" stopOpacity="0.15" />
          </linearGradient>
        </defs>
      </svg>
    )
  },
  {
    id: 'frames',
    name: 'Photo Frames',
    category: 'Wall Art & Gifts',
    tagline: 'High-fidelity printing on premium matte papers, framed in durable polymer borders with anti-glare glass. Keep your favorite memories visible every single day.',
    stack: ['High-Res Print', 'Bespoke Framing'],
    year: 'Exclusive',
    svgIcon: (
      <svg className="w-12 h-12 text-rose-500/80" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="25" y="20" width="50" height="60" rx="2" fill="url(#gradC)" />
        <rect x="32" y="27" width="36" height="46" fill="#000" fillOpacity="0.03" />
        <circle cx="50" cy="45" r="5" fill="currentColor" />
        <path d="M38 65 L50 53 L62 65" />
        <defs>
          <linearGradient id="gradC" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#be123c" stopOpacity="0.15" />
          </linearGradient>
        </defs>
      </svg>
    )
  },
  {
    id: 'accessories',
    name: 'Personalized Accessories',
    category: 'Keychains & Mousepads',
    tagline: 'Polished acrylic and metal photo keychains alongside heavy-duty rubber mouse pads with non-slip backing. The perfect pocket-sized and desktop personalization.',
    stack: ['Direct Print', 'Precision Cut'],
    year: 'Essential',
    svgIcon: (
      <svg className="w-12 h-12 text-blue-600/80" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="20" y="35" width="60" height="35" rx="3" fill="url(#gradD)" />
        <circle cx="70" cy="52" r="5" fill="currentColor" />
        <defs>
          <linearGradient id="gradD" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#1D4ED8" stopOpacity="0.15" />
          </linearGradient>
        </defs>
      </svg>
    )
  },
  {
    id: 'mobile-covers',
    name: 'Mobile Back Covers',
    category: 'Tech Protection',
    tagline: 'Durable, impact-resistant polycarbonate back covers customized with your pictures or designs. Scratch-resistant matte finish with precise cutouts.',
    stack: ['UV Direct Print', 'Gloss/Matte Finish'],
    year: 'Stylish',
    svgIcon: (
      <svg className="w-12 h-12 text-indigo-600/80" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="32" y="15" width="36" height="70" rx="6" fill="url(#gradE)" />
        <rect x="40" y="22" width="6" height="6" rx="1" stroke="currentColor" />
        <defs>
          <linearGradient id="gradE" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#4338ca" stopOpacity="0.15" />
          </linearGradient>
        </defs>
      </svg>
    )
  },
  {
    id: 'school-merch',
    name: 'Uniforms & ID Cards',
    category: 'School & Corporate',
    tagline: 'Accredited school uniforms, durable card lanyards, and professional barcode/chip-enabled student identification cards. Engineered for everyday durability.',
    stack: ['Thermal Print', 'Dye Sublimation', 'Embroidery'],
    year: 'Professional',
    svgIcon: (
      <svg className="w-12 h-12 text-rose-500/80" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="30" y="20" width="40" height="50" rx="1" fill="url(#gradF)" />
        <rect x="40" y="28" width="20" height="20" rx="1" fill="#000" fillOpacity="0.04" />
        <circle cx="50" cy="38" r="4" fill="currentColor" />
        <line x1="36" y1="58" x2="64" y2="58" stroke="currentColor" />
        <defs>
          <linearGradient id="gradF" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#be123c" stopOpacity="0.15" />
          </linearGradient>
        </defs>
      </svg>
    )
  }
];

export function Projects() {
  return (
    <section id="work" className="bg-white py-24 border-b border-zinc-100">
      <div className="max-w-[1440px] mx-auto px-[clamp(1.25rem,5vw,5rem)]">
        
        {/* Header */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <span
              className="text-[0.6rem] tracking-[0.25em] uppercase font-bold text-blue-600 block mb-3"
              style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}
            >
              02 / Print Categories
            </span>
            <h2
              className="font-black text-zinc-950 tracking-tight leading-none"
              style={{
                fontFamily: 'Satoshi, system-ui, sans-serif',
                fontSize: 'clamp(2.2rem, 5vw, 4rem)'
              }}
            >
              Featured Catalog
            </h2>
          </div>
          <p className="text-zinc-500 text-sm max-w-sm font-medium leading-relaxed">
            We provide specialized, high-grade printing solutions across apparel, corporate giveaways, and identification media.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((prod) => (
            <div
              key={prod.id}
              className="border border-zinc-200/80 p-8 flex flex-col justify-between h-[340px] hover:border-blue-500/35 hover:shadow-lg hover:shadow-blue-500/[0.03] transition-all duration-300 group bg-white relative"
            >
              {/* Decorative Corner Accent */}
              <div className="absolute top-0 right-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute top-0 right-0 w-px h-6 bg-blue-500/40" />
                <div className="absolute top-0 right-0 w-6 h-px bg-blue-500/40" />
              </div>

              <div>
                <div className="flex items-center justify-between mb-6">
                  {prod.svgIcon}
                  <span className="text-[0.52rem] tracking-[0.2em] uppercase text-zinc-400 font-bold">
                    {prod.year}
                  </span>
                </div>
                
                <h3 className="font-extrabold text-xl text-zinc-950 mb-2.5 tracking-tight" style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}>
                  {prod.name}
                </h3>
                
                <p className="text-zinc-500 text-xs font-semibold tracking-wider uppercase mb-3">
                  {prod.category}
                </p>

                <p className="text-zinc-500 text-sm leading-relaxed line-clamp-3">
                  {prod.tagline}
                </p>
              </div>

              <div className="border-t border-zinc-100 pt-5 flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                  {prod.stack.slice(0, 2).map((item) => (
                    <span
                      key={item}
                      className="bg-zinc-50 border border-zinc-200 px-2 py-0.5 text-[0.5rem] font-bold tracking-wider uppercase text-zinc-500"
                    >
                      {item}
                    </span>
                  ))}
                </div>
                
                <Link
                  href="/products"
                  className="flex items-center gap-1 text-[0.62rem] font-bold tracking-[0.16em] uppercase text-blue-600 group-hover:text-blue-700 transition-colors no-underline"
                  style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}
                >
                  Order Details
                  <ArrowUpRight size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
