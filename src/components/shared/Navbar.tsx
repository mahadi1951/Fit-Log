"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

import logo from "@/assets/logo.png";
import { usePlan } from "@/context/PlanContext";

const Navbar = () => {
  const pathName = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { todaysPlan, savedWorkouts } = usePlan();

  const isWorkoutsActive = pathName === "/";
  const isPlanActive = pathName === "/my-plan";

  return (
    <nav className="sticky top-0 z-50 h-16 border-b border-[#1D2025] bg-[#0B0D10]">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left - Logo + Mobile Menu */}
        <div className="flex items-center gap-2">
          {/* Mobile / Tablet Menu Button */}
          <button
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-300 transition hover:bg-[#171A20] hover:text-white lg:hidden"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>

          {/* Logo */}
          <Link
            href="/"
            onClick={() => setIsMenuOpen(false)}
            className="flex items-center gap-2"
          >
            <Image
              src={logo}
              alt="FitLog Logo"
              className="h-7 w-auto sm:h-8"
              priority
            />

            <span className="hidden font-bold tracking-wide text-white sm:block">
              FITLOG
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex">
          <ul className="flex items-center gap-8 font-semibold">
            <li>
              <Link
                href="/"
                className={`transition hover:text-[#ccff00] ${
                  isWorkoutsActive ? "text-[#ccff00]" : "text-gray-300"
                }`}
              >
                Workouts
              </Link>
            </li>

            <li>
              <Link
                href="/my-plan"
                className={`transition hover:text-[#ccff00] ${
                  isPlanActive ? "text-[#ccff00]" : "text-gray-300"
                }`}
              >
                My Plan
              </Link>
            </li>
          </ul>
        </div>

        {/* Right - Plan + Saved */}
        <div className="flex items-center">
          <div className="flex items-center gap-2 text-sm font-semibold sm:gap-4 sm:text-base">
            {/* Plan */}
            <Link
              href="/my-plan"
              className="flex items-center gap-1.5 transition hover:text-[#ccff00] sm:gap-2"
            >
              <span>Plan</span>

              <span className="min-w-7 rounded-full bg-[#ccff00] px-2 py-1 text-center text-xs font-bold text-black sm:min-w-8 sm:px-2.5">
                {todaysPlan.length}
              </span>
            </Link>

            {/* Saved */}
            <Link
              href="/my-plan"
              className="flex items-center gap-1.5 transition hover:text-[#ccff00] sm:gap-2"
            >
              <span>Saved</span>

              <span className="min-w-7 rounded-full border border-gray-600 px-2 py-1 text-center text-xs text-white sm:min-w-8 sm:px-2.5">
                {savedWorkouts.length}
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile + Tablet Menu */}
      {isMenuOpen && (
        <div className="absolute left-0 top-16 w-full border-b border-[#1D2025] bg-[#0B0D10] shadow-xl lg:hidden">
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
            <ul className="flex flex-col gap-1 font-semibold">
              <li>
                <Link
                  href="/"
                  onClick={() => setIsMenuOpen(false)}
                  className={`block rounded-lg px-4 py-3 transition hover:bg-[#171A20] hover:text-[#ccff00] ${
                    isWorkoutsActive
                      ? "bg-[#171A20] text-[#ccff00]"
                      : "text-gray-300"
                  }`}
                >
                  Workouts
                </Link>
              </li>

              <li>
                <Link
                  href="/my-plan"
                  onClick={() => setIsMenuOpen(false)}
                  className={`block rounded-lg px-4 py-3 transition hover:bg-[#171A20] hover:text-[#ccff00] ${
                    isPlanActive
                      ? "bg-[#171A20] text-[#ccff00]"
                      : "text-gray-300"
                  }`}
                >
                  My Plan
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
