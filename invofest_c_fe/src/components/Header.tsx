import { Home, TrophyIcon, Clipboard, LaptopIcon, Mic, UserCircle } from "lucide-react";
import { NavLink } from "react-router-dom";

const Header = () => {
  //const currentPath = "#";

  const menuItems = [
    { label: "Beranda", href: "/", icon: <Home size={18} /> },
    { label: "Competition", href: "/competition", icon: <TrophyIcon size={18} /> },
    { label: "Seminar", href: "/seminar", icon: <Clipboard size={18} /> },
    { label: "Workshop", href: "/workshop", icon: <LaptopIcon size={18} /> },
    { label: "Talkshow", href: "/talkshow", icon: <Mic size={18} /> },
  ];
  const activeStyle = "text-red-900";
  const defaultStyle = "text-slate-600 hover:text-red-900";

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3">

        {/* LOGO */}
        <img
          src="https://www.invofest-harkatnegeri.com/assets/nav-logo.png"
          className="h-14"
        />

        {/* MENU */}
        <div className="flex gap-2">
          {menuItems.map((item) => (
            <NavLink
              to={item.href}
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 font-medium transition-all duration-200 ${isActive ? activeStyle : defaultStyle
                }`}
            >
              {item.icon && <span className="w-5 h-5">{item.icon}</span>}
              <span>{item.label}</span>
            </NavLink>
          ))}

          <NavLink
              to="/login"
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 font-medium transition-all duration-200 ${isActive ? activeStyle : defaultStyle
                }`}
            >
              <span className="w-5 h-5">
                <UserCircle size={18} /> 
              </span>
            </NavLink>
        </div>
      </div>
    </header>
  );
};

export default Header;