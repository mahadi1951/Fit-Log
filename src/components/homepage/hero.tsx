import Image from "next/image";
import Link from "next/link";
import img from "@/assets/banner.png";

const Hero = () => {
  return (
    <section className="overflow-hidden bg-[#111217]">
      <div className="container mx-auto px-5 sm:px-8 lg:px-10">
        <div
          className="
            relative flex min-h-[620px] flex-col justify-center
            py-12
            sm:min-h-[680px] sm:py-16
            md:min-h-[700px]
            lg:min-h-[620px] lg:flex-row lg:items-center lg:py-8
          "
        >
          {/* Left Content */}
          <div
            className="
              relative z-10 w-full
              lg:w-[58%]
            "
          >
            <p
              className="
                mb-4 text-[11px] font-bold tracking-[2px] text-[#B6F000]
                sm:mb-5 sm:text-xs
              "
            >
              WORKOUT LIBRARY
            </p>

            <h1
              className="
                max-w-[700px]
                text-4xl font-black uppercase leading-[0.95] tracking-[-1px] text-white
                sm:text-5xl
                md:text-6xl
                lg:text-[54px] lg:tracking-[-2px]
              "
            >
              TRAIN WITH INTENT.
              <br />
              LOG EVERY SET.
            </h1>

            <p
              className="
                mt-5 max-w-[540px]
                text-sm leading-6 text-[#9CA3AF]
                sm:mt-6 sm:text-base
              "
            >
              FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
              into today&apos;s plan, and watch the week&apos;s work add up.
            </p>

            <Link
              href="#library"
              className="
                mt-7 inline-flex items-center justify-center
                rounded-md bg-[#B6F000]
                px-6 py-3
                text-xs font-black uppercase tracking-wide text-black
                transition duration-200
                hover:scale-105 hover:bg-[#c8ff2e]
                sm:mt-8
              "
            >
              Browse Workouts
              <span className="ml-2 text-base">→</span>
            </Link>
          </div>

          {/* Workout Image */}
          <div
            className="
              pointer-events-none relative mx-auto mt-8
              h-[280px] w-[280px]
              sm:mt-10 sm:h-[340px] sm:w-[340px]
              md:h-[400px] md:w-[400px]
              lg:absolute lg:right-[-30px] lg:bottom-0
              lg:mx-0 lg:mt-0 lg:h-[470px] lg:w-[470px]
              xl:right-[-10px] xl:h-[500px] xl:w-[500px]
            "
          >
            <Image
              src={img}
              alt="Workout illustration"
              fill
              priority
              sizes="
                (max-width: 640px) 280px,
                (max-width: 768px) 400px,
                (max-width: 1024px) 470px,
                500px
              "
              className="object-contain object-bottom"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
