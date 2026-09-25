
const FooterPage = () => {
  return (
    <footer className="container mx-auto mt-10 border-t border-white/10">
      <div
        className="
          mx-auto flex max-w-7xl
          flex-col items-center justify-center
          gap-3 px-5 py-5
          text-center
          sm:px-6
          md:flex-row md:justify-between
          lg:px-8
        "
      >
        {/* Logo */}
        <div className="flex items-center gap-1">
          <span className="text-xs font-black text-[#B6F000]">✚</span>

          <span className="text-lg font-bold tracking-wide text-white sm:text-xl">
            FITLOG
          </span>
        </div>

        {/* Copyright */}
        <p className="text-xs leading-5 text-gray-500 sm:text-sm">
          © 2026 FITLOG — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
};

export default FooterPage;

