'use client';

import { SmoothScroll } from '@/lib/SmoothScroll';
import { Navbar } from '@/components/Navbar';
import { Contact } from '@/components/Contact';
import { CustomCursor } from '@/components/CustomCursor';
import { CheckCircle2, Shield, Heart, Award } from 'lucide-react';

const VALUES = [
  {
    icon: <Shield className="text-black/60" size={24} />,
    title: 'Uncompromised Quality',
    desc: 'We select only premium substrates, fabrics, and inks. If it does not meet our high standards of durability and color vibrancy, it does not leave our floor.'
  },
  {
    icon: <Heart className="text-black/60" size={24} />,
    title: 'Customer-Centric Care',
    desc: 'From design layout checks to individual wrapping, we treat every custom printing order like it is our own personal project.'
  },
  {
    icon: <Award className="text-black/60" size={24} />,
    title: 'Precision Craftsmanship',
    desc: 'Whether it is vector alignment or setting laser engraving depths, our calibration process ensures extreme print resolution.'
  }
];

export default function AboutPage() {
  return (
    <>
      <CustomCursor />
      <SmoothScroll>
        <Navbar />
        <main className="bg-white min-h-screen">
          {/* Hero Section */}
          <section className="relative overflow-hidden pt-36 pb-20 border-b border-black/[0.08]">
            <div className="max-w-[1440px] mx-auto px-[clamp(1.25rem,5vw,5rem)]">
              <span className="text-[0.6rem] tracking-[0.25em] uppercase text-black/35 font-bold block mb-4">
                01 / Our Story
              </span>
              <h1
                className="font-black text-black tracking-tighter leading-[0.9] max-w-5xl mb-12"
                style={{
                  fontFamily: 'Satoshi, system-ui, sans-serif',
                  fontSize: 'clamp(3rem, 7.5vw, 7.5rem)'
                }}
              >
                Crafting impressions that{' '}
                <span className="font-light italic text-black/30 font-serif">last a lifetime</span>
              </h1>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mt-16">
                <p className="text-black/60 text-lg leading-relaxed font-medium max-w-xl">
                  Founded with a vision to redefine custom printing, Print Planet has evolved from a boutique custom print shop to a premium merchandise partner for schools, corporate businesses, and creative individuals. We combine cutting-edge print technologies with meticulous human verification to deliver outstanding printed goods.
                </p>
                <p className="text-black/60 text-lg leading-relaxed font-medium max-w-xl">
                  We believe that custom apparel, customized mugs, and photo frames are not just objects—they are physical vessels for memories, organizational pride, and brand identity. That is why we refuse to take shortcuts in fabrics, inks, or production calibration.
                </p>
              </div>
            </div>
          </section>

          {/* Mission & Vision */}
          <section className="py-24 border-b border-black/[0.08] bg-black/[0.01]">
            <div className="max-w-[1440px] mx-auto px-[clamp(1.25rem,5vw,5rem)]">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                <div>
                  <h2 className="text-xs font-bold tracking-[0.2em] uppercase text-black/30 mb-6">Our Mission</h2>
                  <p className="font-serif italic text-2xl sm:text-3xl text-black/85 leading-normal max-w-lg">
                    &ldquo;To democratize premium merchandise production by offering high-resolution custom prints with no minimum order requirements.&rdquo;
                  </p>
                </div>
                <div>
                  <h2 className="text-xs font-bold tracking-[0.2em] uppercase text-black/30 mb-6">Our Vision</h2>
                  <p className="font-serif italic text-2xl sm:text-3xl text-black/85 leading-normal max-w-lg">
                    &ldquo;To become India’s most trusted custom print platform, known for tactile quality, honest bulk pricing, and design assistance.&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Values Grid */}
          <section className="py-24 border-b border-black/[0.08]">
            <div className="max-w-[1440px] mx-auto px-[clamp(1.25rem,5vw,5rem)]">
              <h2 className="text-xs font-bold tracking-[0.2em] uppercase text-black/30 mb-16">Core Pillars</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {VALUES.map((val, idx) => (
                  <div key={idx} className="border border-black/[0.08] p-8 bg-white relative">
                    <div className="mb-6 h-12 w-12 flex items-center justify-center bg-black/5 rounded-full">
                      {val.icon}
                    </div>
                    <h3 className="font-bold text-lg text-black mb-3" style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}>
                      {val.title}
                    </h3>
                    <p className="text-black/50 text-sm leading-relaxed">
                      {val.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Quality Guarantee Section */}
          <section id="quality" className="py-24 bg-[#0A0A0A] text-white relative overflow-hidden">
            {/* Ambient orb */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50rem] h-[50rem] rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.015), transparent 70%)' }} />
            
            <div className="max-w-[1440px] mx-auto px-[clamp(1.25rem,5vw,5rem)] relative z-10">
              <span className="text-[0.6rem] tracking-[0.25em] uppercase text-white/35 font-bold block mb-4">
                02 / Quality Standards
              </span>
              <h2
                className="font-black text-white tracking-tighter leading-[0.9] max-w-4xl mb-12"
                style={{
                  fontFamily: 'Satoshi, system-ui, sans-serif',
                  fontSize: 'clamp(2.5rem, 6vw, 5.5rem)'
                }}
              >
                The Print Planet{' '}
                <span className="font-light italic text-white/40 font-serif">Triple Check</span>
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-16">
                <div className="border border-white/10 p-8 bg-white/[0.02]">
                  <span className="text-white/20 text-sm font-semibold block mb-4">01. Premium Substrates</span>
                  <h3 className="text-white font-bold text-lg mb-4" style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}>
                    Garments &amp; Blank Sourcing
                  </h3>
                  <p className="text-white/45 text-sm leading-relaxed">
                    We import and distribute heavy combed cotton and breathable polyester blends. Our mugs are selected for glazed finish consistency, and bottles are constructed of double-walled 304 food-grade stainless steel.
                  </p>
                </div>
                <div className="border border-white/10 p-8 bg-white/[0.02]">
                  <span className="text-white/20 text-sm font-semibold block mb-4">02. Design Alignment Check</span>
                  <h3 className="text-white font-bold text-lg mb-4" style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}>
                    Free Vector Inspection
                  </h3>
                  <p className="text-white/45 text-sm leading-relaxed">
                    Our pre-press technicians inspect every graphic submission. We check pixel-density ratios, format color models to CMYK, and verify print boundaries to eliminate fuzzy borders and layout mistakes.
                  </p>
                </div>
                <div className="border border-white/10 p-8 bg-white/[0.02]">
                  <span className="text-white/20 text-sm font-semibold block mb-4">03. High-Speed Wash Verification</span>
                  <h3 className="text-white font-bold text-lg mb-4" style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}>
                    Durability Assurance
                  </h3>
                  <p className="text-white/45 text-sm leading-relaxed">
                    All apparel prints (DTF transfers, Screen Print runs, and Embroidery stitching) undergo standardized stress tests. Mugs are certified for standard domestic dishwasher cycles without graphic peeling.
                  </p>
                </div>
              </div>

              {/* Banner Card */}
              <div className="border border-white/10 mt-16 p-8 lg:p-12 bg-white/[0.01] flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
                <div>
                  <h3 className="text-white font-bold text-xl mb-2" style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}>
                    100% Satisfaction Guarantee
                  </h3>
                  <p className="text-white/40 text-sm max-w-xl">
                    If there is any structural print defect or manufacturing misalignment that deviates from your approved mockup proof, we will reprint the items immediately at zero cost.
                  </p>
                </div>
                <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs tracking-wider uppercase">
                  <CheckCircle2 size={16} /> Verified Guarantee
                </div>
              </div>
            </div>
          </section>
        </main>
        <Contact />
      </SmoothScroll>
    </>
  );
}
