import img from "@/assets/banner.png";
import Link from "next/link";
import Image from "next/image";

const hero = () => {
  return (
    <div className="container mx-auto">
      <div className="relative overflow-hidden rounded-lg border border-[#252830] bg-[#14161B] ">
        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center px-6 py-8 sm:px-8 lg:px-10 lg:py-9 max-w-[650px]">
          {/* Small Title */}
          <p className="mb-3 text-[8px] sm:text-[9px] font-bold uppercase tracking-wide text-[#83A807]">
            Workout Library
          </p>

          {/* Main Heading */}
          <h1 className="max-w-[430px] text-3xl sm:text-4xl lg:text-[32px] leading-[0.9] font-black uppercase text-white">
            Train With Intent. Log Every Set.
          </h1>

          {/* Description */}
          <p className="mt-4 max-w-[470px] text-[9px] sm:text-[10px] leading-4 text-gray-400">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today&apos;s plan, and watch the week&apos;s work add up.
          </p>

          {/* Button */}
          <Link
            href="/workouts"
            className="mt-4 inline-flex w-fit items-center rounded-sm bg-[#B7E600] px-3 py-2 text-[8px] font-bold uppercase text-black transition hover:bg-[#9fc900]"
          >
            Browse Workouts
          </Link>
        </div>

        {/* Right Image */}
        <div className="absolute bottom-0 right-4 hidden h-[190px] w-[220px] sm:block lg:right-12 lg:h-[240px] lg:w-[240px]">
          <Image className="" src={img} alt="Logo" />
        </div>
      </div>
    </div>
  );
};

export default hero;
