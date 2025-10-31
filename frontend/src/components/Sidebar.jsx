// Sidebar.js
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ darkMode }) => {
  const location = useLocation();

  const linkClass = (path) => {
    const isActive = location.pathname === path;
    return `
      flex items-center gap-3 px-3 py-2 rounded transition-colors duration-200
      ${darkMode ? "text-gray-200" : "text-gray-800"}
      ${isActive ? (darkMode ? "bg-gray-700 font-bold" : "bg-gray-300 font-bold") : ""}
      hover:${darkMode ? "bg-gray-600 text-white" : "bg-gray-200 text-gray-900"}
    `;
  };

  return (
    <aside
      className={`w-72 min-h-screen flex-shrink-0 border-r transition-colors duration-300 ${
        darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-700"
      }`}
    >
      {/* Logo */}
      <div className="flex items-center gap-2 border-b px-4 py-4">
        <div className="grid h-10 w-10 place-items-center rounded-lg bg-slate-900 text-white">
          <div className="leading-none text-center">
            <div className="text-lg font-black">4</div>
            <div className="text-[9px] tracking-widest">J's</div>
          </div>
        </div>
        <div>
          <p className={`text-[10px] uppercase tracking-wider ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
            Bunker 24/7
          </p>
          <h1 className="text-sm font-semibold">Sistema de Inventario</h1>
        </div>
      </div>

      {/* Navegación */}
      <nav className="p-3">
        <p className={`mb-2 px-3 text-[10px] font-semibold uppercase tracking-widest ${darkMode ? "text-slate-400" : "text-slate-400"}`}>
          Menú
        </p>
        <ul className="space-y-1">
          <li>
            <Link to="/" className={linkClass("/")}>
              <svg className="h-5 w-5 text-slate-400 group-hover:text-brand-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M3 12l9-9 9 9"/>
                <path d="M9 21V9h6v12"/>
              </svg>
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/movimientos" className={linkClass("/movimientos")}>
              <svg className="h-5 w-5 text-slate-400 group-hover:text-brand-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M3 3h18v4H3z"/>
                <path d="M5 7v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7"/>
                <path d="M9 11h6"/>
              </svg>
              Movimientos
            </Link>
          </li>
          <li>
            <Link to="/productos" className={linkClass("/productos")}>
              <svg className="h-5 w-5 text-slate-400 group-hover:text-brand-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/>
              </svg>
              Productos
            </Link>
          </li>
          <li>
            <Link to="/proveedores" className={linkClass("/proveedores")}>
              <svg className="h-5 w-5 text-slate-400 group-hover:text-brand-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
              Proveedores
            </Link>
          </li>
          <li>
            <Link to="/usuarios" className={linkClass("/usuarios")}>
              <svg className="h-5 w-5 text-slate-400 group-hover:text-brand-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
              Usuarios
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
