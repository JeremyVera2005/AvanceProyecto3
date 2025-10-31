// Layout.js
import { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar cambia con darkMode */}
      <Sidebar darkMode={darkMode} />

      <div className="flex-1 flex flex-col">
        {/* Navbar siempre igual */}
        <Navbar onToggleDark={setDarkMode} />

        {/* Contenido de la página */}
        <main
          className={`flex-1 p-6 transition-colors duration-300 ${
            darkMode ? "bg-gray-900" : "bg-gray-100"
          }`}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
