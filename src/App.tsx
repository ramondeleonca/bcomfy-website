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
  });

  gsap.ticker.lagSmoothing(0)

  // * Intro section
  // Renderer ref
  const introRendererRef = useRef<HTMLCanvasElement>(null);

  // Load all images
  const [introImages,  setIntroImages] = useState<HTMLImageElement[]>([]);
  useMemo(() => {preloadImages(Array(30).fill(0).map((_, i) => `/animations/sequence/intro/${(i + 1).toString().padStart(4, "0")}.png`)).then(loaded => {setIntroImages(loaded); introRendererRef.current?.getContext("2d")?.drawImage(loaded[0], 0, 0)})}, []);

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

      for (const [index, image] of introImages.entries()) tl1.call(() => {
        const canvasCtx = introRendererRef.current?.getContext("2d");
        canvasCtx?.clearRect(0, 0, introRendererRef.current?.width ?? 0, introRendererRef.current?.height ?? 0);
        canvasCtx?.drawImage(image, 0, 0);
      }, [], index);
    });

    return () => ctx.revert();
  }, [introImages]);
  
  // * Eco friendly section
  const recycledRendererRef = useRef<HTMLCanvasElement>(null);

  // Load recycled images
  const [reycledImages,  setReycledImages] = useState<HTMLImageElement[]>([]);
  useMemo(() => {preloadImages(Array(60).fill(0).map((_, i) => `/animations/sequence/recycled/${(i + 1).toString().padStart(4, "0")}.png`)).then(loaded => {setReycledImages(loaded); recycledRendererRef.current?.getContext("2d")?.drawImage(loaded[0], 0, 0)})}, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl1 = gsap.timeline({
        scrollTrigger: {
          trigger: ".eco",
          scrub: 1,
          // markers: true,
          start: "50% bottom",
          end: "bottom center",
          // pin: true
        }
      });

      tl1.fromTo(".eco-1", {y: 100, opacity: 0, scale: 0}, {y: 0, opacity: 1, scale: 1, ease: "back.out"});
      tl1.fromTo(".eco-2", {y: 100, opacity: 0, scale: 0}, {y: 0, opacity: 1, scale: 1, ease: "back.out"});

      const tl2 = gsap.timeline({
        scrollTrigger: {
          trigger: ".eco-render",
          scrub: 1,
          markers: false,
          start: "33% bottom",
          end: "bottom bottom"
        }
      });

      tl2.fromTo(".eco-text", {scale: 0, y: 0, opacity: 0}, {scale: 1, y: -200, opacity: 1, duration: 2, ease: "back.out"});

      for (const [index, image] of reycledImages.entries()) tl2.call(() => {
        const canvasCtx = recycledRendererRef.current?.getContext("2d");
        canvasCtx?.clearRect(0, 0, recycledRendererRef.current?.width ?? 0, recycledRendererRef.current?.height ?? 0);
        canvasCtx?.drawImage(image, 0, 0);
      }, [], index);
    });
    return () => ctx.revert();
  }, [reycledImages]);

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

      <div className="h-full pt-32 pb-96">
        <h1 className="components w-full text-center text-5xl text-white font-nexa font-bold">Componentes</h1>

        <div className="w-full flex flex-col items-center justify-center md:flex-row md:px-32 mt-16">
          <div className="flex flex-col w-fit items-start px-12">
            <h1 className="text-3xl md:text-7xl font-montserrat text-white mb-2 w-fit">Poderoso procesador inalámbrico <b>ESP32</b></h1>
            <p className="opacity-80 text-white w-fit mb-4">Permite hacer tareas y comunicación avanzada en un SOC compacto</p>
          </div>

          <img src="/esp32.png" alt="" className="md:w-2/4 esp32" />
        </div>
      </div>

      <div className="pb-16">
        <div className="w-full flex flex-col items-center justify-center md:flex-row md:px-32 mt-16">
          <div className="flex flex-col w-fit items-start px-12">
            <h1 className="text-3xl md:text-7xl font-montserrat text-white mb-2 w-fit">Módulo GSM para llamadas y SMS <b>SIM800L</b></h1>
            <p className="opacity-80 text-white w-fit mb-4">Pequeño tamaño, impresionante conectividad celular 2G t 3G (próximamente 4G)</p>
          </div>

          <img src="/sim800l.png" alt="" className="md:w-2/4 w-3/5 esp32" />
        </div>
      </div>

      <div className="pb-16">
        <div className="w-full flex flex-col items-center justify-center md:flex-row md:px-32 mt-16">
          <div className="flex flex-col w-fit items-start px-12">
            <h1 className="text-3xl md:text-7xl font-montserrat text-white mb-2 w-fit">Sistema de pantallas <b>Dual-OLED</b></h1>
            <p className="opacity-80 text-white w-fit mb-4">Para siempre mantenerte informado y que tengas todo el control sobre la situación ;)</p>
          </div>

          <img src="/oled.png" alt="" className="md:w-2/4 w-4/5 esp32" />
        </div>
      </div>

      <div className="w-full py-96 flex justify-center flex-col eco">
        <h1 className="ml-8 text-3xl font-rounded text-white eco-1">¡B-Comfy es eco-friendly!</h1>
        <h1 className="ml-8 text-4xl font-montserrat text-white mt-4 eco-2">¿Por qué?</h1>
      </div>

      <div className="w-full h-full flex items-center justify-center eco-render">
        <canvas ref={recycledRendererRef} className="aspect-square recycled-renderer w-4/5 absolute z-20" width={720} height={720}></canvas>
        <h1 className="absolute w-3/4 eco-text text-white text-center font-rounded text-3xl z-10">La carcasa esta hecha 100% de filamento reciclado</h1>
      </div>

      <div className="w-full flex justify-center items-center flex-col pt-24 pb-96">
        <h1 className="text-white font-rounded text-4xl text-center cambio">¿Estás listo para tener un cambio en tu vida?</h1>
        <a href="https://forms.gle/4xSjiEYa8EB2xFQF8" className="text-white text-center font-nexa font-bold registro px-8 py-4 text-2xl underline">Separa tu B-Comfy</a>
      </div>
    </div>
  )
}
