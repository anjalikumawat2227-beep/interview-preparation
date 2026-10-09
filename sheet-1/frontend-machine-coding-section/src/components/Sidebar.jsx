
import { NavLink } from "react-router";

const Sidebar = () => {
  const linkStyles = ({ isActive }) =>
    `rounded-lg px-3 py-2 text-sm font-medium transition ${
      isActive
        ? "bg-indigo-600 text-white"
        : "text-slate-600 hover:bg-slate-200 hover:text-slate-900"
    }`;

  return (
    <aside className="w-full shrink-0 border-b border-slate-200 bg-white p-3 md:h-full md:w-52 md:border-b-0 md:border-r md:p-4">
      <nav className="flex gap-2 overflow-x-auto md:flex-col">
        <NavLink to="/" end className={linkStyles}>
          Dashboard
        </NavLink>

        <NavLink to="/questions" className={linkStyles}>
          Questions
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;