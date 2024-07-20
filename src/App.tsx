import { useEffect, useMemo, useRef, useState } from "react";
import "./index.scss";
import gsap from "gsap";

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
  // Renderer ref
  const introRendererRef = useRef<HTMLCanvasElement>(null);

  // Load all images
  const [images,  setImages] = useState<HTMLImageElement[]>([]);
  useMemo(() => {preloadImages(Array(30).fill(0).map((_, i) => `/animations/sequence/intro/${(i + 1).toString().padStart(4, "0")}.png`)).then(loaded => {setImages(loaded); introRendererRef.current?.getContext("2d")?.drawImage(loaded[0], 0, 0)})}, []);

  useEffect(() => {
    console.log(images);
  }, [images]);

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
      tl2.fromTo(".renderer", { filter: "brightness(0.5)", translateY: 0 }, { filter: "brightness(1)", translateY: "25%" }, 0)

      for (const [index, image] of images.entries()) tl1.call(() => {
        const canvasCtx = introRendererRef.current?.getContext("2d");
        canvasCtx?.clearRect(0, 0, introRendererRef.current?.width ?? 0, introRendererRef.current?.height ?? 0);
        canvasCtx?.drawImage(image, 0, 0);
      }, [], index);
    });

    return () => ctx.revert();
  }, [images]);

  return (
    <div className='w-full h-full bg-black intro'>
      <div className="h-full flex items-center">
        <div className="flex w-full flex-col items-center">
          <h1 className="text-6xl text-white font-nexa font-bold w-fit mb-8 be-safe">Be Safe, </h1>
          <h1 className="text-6xl text-white font-rounded w-fit b-comfy">B-Comfy</h1>
          <canvas ref={introRendererRef} width={720} height={720} className="aspect-square absolute outline-green-500 w-4/5 renderer mt-8"></canvas>
        </div>
      </div>

      <div className="h-screen"></div>
    </div>
  )
}
