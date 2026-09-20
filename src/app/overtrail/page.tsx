import { LuminaInteractiveList, LuminaSlide } from "@/components/ui/lumina-interactive-list";

export default function Overtrail() {
  const slides: LuminaSlide[] = [
    { title: "GX", description: "The all-new GX. Sophisticated utility and unparalleled off-road capability.", media: "/LEXUS GX highres.jpg" },
    { title: "LX", description: "Conquer any terrain in absolute luxury with the flagship LX.", media: "/LEXUS LX700h overland highres.jpg" }
  ];
  return (
    <div className="bg-black min-h-screen">
      <LuminaInteractiveList slides={slides} />
    </div>
  );
}
