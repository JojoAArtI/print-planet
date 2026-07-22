'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SmoothScroll } from '@/lib/SmoothScroll';
import { Navbar } from '@/components/Navbar';
import { Contact } from '@/components/Contact';
import { CustomCursor } from '@/components/CustomCursor';
import { ArrowUpRight, X } from 'lucide-react';

const EASE = [0.22, 1, 0.36, 1] as const;

interface Product {
  id: string;
  name: string;
  category: string;
  desc: string;
  material: string;
  printMethod: string;
  sizes: string;
  moq: string;
  details: string[];
}

const PRODUCTS: Product[] = [
  {
    id: 't-shirts',
    name: 'Premium T-Shirts',
    category: 'Apparel',
    desc: 'High-comfort casual wear printed with state-of-the-art transfer tech.',
    material: '180 GSM Combed Ring-Spun Cotton',
    printMethod: 'Direct-to-Film (DTF) / Screen Printing',
    sizes: 'S, M, L, XL, XXL, 3XL',
    moq: 'No minimum order (MOQ: 1)',
    details: [
      'Double-needle stitched sleeve and bottom hems.',
      'Pre-shrunk jersey knit with taped neck and shoulders.',
      'Breathable material suitable for promotions, team events, or casual merchandise.'
    ]
  },
  {
    id: 'sweatshirts',
    name: 'Custom Sweatshirts & Hoodies',
    category: 'Apparel',
    desc: 'Heavyweight cozy fleece sweatshirts tailored for school cohorts and streetwear brands.',
    material: '360 GSM Premium Cotton Blend Fleece',
    printMethod: 'High-density DTF Transfer / Embroidery',
    sizes: 'S, M, L, XL, XXL',
    moq: 'No minimum order (MOQ: 1)',
    details: [
      'Pouch pockets and matching drawstrings on hoodies.',
      'Anti-peel fabric texture holds vibrant color gradients over multiple wash cycles.',
      'Perfect for college reunions, corporate retreats, and brand collections.'
    ]
  },
  {
    id: 'caps',
    name: 'Customized Caps & Headwear',
    category: 'Apparel',
    desc: 'Classic structured profiles with custom embroidery to showcase your logo.',
    material: '100% Cotton Twill / Polyester Mesh back',
    printMethod: 'High-Stitch Flat or 3D Puff Embroidery',
    sizes: 'Adjustable Snapback / Metal Buckle (One Size)',
    moq: 'MOQ: 10 items',
    details: [
      'Structured 5-panel or 6-panel profiles.',
      'Breathable sweatband inserts for active comfort.',
      'Fade-resistant thread lines.'
    ]
  },
  {
    id: 'mugs',
    name: 'Sublimation Photo Mugs',
    category: 'Drinkware',
    desc: 'High-gloss ceramic coffee mugs showing crisp, edge-to-edge photo wraps.',
    material: 'A-Grade High-Gloss White Ceramic',
    printMethod: 'Dye Sublimation Full Wrap',
    sizes: '11 oz (325ml) / 15 oz (450ml)',
    moq: 'No minimum order (MOQ: 1)',
    details: [
      '100% Microwave and Dishwasher safe coating.',
      'Glossy exterior with customized interior color options.',
      'Packaged in individual windowed safe-delivery boxes.'
    ]
  },
  {
    id: 'bottles',
    name: 'Insulated Water Bottles',
    category: 'Drinkware',
    desc: 'Laser-etched thermal bottles built for temperature endurance and sleek aesthetics.',
    material: '304 Food-Grade Stainless Steel (BPA Free)',
    printMethod: 'Precision Laser Engraving / Sublimation Wrap',
    sizes: '500ml / 750ml',
    moq: 'No minimum order (MOQ: 1)',
    details: [
      'Double-walled vacuum insulation: 24h cold, 12h hot.',
      'Leakproof loop cap lid with matte powder finish.',
      'Laser etching exposes high-contrast steel underneath for permanent branding.'
    ]
  },
  {
    id: 'photo-frames',
    name: 'Bespoke Photo Frames',
    category: 'Wall Art',
    desc: 'High-resolution photographic printing encased in premium moisture-resistant borders.',
    material: 'Fine Art Matte Paper & High-Density Polymer Frames',
    printMethod: 'High-End Pigment Inkjet Printing',
    sizes: 'A4, A3, 12"x18", 18"x24" Custom sizes available',
    moq: 'No minimum order (MOQ: 1)',
    details: [
      'Anti-glare crystal clear glass face cover.',
      'Sturdy cardboard backing board with versatile hanging hooks.',
      'Individually bubble-wrapped for safe transit.'
    ]
  },
  {
    id: 'mouse-pads',
    name: 'Custom Printed Mouse Pads',
    category: 'Desktop',
    desc: 'Smooth textile mouse surfaces optimized for office desk setups and gaming accuracy.',
    material: 'Polyester Fabric Surface & Anti-slip Rubber Base',
    printMethod: 'Full-Color Sublimation Print',
    sizes: 'Standard (22cm x 18cm) / Desk Mat (90cm x 40cm)',
    moq: 'No minimum order (MOQ: 1)',
    details: [
      'Locked-stitch borders prevent edge fraying.',
      'Optimized surface glide for high-DPI optical mouse sensors.',
      'Flexible, rollable natural rubber material.'
    ]
  },
  {
    id: 'keychains',
    name: 'Engraved Keychains',
    category: 'Accessories',
    desc: 'Premium branded key rings in acrylic, wood, or metal for marketing handouts.',
    material: 'Stainless Steel / Birchwood / Hardened Acrylic',
    printMethod: 'Laser Cutting & Fine-Line Engraving',
    sizes: 'Custom Shapes (Max 5cm x 5cm)',
    moq: 'MOQ: 50 items',
    details: [
      'Attached with highly durable metal split rings.',
      'Precision cut templates for unique logo outlines.',
      'Ideal for real estate handouts, auto dealers, and promo giveaways.'
    ]
  },
  {
    id: 'mobile-covers',
    name: 'Custom Mobile Covers',
    category: 'Tech Accessories',
    desc: 'Robust cases with scratch-resistant back wraps showing vibrant colors.',
    material: 'Shock-Absorbent TPU Edges & Glossy Polycarbonate Back',
    printMethod: 'Direct UV Printing on Backplate',
    sizes: 'Available for iPhone, Samsung, OnePlus, Xiaomi models',
    moq: 'No minimum order (MOQ: 1)',
    details: [
      'Tactile button covers and precise port cutouts.',
      'Slightly raised bezels protect front screens and camera lenses.',
      'Scratch-resistant satin protective layer.'
    ]
  },
  {
    id: 'uniforms',
    name: 'School & Corporate Uniforms',
    category: 'Corporate',
    desc: 'Comfortable, breathable dress wear made for daily campus and office shifts.',
    material: 'Cotton-Polyester Blend Oxford & Twill Fabrics',
    printMethod: 'Machine Embroidery / Screen Printing',
    sizes: 'Standard kid sizes & adult S to 4XL',
    moq: 'MOQ: 20 items',
    details: [
      'Reinforced seams for maximum durability during active days.',
      'Breathable, moisture-wicking weave properties.',
      'Bespoke school logo embroidery placement.'
    ]
  },
  {
    id: 'id-cards',
    name: 'Student & Employee ID Cards',
    category: 'Corporate',
    desc: 'High-speed thermally printed identification cards for security checks.',
    material: 'High-Quality Solid PVC Plastic',
    printMethod: 'Thermal Dye Sublimation Transfer',
    sizes: 'Standard CR80 size (85.6mm x 54mm)',
    moq: 'MOQ: 10 items',
    details: [
      'Compatible with magnetic strips, RFID chips, or barcode prints.',
      'Fade-proof gloss laminate layer prevents face scratches.',
      'Available in vertical or horizontal layout cards.'
    ]
  },
  {
    id: 'lanyards',
    name: 'Custom Printed Lanyards',
    category: 'Corporate',
    desc: 'Silky smooth neck lanyards fitted with swivel hook attachments.',
    material: 'Premium Satin Polyester Ribbon',
    printMethod: 'Double-Sided Dye Sublimation',
    sizes: 'Width: 15mm / 20mm, Length: 90cm standard',
    moq: 'MOQ: 50 items',
    details: [
      'Safety breakaway plastic clasps included.',
      'High-durability metal lobster claw attachment clips.',
      'Edge-to-edge full-color sublimation artwork.'
    ]
  }
];

export default function ProductsPage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const openWhatsApp = (productName: string) => {
    const text = `Hello Print Planet, I would like to request a custom printing quote for the product: "${productName}".`;
    window.open(`https://wa.me/918292349048?text=${encodeURIComponent(text)}`, '_blank');
  };

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
                02 / Product Catalog
              </span>
              <h1
                className="font-black text-black tracking-tighter leading-[0.9] max-w-5xl"
                style={{
                  fontFamily: 'Satoshi, system-ui, sans-serif',
                  fontSize: 'clamp(3rem, 7.5vw, 7.5rem)'
                }}
              >
                Our Printing{' '}
                <span className="font-light italic text-black/30 font-serif">Capabilities</span>
              </h1>
              <p className="text-black/50 text-lg max-w-2xl mt-8 font-medium">
                Explore our collection of premium customized products. Every item is printed under strict quality parameters with optional digital layout proofing.
              </p>
            </div>
          </section>

          {/* Catalog Grid */}
          <section className="py-16">
            <div className="max-w-[1440px] mx-auto px-[clamp(1.25rem,5vw,5rem)]">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {PRODUCTS.map((prod) => (
                  <div
                    key={prod.id}
                    className="border border-black/[0.08] p-8 flex flex-col justify-between h-[320px] hover:border-black/30 hover:bg-black/[0.01] transition-all duration-300 group cursor-pointer"
                    onClick={() => setSelectedProduct(prod)}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <span className="text-[0.55rem] tracking-[0.2em] uppercase text-black/30 font-bold">
                          {prod.category}
                        </span>
                        <div className="w-8 h-8 rounded-full border border-black/5 flex items-center justify-center text-black/20 group-hover:text-black group-hover:border-black/25 transition-colors">
                          <ArrowUpRight size={14} />
                        </div>
                      </div>
                      
                      <h3 className="font-black text-2xl text-black mb-3 tracking-tight" style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}>
                        {prod.name}
                      </h3>
                      <p className="text-black/50 text-sm leading-relaxed line-clamp-3">
                        {prod.desc}
                      </p>
                    </div>

                    <div className="border-t border-black/5 pt-4 flex items-center justify-between">
                      <span className="text-[0.6rem] font-bold uppercase tracking-wider text-black/45">
                        {prod.printMethod.split('/')[0]}
                      </span>
                      <span className="text-[0.55rem] uppercase tracking-wider text-black/30">
                        {prod.moq}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>

        {/* Product Modal */}
        <AnimatePresence>
          {selectedProduct && (
            <motion.div
              className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Backdrop */}
              <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={() => setSelectedProduct(null)}
              />

              {/* Panel */}
              <motion.div
                className="relative bg-white border border-black/10 w-full max-w-2xl overflow-hidden shadow-2xl rounded-none"
                initial={{ scale: 0.95, opacity: 0, y: 16 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 16 }}
                transition={{ duration: 0.45, ease: EASE }}
              >
                {/* Header */}
                <div className="flex items-start justify-between p-6 sm:p-8 border-b border-black/[0.06]">
                  <div>
                    <span className="text-[0.55rem] tracking-[0.2em] uppercase text-black/30 font-bold block mb-1">
                      {selectedProduct.category}
                    </span>
                    <h3 className="font-black text-2xl sm:text-3xl text-black tracking-tight" style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}>
                      {selectedProduct.name}
                    </h3>
                  </div>
                  <button
                    onClick={() => setSelectedProduct(null)}
                    className="w-9 h-9 border border-black/10 flex items-center justify-center text-black/30 hover:text-black hover:border-black/25 transition-colors cursor-pointer"
                  >
                    <X size={15} />
                  </button>
                </div>

                {/* Body Specs */}
                <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
                  <div className="grid grid-cols-2 gap-x-6 gap-y-4 text-sm">
                    <div>
                      <span className="text-[0.55rem] tracking-[0.16em] uppercase text-black/30 block mb-1 font-bold">
                        Base Material
                      </span>
                      <span className="font-semibold text-black/80">{selectedProduct.material}</span>
                    </div>
                    <div>
                      <span className="text-[0.55rem] tracking-[0.16em] uppercase text-black/30 block mb-1 font-bold">
                        Primary Print Tech
                      </span>
                      <span className="font-semibold text-black/80">{selectedProduct.printMethod}</span>
                    </div>
                    <div>
                      <span className="text-[0.55rem] tracking-[0.16em] uppercase text-black/30 block mb-1 font-bold">
                        Sizes / Volumes
                      </span>
                      <span className="font-semibold text-black/80">{selectedProduct.sizes}</span>
                    </div>
                    <div>
                      <span className="text-[0.55rem] tracking-[0.16em] uppercase text-black/30 block mb-1 font-bold">
                        Order Requirement
                      </span>
                      <span className="font-semibold text-emerald-600 font-bold">{selectedProduct.moq}</span>
                    </div>
                  </div>

                  <div className="border-t border-black/[0.06] pt-6">
                    <span className="text-[0.55rem] tracking-[0.16em] uppercase text-black/30 block mb-3 font-bold">
                      Key Specifications
                    </span>
                    <ul className="space-y-2.5">
                      {selectedProduct.details.map((det, idx) => (
                        <li key={idx} className="flex gap-3 text-sm text-black/60 leading-relaxed font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-black/25 shrink-0 mt-2" />
                          {det}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="p-6 sm:p-8 border-t border-black/[0.06] flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => openWhatsApp(selectedProduct.name)}
                    className="flex-1 bg-black text-white py-4 text-center text-[0.62rem] tracking-[0.22em] uppercase font-semibold hover:bg-black/85 transition-colors cursor-pointer"
                    style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}
                  >
                    WhatsApp Quote Request
                  </button>
                  <button
                    onClick={() => {
                      setSelectedProduct(null);
                      // Trigger contact modal via window event
                      window.dispatchEvent(new CustomEvent('open-contact-modal'));
                    }}
                    className="border border-black/15 text-black hover:border-black/30 hover:bg-black/[0.02] py-4 px-6 text-center text-[0.62rem] tracking-[0.22em] uppercase font-semibold transition-colors cursor-pointer"
                    style={{ fontFamily: 'Satoshi, system-ui, sans-serif' }}
                  >
                    Email Inquiry Form
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <Contact />
      </SmoothScroll>
    </>
  );
}
