// components/Navbar.js
import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom"; // <-- Importa useLocation
import { Bell, Sun, Moon } from "lucide-react";

const Navbar = ({ onToggleDark }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const notifRef = useRef(null);

  const location = useLocation(); // <-- Ruta actual

  // Map de rutas a títulos
  const pageTitles = {
    "/": "Dashboard",
    "/movimientos": "Movimientos",
    "/productos": "Productos",
    "/proveedores": "Proveedores",
    "/usuarios": "Usuarios",
    // Agrega aquí otras rutas
  };

  const currentTitle = pageTitles[location.pathname] || "Sistema de Ventas";

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDarkToggle = () => {
    setDarkMode(!darkMode);
    onToggleDark(!darkMode);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <header
      className={`flex items-center justify-between border-b px-6 py-3 shadow-sm transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-800"
      }`}
    >
      <h1 className="text-lg font-bold">{currentTitle}</h1>

      <div className="flex items-center gap-4">
        {/* Notificaciones */}
        <div className="relative" ref={notifRef}>
          <button onClick={() => setShowNotifications(!showNotifications)} className="relative">
            <Bell className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-white text-xs">
              3
            </span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-64 max-h-60 overflow-y-auto rounded-lg border bg-gray-700 shadow-lg z-10">
              <ul className="divide-y divide-gray-600 text-white">
                <li className="p-2 hover:bg-gray-600">Nuevo usuario registrado</li>
                <li className="p-2 hover:bg-gray-600">Stock bajo en productos</li>
                <li className="p-2 hover:bg-gray-600">Proveedor pendiente</li>
              </ul>
            </div>
          )}
        </div>

        {/* Toggle modo oscuro */}
        <button onClick={handleDarkToggle} className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600">
          {darkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-700" />}
        </button>

        <button onClick={handleLogout} className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600">
          Logout
        </button>
      </div>
    </header>
  );
};

export default Navbar;
