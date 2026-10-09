
const Navbar = () => {
  return (
    <header className="z-10 flex h-16 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 shadow-sm sm:px-6">
      <h1 className="text-lg font-bold tracking-tight text-slate-800 sm:text-xl">
        Interview Prep
      </h1>

      <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700 sm:text-sm">
        Question Tracker
      </span>
    </header>
  );
};

export default Navbar;