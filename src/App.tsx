import { useEffect, useMemo, useRef, useState } from "react";
import "./index.scss";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import Lenis from "lenis";

const preloadImages = (srcArray: string[]) => {
  const promises = srcArray.map((src) => {
    return new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      img.src = src;
      img.onload = () => resolve(img);
      img.onerror = reject;
    });
  });
  return Promise.all(promises);
};

export default function App() {
  // * Scroll
  const lenis = new Lenis({
    lerp: 0.1
  });

  lenis.on('scroll', ScrollTrigger.update)

  gsap.ticker.add((time)=>{
    lenis.raf(time * 1000)
  })

  gsap.ticker.lagSmoothing(0)

  // * Intro section
  // Renderer ref
  const introRendererRef = useRef<HTMLCanvasElement>(null);

  // Load all images
  const [images,  setImages] = useState<HTMLImageElement[]>([]);
  useMemo(() => {preloadImages(Array(30).fill(0).map((_, i) => `/animations/sequence/intro/${(i + 1).toString().padStart(4, "0")}.png`)).then(loaded => {setImages(loaded); introRendererRef.current?.getContext("2d")?.drawImage(loaded[0], 0, 0)})}, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl1 = gsap.timeline({
        scrollTrigger: {
          trigger: ".intro",
          scrub: 1,
          markers: false,
          start: "top top",
          end: "bottom center"
        }
      });

      const tl2 = gsap.timeline({
        scrollTrigger: {
          trigger: ".intro",
          scrub: 1,
          markers: false,
          start: "top top",
          end: "bottom center"
        }
      });

      tl2.fromTo(".b-comfy", { opacity: 0.25, translateY: 50, scale: 0.5 }, { opacity: 1, scale: 1, translateY: 0 }, 0);
      tl2.fromTo(".be-safe", { translateY: 0 }, { translateY: -25 }, 0);
      tl2.fromTo(".renderer", { filter: "brightness(0.5)", translateY: 0 }, { filter: "brightness(1)", translateY: "25%" }, 0)

      for (const [index, image] of images.entries()) tl1.call(() => {
        const canvasCtx = introRendererRef.current?.getContext("2d");
        canvasCtx?.clearRect(0, 0, introRendererRef.current?.width ?? 0, introRendererRef.current?.height ?? 0);
        canvasCtx?.drawImage(image, 0, 0);
      }, [], index);
    });

    return () => ctx.revert();
  }, [images]);

  // * Info section
  useEffect(() => {

  }, [])

  return (
    <div className='w-full h-full bg-black intro'>
      {/* Intro section */}
      <div className="h-screen flex items-center">
        <div className="flex w-full flex-col items-center">
          <h1 className="text-6xl text-white font-nexa font-bold w-fit mb-8 be-safe">Be Safe, </h1>
          <h1 className="text-6xl text-white font-rounded w-fit b-comfy">B-Comfy</h1>
          <canvas ref={introRendererRef} width={720} height={720} className="aspect-square absolute outline-green-500 w-4/5 md:w-2/6 renderer mt-8 md:mt-0"></canvas>
        </div>
      </div>

      {/* ESP32 Section */}
      <div className="h-full pt-96 pb-96">
        <div className="w-full h-full flex flex-col items-center justify-center md:flex-row md:px-32">
          <div className="flex justify-center">
            <h1 className="text-5xl md:text-7xl font-montserrat text-white px-12 mb-4 w-fit">Poderoso procesador inalámbrico ESP32</h1>
          </div>

          <img src="/esp32.png" alt="" className="md:w-2/4 esp32" />
        </div>
      </div>
    </div>
  )
}
