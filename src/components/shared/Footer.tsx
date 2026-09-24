import React from "react";

const FooterPage = () => {
  return (
    <footer className="  mt-10 container mx-auto">
      <div className="max-w-7xl mx-auto px-5 py-5 flex items-center justify-between container ">
        {/* Logo */}
        <div className="flex items-center gap-1">
          <span className="text-[#B6F000] text-xs font-black">✚</span>

          <span className="text-white text-[9px] font-bold tracking-wide">
            FITLOG
          </span>
        </div>

        {/* Copyright */}
        <p className="text-[8px] text-gray-500">
          © 2026 FITLOG — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
};

export default FooterPage;
