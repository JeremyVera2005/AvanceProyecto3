// App.js
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";


import Layout from "./components/Layout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Usuarios from "./pages/Usuarios";
import Productos from "./pages/Productos";
import Proveedores from "./pages/Proveedores";
import Movimientos from "./pages/Movimientos";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  // Estado global de dark mode
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("theme") === "dark"
  );

  // Guardar el tema en localStorage y aplicar clase al <html>
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <BrowserRouter>
      <Routes>
        {/* Login sin layout */}
        <Route path="/login" element={<Login />} />

        {/* Rutas protegidas */}
        <Route element={<ProtectedRoute />}>
          <Route
            path="/"
            element={
              <Layout darkMode={darkMode} setDarkMode={setDarkMode}>
                <Dashboard />
              </Layout>
            }
          />
          <Route
            path="/usuarios"
            element={
              <Layout darkMode={darkMode} setDarkMode={setDarkMode}>
                <Usuarios />
              </Layout>
            }
          />
          <Route
            path="/productos"
            element={
              <Layout darkMode={darkMode} setDarkMode={setDarkMode}>
                <Productos />
              </Layout>
            }
          />
          <Route
            path="/proveedores"
            element={
              <Layout darkMode={darkMode} setDarkMode={setDarkMode}>
                <Proveedores />
              </Layout>
            }
          />
          <Route
            path="/movimientos"
            element={
              <Layout darkMode={darkMode} setDarkMode={setDarkMode}>
                <Movimientos />
              </Layout>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
