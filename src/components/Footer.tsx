import { TransitionLink as Link } from "@/components/TransitionLink";

export function Footer() {
  return (
    <footer className="bg-[#050505] pt-24 pb-12 border-t border-zinc-900 relative z-20">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-20">
          
          <div className="lg:col-span-1">
            <div className="text-3xl font-bold tracking-[0.4em] uppercase mb-8 transition-all duration-500 hover:[text-shadow:0_0_20px_rgba(255,255,255,0.8),0_0_40px_rgba(255,255,255,0.4)] cursor-pointer text-white">LEXUS</div>
            <p className="text-zinc-500 text-sm font-light leading-relaxed mb-6">
              Experience the absolute pinnacle of Japanese craftsmanship, electrified performance, and relentless innovation.
            </p>
          </div>

          <div className="lg:col-span-1">
            <h4 className="text-white text-xs uppercase tracking-[0.2em] mb-6">Vehicles</h4>
            <ul className="space-y-4 text-zinc-400 text-sm font-light">
              <li><Link href="/collection" className="hover:text-white transition-colors">SUVs</Link></li>
              <li><Link href="/collection" className="hover:text-white transition-colors">Sedans</Link></li>
              <li><Link href="/collection" className="hover:text-white transition-colors">Coupes</Link></li>
              <li><Link href="/collection" className="hover:text-white transition-colors">Electrified</Link></li>
              <li><Link href="/collection" className="hover:text-white transition-colors">F Performance</Link></li>
              <li><Link href="/heritage" className="hover:text-white transition-colors">Heritage</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-1">
            <h4 className="text-white text-xs uppercase tracking-[0.2em] mb-6">Shopping Tools</h4>
            <ul className="space-y-4 text-zinc-400 text-sm font-light">
              <li><a href="#" className="hover:text-white transition-colors">Build & Price</a></li>
              <li><a href="#" className="hover:text-white transition-colors">View Offers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Find a Dealer</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Search Inventory</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Request a Test Drive</a></li>
            </ul>
          </div>

          <div className="lg:col-span-1">
            <h4 className="text-white text-xs uppercase tracking-[0.2em] mb-6">Ownership</h4>
            <ul className="space-y-4 text-zinc-400 text-sm font-light">
              <li><a href="#" className="hover:text-white transition-colors">Lexus App</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Service & Maintenance</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Warranty Info</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Lexus Financial</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Recall Info</a></li>
            </ul>
          </div>

          <div className="lg:col-span-1">
            <h4 className="text-white text-xs uppercase tracking-[0.2em] mb-6">About Lexus</h4>
            <ul className="space-y-4 text-zinc-400 text-sm font-light">
              <li><a href="#" className="hover:text-white transition-colors">Lexus Philosophy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Concept Vehicles</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Motorsports</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-600">
            &copy; {new Date().getFullYear()} Lexus International. All Rights Reserved.
          </p>
          <div className="flex items-center gap-6 text-xs uppercase tracking-[0.1em] text-zinc-500 font-light">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

