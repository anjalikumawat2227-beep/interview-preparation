
import { Outlet } from "react-router";
import Navbar from "../components/Navbar.jsx";
import Sidebar from "../components/Sidebar.jsx";

const MainLayout = () => {
  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-slate-100">

      <Navbar />

      <div className="flex min-h-0 min-w-0 flex-1 flex-col md:flex-row">
        <Sidebar />

      
        <main className="min-h-0 min-w-0 flex-1 overflow-y-auto overflow-x-hidden p-3 sm:p-5">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;