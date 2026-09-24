"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import logo from "@/assets/logo.png";
import { usePlan } from "@/context/PlanContext";

const Navbar = () => {
  const pathName = usePathname();

  const { todaysPlan, savedWorkouts } = usePlan();

  const Links = (
    <>
      <li className={pathName === "/" ? "text-[#ccff00]" : ""}>
        <Link href="/">Workouts</Link>
      </li>

      <li className={pathName === "/myplan" ? "text-[#ccff00]" : ""}>
        <Link href="/myplan">My Plan</Link>
      </li>
    </>
  );

  return (
    <div className="sticky top-0 z-50 h-16 border-b border-[#1D2025] bg-[#0B0D10]">
      <div className="navbar container mx-auto h-16 px-3 sm:px-5 lg:px-8">
        {/* Left */}
        <div className="navbar-start">
          {/* Mobile */}
          <div className="dropdown flex items-center gap-2">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                aria-label="Menu"
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </div>

            <Image
              className="h-7 w-auto sm:h-8 lg:hidden"
              src={logo}
              alt="Logo"
            />

            <ul
              tabIndex={-1}
              className="menu menu-sm dropdown-content z-20 mt-20 w-52 rounded-box bg-base-100 p-2 font-semibold shadow"
            >
              {Links}
            </ul>
          </div>

          {/* Desktop Logo */}
          <Link className="hidden gap-4 lg:flex" href="/">
            <Image
              src={logo}
              alt="Logo"
              className="hidden h-auto w-auto lg:flex"
            />

            <h2 className="font-semibold">FITLOG</h2>
          </Link>
        </div>

        {/* Middle */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 font-semibold">{Links}</ul>
        </div>

        {/* Right */}
        <div className="navbar-end">
          <ul className="flex items-center gap-2 font-semibold sm:gap-4">
            {/* Plan */}
            <li className="flex items-center gap-2 sm:gap-4">
              <Link href="/my-plan">Plan</Link>

              <Link
                href="/my-plan"
                className="rounded-full bg-[#ccff00] px-3 py-1 text-black"
              >
                {todaysPlan.length}
              </Link>
            </li>

            {/* Saved */}
            <li className="flex items-center gap-2 sm:gap-4">
              <Link href="/my-plan">Saved</Link>

              <Link
                href="/my-plan"
                className="rounded-full border border-[#ccff00] px-3 py-1 text-[#ccff00]"
              >
                {savedWorkouts.length}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
