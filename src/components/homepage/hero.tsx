import Image from "next/image";
import Link from "next/link";
import img from "@/assets/banner.png";

const Hero = () => {
  return (
    <section className="bg-[#111217]">
      <div className="container mx-auto px-5 sm:px-8 lg:px-10">
        <div
          className="relative flex min-h-[520px] items-center overflow-hidden
            sm:min-h-[580px] sm:py-20 lg\:min-h-\[620px\] lg:py-3"
        >
          {/* Left Content */}
          <div className="relative z-10 w-full lg:w-[58%]">
            <p className="mb-5 text-[11px] font-bold tracking-wide text-[#B6F000] sm:text-xs">
              WORKOUT LIBRARY
            </p>

            <h1
              className="max-w-[700px] text-4xl font-black uppercase  text-white md:text-6xl sm:text-5xl lg:text-[54px] lg:tracking-[-2px]"  
            >
              TRAIN WITH INTENT. LOG <br />
              EVERY SET.
            </h1>

            <p
              className="  mt-6 max-w-[540px] text-sm leading-6  sm:text-base
                text-[#9CA3AF]
               
               
                
               
                
              "
            >
              FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
              into today&apos;s plan, and watch the week&apos;s work add up.
            </p>

            <Link
              href="/"
              className="  mt-8 inline-flex items-center justify-center rounded-md bg-[#B6F000] px-6 py-3 text-xs font-black uppercase tracking-wide text-black transition duration-200 hover:scale-105 hover:bg-[#c8ff2e]"
            >
              Browse Workouts
              <span className="ml-2 text-base">→</span>
            </Link>
          </div>

          {/* Right Image */}
          <div
            className="pointer-events-none absolute -right-26 bottom-25 hidden h-[500px] w-[500px] lg:block xl:-right-5 xl:h-[460px] xl:w-[460px]
            "
          >
            <Image
              src={img}
              alt="Workout illustration"
              fill
              priority
              className="object-contain object-bottom"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
