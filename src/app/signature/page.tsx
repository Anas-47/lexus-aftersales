import { LuminaInteractiveList, LuminaSlide } from "@/components/ui/lumina-interactive-list";

export default function Signature() {
  const slides: LuminaSlide[] = [
    { title: "LC COUPE", description: "The flagship luxury coupe. Experience uncompromised design and performance.", media: "/LEXUS LC500 highres.jpg" },
    { title: "LS SEDAN", description: "The pinnacle of executive luxury. A sanctuary of comfort and innovation.", media: "/LEXUS LS500h highres.jpg" },
    { title: "LX SUV", description: "Unrivaled capability meets ultimate luxury in our flagship SUV.", media: "/LEXUS LX600 highres.jpeg" }
  ];
  return (
    <div className="bg-black min-h-screen">
      <LuminaInteractiveList slides={slides} />
    </div>
  );
}
