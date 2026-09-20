import { LuminaInteractiveList, LuminaSlide } from "@/components/ui/lumina-interactive-list";

export default function Executive() {
  const slides: LuminaSlide[] = [
    { title: "LS", description: "The flagship LS. A masterpiece of craftsmanship and serene comfort.", media: "/LEXUS LS500h highres.jpg" },
    { title: "ES", description: "The most popular Lexus sedan, offering unparalleled comfort and quietness.", media: "/LEXUS ES 2024 highres.jpg" },
    { title: "IS", description: "The aggressive, track-tuned luxury sport sedan.", media: "/LEXUS ISF highres.jpg" },
    { title: "GS", description: "The legendary mid-size sport sedan with a roaring legacy.", media: "/LEXUS GSF highres.jpg" }
  ];
  return (
    <div className="bg-black min-h-screen">
      <LuminaInteractiveList slides={slides} />
    </div>
  );
}
