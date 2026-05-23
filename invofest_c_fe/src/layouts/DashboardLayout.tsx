import { Outlet, useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

export default function DashboardLayout() {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex w-full min-h-screen bg-red-50">

      {/* Bagian Kiri (Sidebar) */}
      <div className="bg-white border-r border-gray-200 w-64 flex flex-col justify-between p-6 h-screen sticky top-0 shadow-sm">
        <div>
          {/* Bagian Logo Image */}
          <div className="mb-8 px-2 flex items-center">
            <img
              src="https://www.invofest-harkatnegeri.com/assets/nav-logo.png"
              alt="Logo INVOFEST"
              className="w-full h-auto max-w-45 object-contain"
            />
          </div>

          {/* Menu */}
          <ul className="flex flex-col gap-2 w-full">
            <li>
              <Link to="/dashboard" className="text-gray-600 hover:text-red-800 hover:bg-red-50 font-medium block px-4 py-2.5 rounded-lg transition-colors">
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/dashboard/category" className="text-gray-600 hover:text-red-800 hover:bg-red-50 font-medium block px-4 py-2.5 rounded-lg transition-colors">
                Category
              </Link>
            </li>
            <li>
              <Link to="/dashboard/pembicara" className="text-gray-600 hover:text-red-800 hover:bg-red-50 font-medium block px-4 py-2.5 rounded-lg transition-colors">
                Pembicara
              </Link>
            </li>
            <li>
              <Link to="/dashboard/event" className="text-gray-600 hover:text-red-800 hover:bg-red-50 font-medium block px-4 py-2.5 rounded-lg transition-colors">
                Event
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/biodata"
                className="text-gray-600 hover:text-red-800 hover:bg-red-50 font-medium block px-4 py-2.5 rounded-lg transition-colors"
              >
                Biodata
              </Link>
            </li>
          </ul>
        </div>

        <div>
          {/* Tombol Logout */}
          <button
            type="button"
            onClick={handleLogout}
            className="bg-red-700 text-white px-4 py-2.5 rounded-lg cursor-pointer hover:bg-red-800 w-full transition-colors shadow-sm font-medium"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Bagian Kanan (Konten Utama) */}
      <div className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
}