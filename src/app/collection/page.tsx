import { ElasticGallery } from "@/components/ui/elastic-gallery";

import { RevealGroup, RevealItem } from "@/components/ui/reveal";

export default function Collection() {
  return (
    <main className="bg-[#050505] min-h-screen">
      {/* Collections Hero Section */}
      <section className="relative h-[80vh] md:h-[85vh] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/40 z-10"></div>
          <img src="/LEXUS collections hero.avif" alt="Lexus Collections" className="w-full h-full object-cover scale-105" />
        </div>
        
        <RevealGroup className="relative z-20 text-center px-6 max-w-4xl mx-auto" delay={0.2} stagger={0.2}>
          <RevealItem>
            <p className="text-xs md:text-sm font-light uppercase tracking-[0.4em] text-zinc-300 mb-6">
              Discover Your Lexus
            </p>
          </RevealItem>
          <RevealItem>
            <h1 className="text-6xl md:text-8xl font-serif italic text-white tracking-tight leading-none mb-8">Our Range</h1>
          </RevealItem>
          <RevealItem>
            <p className="text-sm md:text-base font-light text-zinc-300 max-w-2xl mx-auto leading-relaxed">
              Explore our curated portfolio of uncompromising luxury. From exhilarating sports coupes to commanding off-road SUVs, experience the absolute pinnacle of Japanese craftsmanship and relentless innovation.
            </p>
          </RevealItem>
        </RevealGroup>
      </section>

      {/* Gallery Section */}
      <section className="pt-20 pb-32">
        <ElasticGallery />
      </section>
    </main>
  );
}
