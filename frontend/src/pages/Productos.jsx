// src/pages/Productos.jsx
import React, { useEffect, useState } from "react";
import productoService from "../services/productoService";
import proveedorService from "../services/proveedorService";
import { Search, Plus, Eye } from "lucide-react";
import Swal from "sweetalert2";

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [proveedores, setProveedores] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({ nombre: "", precio: "", descripcion: "", proveedor1: "", proveedor2: "" });
  const [editId, setEditId] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await productoService.getAll();
      setProductos(data);
      const provs = await proveedorService.getAll();
      setProveedores(provs);
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "❌ No se pudieron cargar los productos o proveedores", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const productosFiltrados = productos.filter((p) =>
    `${p.nombre} ${p.precio}`.toLowerCase().includes(search.toLowerCase())
  );

  const getStockColor = (stock) => {
    if (stock > 10) return "bg-green-200 text-green-800";
    if (stock > 0) return "bg-yellow-200 text-yellow-800";
    return "bg-red-200 text-red-800";
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.nombre || !form.precio) {
      Swal.fire("Campos vacíos", "⚠️ Nombre y precio son obligatorios", "warning");
      return;
    }

    try {
      const payload = {
        nombre: form.nombre,
        precio: parseFloat(form.precio),
        descripcion: form.descripcion,
        proveedor1: form.proveedor1,
        proveedor2: form.proveedor2,
        stock: editId ? productos.find(p => p.id === editId)?.stock : 0,
      };

      if (editId) {
        await productoService.update(editId, payload);
        Swal.fire("Actualizado", "✏️ Producto actualizado con éxito", "success");
      } else {
        await productoService.create(payload);
        Swal.fire("Creado", "✅ Producto creado con éxito", "success");
      }

      setForm({ nombre: "", precio: "", descripcion: "", proveedor1: "", proveedor2: "" });
      setEditId(null);
      fetchData();
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "❌ No se pudo guardar el producto", "error");
    }
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esto",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await productoService.remove(id);
          Swal.fire("Eliminado", "🗑️ Producto eliminado", "success");
          fetchData();
        } catch (err) {
          console.error(err);
          Swal.fire("Error", "❌ No se pudo eliminar el producto", "error");
        }
      }
    });
  };

  const handleEdit = (p) => {
    setEditId(p.id);
    setForm({ 
      nombre: p.nombre || "", 
      precio: p.precio || "", 
      descripcion: p.descripcion || "", 
      proveedor1: p.proveedor1 || "", 
      proveedor2: p.proveedor2 || ""
    });
    setIsModalOpen(true);
  };

  const handleNuevo = () => {
    setForm({ nombre: "", precio: "", descripcion: "", proveedor1: "", proveedor2: "" });
    setEditId(null);
    setIsModalOpen(true);
  };

  // -------------------------------
  // FUNCIÓN PARA MOSTRAR DETALLE CON SWEET ALERT
  // -------------------------------
  const mostrarDetalleSwal = (p) => {
    Swal.fire({
      title: `<strong>${p.nombre}</strong>`,
      html: `
        <div style="display:flex; flex-direction:column; gap:12px; text-align:left;">
          <!-- Descripción -->
          <div style="border:1px solid #e5e7eb; padding:12px; border-radius:0.5rem; box-shadow:0 1px 2px rgba(0,0,0,0.05);">
            <h4 style="font-weight:600; color:#6b7280; margin-bottom:4px;">Descripción</h4>
            <p style="color:#374151;">${p.descripcion || "-"}</p>
          </div>

          <!-- Proveedores -->
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
            <div style="border:1px solid #e5e7eb; padding:12px; border-radius:0.5rem; box-shadow:0 1px 2px rgba(0,0,0,0.05);">
              <h4 style="font-weight:600; color:#6b7280; margin-bottom:4px;">Proveedor principal</h4>
              <p style="color:#374151;">${p.proveedor1 || "-"}</p>
            </div>
            <div style="border:1px solid #e5e7eb; padding:12px; border-radius:0.5rem; box-shadow:0 1px 2px rgba(0,0,0,0.05);">
              <h4 style="font-weight:600; color:#6b7280; margin-bottom:4px;">Proveedor secundario</h4>
              <p style="color:#374151;">${p.proveedor2 || "-"}</p>
            </div>
          </div>

          <!-- Stock -->
          <div style="border:1px solid #e5e7eb; padding:12px; border-radius:0.5rem; box-shadow:0 1px 2px rgba(0,0,0,0.05); display:flex; justify-content:space-between; align-items:center;">
            <h4 style="font-weight:600; color:#6b7280;">Stock</h4>
            <span style="
              padding:4px 12px; border-radius:0.375rem; font-weight:600;
              ${p.stock > 10 ? 'background-color:#bbf7d0; color:#166534;' : p.stock > 0 ? 'background-color:#fef9c3; color:#78350f;' : 'background-color:#fecaca; color:#991b1b;'}
            ">
              ${p.stock}
            </span>
          </div>
        </div>
      `,
      confirmButtonText: 'Cerrar',
      width: 400,
      customClass: {
        popup: 'rounded-3xl p-4',
        title: 'text-lg font-bold',
        confirmButton: 'bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg px-4 py-2'
      }
    });
  };

  return (
    <section className="mt-6 p-6 space-y-6">
      {/* 🔹 Card de título, búsqueda y botón */}
      <div className="bg-white rounded-2xl shadow p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h2 className="text-2xl font-semibold text-gray-800 text-center w-full md:w-auto">
          Gestión de Productos
        </h2>

        <div className="flex flex-col md:flex-row items-center gap-3 w-full md:w-auto">
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 w-full md:w-64">
            <Search className="text-gray-400 mr-2" size={18} />
            <input
              type="text"
              placeholder="Buscar producto..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent focus:outline-none text-gray-700"
            />
          </div>
          <button
            onClick={handleNuevo}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg w-full md:w-auto justify-center"
          >
            <Plus size={18} /> Nuevo Producto
          </button>
        </div>
      </div>

      {/* Grid de productos */}
      {loading ? (
        <p className="text-center py-4 text-gray-500">Cargando productos...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {productosFiltrados.map((p) => (
            <div key={p.id} className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col relative">
              <div className="w-full aspect-square bg-gray-100 flex items-center justify-center relative">
                <img
                  src={`/imagenes/${p.id}.jpg`}
                  alt={p.nombre}
                  className="w-full h-full object-cover"
                  onError={(e) => e.currentTarget.style.display = "none"}
                />
                <span className="absolute text-gray-500 font-semibold text-lg">Coming soon</span>

                <button
                  onClick={() => mostrarDetalleSwal(p)}
                  className="absolute top-2 right-2 w-8 h-8 bg-black/40 hover:bg-black text-white rounded-full flex items-center justify-center shadow-md"
                  title="Ver descripción y proveedores"
                >
                  <Eye size={16} />
                </button>
              </div>

              <div className="p-5 flex flex-col flex-grow">
                <h5 className="text-lg font-semibold mb-2 truncate">{p.nombre}</h5>
                <p className="text-gray-600 mb-1">Precio: <span className="font-medium">${p.precio}</span></p>
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getStockColor(p.stock)}`}>Stock: {p.stock}</span>
                <div className="mt-4 flex gap-2 justify-end">
                  <button onClick={() => handleEdit(p)} className="px-3 py-1 bg-amber-500 text-white rounded-lg text-sm hover:bg-amber-600 transition">Editar</button>
                  <button onClick={() => handleDelete(p.id)} className="px-3 py-1 bg-rose-600 text-white rounded-lg text-sm hover:bg-rose-700 transition">Eliminar</button>
                </div>
              </div>
            </div>
          ))}
          {productosFiltrados.length === 0 && (
            <p className="col-span-full text-center py-6 text-gray-500">No se encontraron productos</p>
          )}
        </div>
      )}

      {/* Modal crear/editar */}
      {editId !== null && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md animate-slide-in overflow-hidden p-6 space-y-3">
            <h3 className="text-xl font-semibold mb-4 text-center">{editId ? "Editar Producto" : "Nuevo Producto"}</h3>
            <form onSubmit={handleSave} className="flex flex-col gap-3">
              <input type="text" placeholder="Nombre" value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} className="border p-2 rounded shadow-sm"/>
              <input type="number" placeholder="Precio" value={form.precio} onChange={(e) => setForm({ ...form, precio: e.target.value })} className="border p-2 rounded shadow-sm"/>
              <input type="text" placeholder="Descripción" value={form.descripcion} onChange={(e) => setForm({ ...form, descripcion: e.target.value })} className="border p-2 rounded shadow-sm"/>
              
              <select value={form.proveedor1} onChange={(e) => setForm({ ...form, proveedor1: e.target.value })} className="border p-2 rounded shadow-sm">
                <option value="">Proveedor principal</option>
                {proveedores.map((prov) => <option key={prov.id} value={prov.nombre}>{prov.nombre}</option>)}
              </select>
              <select value={form.proveedor2} onChange={(e) => setForm({ ...form, proveedor2: e.target.value })} className="border p-2 rounded shadow-sm">
                <option value="">Proveedor secundario</option>
                {proveedores.map((prov) => <option key={prov.id} value={prov.nombre}>{prov.nombre}</option>)}
              </select>

              <div className="flex justify-end gap-2 mt-2">
                <button type="button" onClick={() => setEditId(null)} className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-lg">Cancelar</button>
                <button type="submit" className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg">Guardar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default Productos;
