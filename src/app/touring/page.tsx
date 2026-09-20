import { LuminaInteractiveList, LuminaSlide } from "@/components/ui/lumina-interactive-list";

export default function Touring() {
  const slides: LuminaSlide[] = [
    { title: "RX", description: "The pioneer of the luxury crossover segment, refined for the modern era.", media: "/LEXUS RX highres.jpg" },
    { title: "NX", description: "A compact luxury crossover built for urban agility and intelligent design.", media: "/LEXUS NX highres.jpg" },
    { title: "TX", description: "Three rows of uncompromising luxury for the whole family.", media: "/LEXUS TX highres.jpg" },
    { title: "UX", description: "The urban explorer crossover, bold design for the city streets.", media: "/LEXUS UXh highres.jpg" }
  ];
  return (
    <div className="bg-black min-h-screen">
      <LuminaInteractiveList slides={slides} />
    </div>
  );
}
