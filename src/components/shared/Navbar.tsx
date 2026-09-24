"use client";
import logo from "@/assets/logo.png";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathName = usePathname();

  const Links = (
    <>
      <li className={pathName === "/" ? "text-[#83A807]" : ""}>
        <Link href="/">Workouts</Link>
      </li>

      <li className={pathName === "/myplan" ? "text-[#83A807]" : ""}>
        <Link href="/myplan">My Plan</Link>
      </li>
    </>
  );
  return (
    <div className=" sticky top-0 z-50 h-16 bg-[#0B0D10] border-b border-[#1D2025]">
      <div className="navbar container h-16 mx-auto px-3 sm:px-5 lg:px-8">
        <div className="navbar-start">
          <div className="dropdown flex items-center gap-2">
            {/* Mobile Menu Button */}
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

            {/* Mobile Logo */}
            <Image
              className="lg:hidden h-7 sm:h-8 w-auto"
              src={logo}
              alt="Logo"
            />

            {/* Mobile Menu */}
            <ul
              tabIndex={-1}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-2 mt-20 w-52 p-2 shadow font-semibold"
            >
              {Links}
            </ul>
          </div>

          {/* Desktop Logo */}
          <div className="">
            <Link className="lg:flex hidden gap-4" href="/">
              <Image
              src={logo}
              alt="Logo"
              className="hidden lg:flex h-auto w-auto"
            />
            <h2 className="font-semibold">FITLOG</h2>
            </Link>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 font-semibold">{Links}</ul>
        </div>

        {/* Login & Sign Up */}
        <div className="navbar-end">
          <ul className="flex gap-2 sm:gap-4 content-center items-center font-semibold">
            <li className="flex items-center gap-4">
              <Link href="/myplan"> Plan</Link>
              <Link className="px-3 py-1 bg-[#83A807] rounded-full" href="/">
                0
              </Link>
            </li>

            <li className="flex items-center gap-4">
              <Link href="/"> Saved</Link>
              <Link className="px-3 py-1 bg-[#83A807] rounded-full" href="/">
                0
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
