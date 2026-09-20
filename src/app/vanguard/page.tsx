import { LuminaInteractiveList, LuminaSlide } from "@/components/ui/lumina-interactive-list";

export default function Vanguard() {
  const slides: LuminaSlide[] = [
    { title: "RZ", description: "The first dedicated all-electric Lexus, leading the charge into the future.", media: "/LEXUS RZ 450e highres.jpg" },
    { title: "RX HYBRID", description: "The pioneer of luxury hybrids, offering powerful efficiency.", media: "/LEXUS RX highres.jpg" },
    { title: "NX HYBRID", description: "Advanced plug-in hybrid technology for a sustainable tomorrow.", media: "/LEXUS NX highres.jpg" },
    { title: "ES 350e", description: "Experience unprecedented serenity and electrified performance.", media: "/LEXUS ES 350e highres.jpg" }
  ];
  return (
    <div className="bg-black min-h-screen">
      <LuminaInteractiveList slides={slides} />
    </div>
  );
}
