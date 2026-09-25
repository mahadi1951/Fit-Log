import Image from "next/image";
import Link from "next/link";
import img from "@/assets/banner.png";

const Hero = () => {
  return (
    <section className="bg-[#111217] overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex flex-col lg:flex-row items-center justify-between min-h-[500px] py-12 sm:py-16 lg:py-20 gap-10">
          
          {/* Left Content */}
          <div className="relative z-10 w-full lg:w-[58%] text-center sm:text-left">
            <p className="mb-3 sm:mb-4 text-xs font-bold tracking-widest text-[#B6F000]">
              WORKOUT LIBRARY
            </p>

            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-[54px] font-black uppercase tracking-tight text-white leading-tight lg:leading-[1.1]">
              TRAIN WITH INTENT. LOG <br className="hidden sm:inline" />
              EVERY SET.
            </h1>

            <p className="mt-4 sm:mt-6 max-w-[540px] mx-auto sm:mx-0 text-sm sm:text-base leading-relaxed text-[#9CA3AF]">
              FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
              into today&apos;s plan, and watch the week&apos;s work add up.
            </p>

            <div className="mt-6 sm:mt-8">
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-md bg-[#B6F000] px-6 py-3.5 text-xs sm:text-sm font-black uppercase tracking-wide text-black transition duration-200 hover:scale-105 hover:bg-[#c8ff2e] shadow-lg shadow-[#b6f000]/10"
              >
                Browse Workouts
                <span className="ml-2 text-base">→</span>
              </Link>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative z-0 w-full max-w-[350px] sm:max-w-[450px] lg:max-w-[450px] aspect-square flex justify-center items-center lg:absolute lg:-right-10 lg:bottom-0 lg:w-[48%] xl:w-[45%]">
            <div className="relative w-full h-full min-h-[300px] sm:min-h-[400px] lg:min-h-[450px]">
              <Image
                src={img}
                alt="Workout illustration"
                fill
                priority
                className="object-contain object-center lg:object-bottom"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;