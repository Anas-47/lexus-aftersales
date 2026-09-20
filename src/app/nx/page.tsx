import { RevealGroup, RevealItem } from "@/components/ui/reveal";

export default function NXPage() {
  return (
    <main>
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#050505]">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/60 z-10"></div>
          <img src="/nx-series.jpg" alt="NX Series" className="w-full h-full object-cover scale-105" />
        </div>
        <RevealGroup className="relative z-20 text-center px-4 max-w-4xl mx-auto space-y-8" delay={0.2} stagger={0.3}>
          <RevealItem><h1 className="font-serif italic text-5xl md:text-8xl tracking-tight leading-tight text-white uppercase">
            NX Series
          </h1></RevealItem>
          <RevealItem><p className="text-zinc-400 font-light uppercase tracking-[0.4em] text-sm md:text-base max-w-2xl mx-auto mt-8">
            Experience the exceptional.
          </p></RevealItem>
        </RevealGroup></section>
    </main>
  );
}
