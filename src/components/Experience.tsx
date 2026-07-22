'use client';

import { Check } from 'lucide-react';

interface ShowcaseItem {
  year: string;
  role: string;
  company: string;
  type: string;
  bullets: string[];
  stack: string[];
}

const GALLERY_PREVIEW: ShowcaseItem[] = [
  {
    year: 'Apparel',
    role: 'Custom Sweatshirts',
    company: 'Print Planet Signature',
    type: 'Direct-to-Film Print',
    bullets: [
      'Engineered with high-fidelity, crack-resistant DTF transfers on 360 GSM heavy cotton crewnecks.',
      'Designed with vibrant, full-color gradients that survive 50+ wash cycles without fading.',
      'Perfect for student cohorts, corporate swag, and streetwear brand starters.',
    ],
    stack: ['DTF Print', '360 GSM Cotton', 'Anti-Peel Transfer'],
  },
  {
    year: 'Drinkware',
    role: 'Insulated Bottles',
    company: 'Print Planet Drinkware',
    type: 'Laser Engraved Steel',
    bullets: [
      'Bespoke laser engraving on double-walled vacuum insulated stainless steel bottles.',
      'High-precision etching exposes the raw steel beneath, resulting in a durable, permanent logo outline.',
      'Maintains beverage temperatures: 24h cold, 12h hot. Sleek matte black powder-coat finish.',
    ],
    stack: ['Laser Engraving', 'Stainless Steel', 'Matte Finish'],
  },
  {
    year: 'Drinkware',
    role: 'Sublimation Mugs',
    company: 'Print Planet Drinkware',
    type: 'Sublimation Mug Print',
    bullets: [
      'High-gloss ceramic coffee mugs featuring crisp, photo-quality sublimation wraps.',
      'Vibrant color fidelity showing high-resolution family photos or corporate guidelines.',
      '100% microwave and dishwasher safe with a specialized scratch-resistant coating.',
    ],
    stack: ['Dye Sublimation', 'Ceramic Gloss', 'Dishwasher Safe'],
  },
  {
    year: 'Frames',
    role: 'Bespoke Photo Frames',
    company: 'Print Planet Wall Art',
    type: 'High-Res Print & Frame',
    bullets: [
      'High-res photographic printing on 250 GSM premium matte papers.',
      'Framed in durable, moisture-resistant polymer borders with anti-glare clear glass covers.',
      'Ready-to-hang frames custom cut to sizes ranging from A4 to large poster prints.',
    ],
    stack: ['Matte Art Paper', 'High-Res Inkjet', 'Premium Framing'],
  },
  {
    year: 'Accessories',
    role: 'Printed Mouse Pads',
    company: 'Print Planet Desktop',
    type: 'Full-Color Sublimation',
    bullets: [
      'High-density textile surface optimized for optical mouse sensor accuracy.',
      'Non-slip natural rubber base prevents slipping during heavy office or gaming workloads.',
      'Stitched edges resist fraying over long-term desk usage. Washable design.',
    ],
    stack: ['Textile Print', 'Natural Rubber', 'Stitched Edges'],
  },
  {
    year: 'Corporate',
    role: 'School Uniforms & IDs',
    company: 'Print Planet School Merch',
    type: 'School Merch Customization',
    bullets: [
      'Breathable, premium-stitch school uniform dress shirts, polo shirts, and trackwear.',
      'Thermal high-speed card printing for barcode and chip-enabled identification cards.',
      'Custom printed lanyards with metal clips and safety release mechanisms.',
    ],
    stack: ['Polo Embroidery', 'PVC Thermal Print', 'Ribbon Sublimation'],
  },
];

export function Experience() {
  return (
    <section className="bg-zinc-50 py-24 border-b border-zinc-100">
      <div className="max-w-[1440px] mx-auto px-[clamp(1.25rem,5vw,5rem)]">
        
        {/* Section Heading */}
        <div className="mb-16">
          <span
            className="text-[0.6rem] tracking-[0.25em] uppercase font-bold text-blue-600 block mb-3"
            style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}
          >
            03 / Product Showcase
          </span>
          <h2
            className="font-black text-zinc-950 tracking-tight leading-none"
            style={{
              fontFamily: 'Satoshi, system-ui, sans-serif',
              fontSize: 'clamp(2.2rem, 5vw, 4rem)'
            }}
          >
            Explore Our Prints
          </h2>
        </div>

        {/* Vertical Grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {GALLERY_PREVIEW.map((item, idx) => (
            <div
              key={idx}
              className="border border-zinc-200/60 bg-white p-8 shadow-xs flex flex-col justify-between"
            >
              <div>
                {/* Top details */}
                <div className="flex justify-between items-center mb-6">
                  <span className="text-[0.55rem] tracking-[0.18em] uppercase text-zinc-400 font-bold">
                    {item.year} · {item.type}
                  </span>
                  <span className="text-[0.5rem] tracking-[0.2em] uppercase text-blue-600 font-bold bg-blue-50 border border-blue-100 px-2 py-0.5">
                    {item.company}
                  </span>
                </div>

                {/* Title */}
                <h3
                  className="font-extrabold text-2xl text-zinc-950 mb-6 tracking-tight"
                  style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}
                >
                  {item.role}
                </h3>

                {/* Bullets */}
                <ul className="space-y-3.5 mb-8">
                  {item.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex gap-3 text-zinc-600 text-sm leading-relaxed font-medium">
                      <span className="w-5 h-5 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0 mt-0.5">
                        <Check size={11} className="text-blue-600" />
                      </span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tags */}
              <div className="border-t border-zinc-100 pt-5 flex flex-wrap gap-2">
                {item.stack.map((tag) => (
                  <span
                    key={tag}
                    className="bg-zinc-50 border border-zinc-200 px-2.5 py-1 text-[0.55rem] font-bold tracking-wider uppercase text-zinc-500 rounded-none"
                    style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
