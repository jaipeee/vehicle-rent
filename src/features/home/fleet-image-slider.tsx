// "use client";

// import { useRef, useState } from "react";
// import Image from "next/image";
// import { cn } from "@/lib/utils";

// interface FleetImageSliderProps {
//   images: string[]; // background slideshow photos
//   vehicleImage: string; // transparent-background PNG cutout, floats on top
//   alt: string;
// }

// export function FleetImageSlider({ images, vehicleImage, alt }: FleetImageSliderProps) {
//   const [index, setIndex] = useState(0);
//   const [hovered, setHovered] = useState(false);
//   const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

//   const handleEnter = () => {
//     setHovered(true);
//     intervalRef.current = setInterval(() => {
//       setIndex((prev) => (prev + 1) % images.length);
//     }, 1600);
//   };

//   const handleLeave = () => {
//     setHovered(false);
//     if (intervalRef.current) clearInterval(intervalRef.current);
//     intervalRef.current = null;
//     setIndex(0); // back to the single default background image
//   };

//   return (
//     <div
//       onMouseEnter={handleEnter}
//       onMouseLeave={handleLeave}
//       className="absolute inset-y-0 right-0 z-[1] w-[65%] overflow-hidden rounded-[18px]"
//       style={{ backgroundColor: "#1863E0" }}
//     >
//       {/* Background layer — cycles through `images` every 1.6s while hovered,
//           resets to the first (default) image the instant the cursor leaves. */}
//       <Image key={index} src={images[index]} alt={`${alt} background`} fill className="object-cover opacity-95" />

//       {/* Foreground vehicle cutout — pinned flush to the bottom edge, slides left on hover.
//           Anchored with bottom-0 + a manual translate-y nudge (rather than relying on
//           object-bottom alone) because stock PNG cutouts like this one often have
//           transparent padding baked into the canvas below the vehicle itself — without
//           the nudge, that invisible padding — not the car — ends up touching the true
//           bottom edge, making the car look vertically centered. Adjust translate-y-[%]
//           per asset if a different cutout has more or less built-in padding. */}
//       <div
//         className={cn(
//           "absolute inset-x-0 bottom-0 h-full translate-y-[18%] transition-transform duration-900 ease-out",
//           hovered ? "-translate-x-[58%] scale-95" : "translate-x-0 scale-100"
//         )}
//       >
//         <Image src={vehicleImage} alt={alt} fill className="object-contain object-bottom drop-shadow-2xl" />
//       </div>
//     </div>
//   );
// }