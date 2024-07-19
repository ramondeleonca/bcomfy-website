import { useEffect } from "react";
import "./index.scss";
import gsap from "gsap";

export default function App() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
          trigger: ".intro",
          scrub: 1,
          markers: true,
          start: "top top",
          end: "bottom center"
        }
      })
      .fromTo(".b-comfy", { opacity: 0.25, translateY: 50, scale: 0.5 }, { opacity: 1, scale: 1, translateY: 0 })
      
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className='w-full h-full bg-black intro'>
      <div className="h-full flex items-center">
        <div className="flex w-full flex-col items-center">
          <h1 className="text-6xl text-white font-nexa font-bold w-fit mb-8 be-safe">Be Safe, </h1>
          <h1 className="text-6xl text-white font-rounded w-fit b-comfy">B-Comfy</h1>
        </div>
      </div>

      <div className="h-screen"></div>
    </div>
  )
}
