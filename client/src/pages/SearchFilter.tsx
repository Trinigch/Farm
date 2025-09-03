import React, { useState } from "react";

const SearchFilter: React.FC = () => {
  const [filters, setFilters] = useState({
    nombre: "",
    especie: "",
    estado: "",
    diagnostico: "",
    veterinario: "",
  });

  const [results, setResults] = useState<any[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = async () => {
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.append(key, value);
    });

    const res = await fetch(`/api/search?${params.toString()}`);
    const data = await res.json();
    setResults(data);
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">🔍 Buscar Animales / Historial</h1>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <input
          name="nombre"
          value={filters.nombre}
          onChange={handleChange}
          placeholder="Nombre del animal"
          className="border p-2 rounded"
        />
        <input
          name="especie"
          value={filters.especie}
          onChange={handleChange}
          placeholder="Especie"
          className="border p-2 rounded"
        />
        <select
          name="estado"
          value={filters.estado}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="">-- Estado --</option>
          <option value="alive">Alive</option>
          <option value="deceased">Deceased</option>
          <option value="under treatment">Under Treatment</option>
        </select>
        <input
          name="diagnostico"
          value={filters.diagnostico}
          onChange={handleChange}
          placeholder="Diagnóstico"
          className="border p-2 rounded"
        />
        <input
          name="veterinario"
          value={filters.veterinario}
          onChange={handleChange}
          placeholder="Veterinario"
          className="border p-2 rounded"
        />
      </div>
      <button
        onClick={handleSearch}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Buscar
      </button>

      <div className="mt-6">
        {results.length > 0 ? (
          <table className="w-full border-collapse border">
            <thead>
              <tr>
                <th className="border p-2">Animal</th>
                <th className="border p-2">Especie</th>
                <th className="border p-2">Estado</th>
                <th className="border p-2">Fecha</th>
                <th className="border p-2">Diagnóstico</th>
                <th className="border p-2">Tratamiento</th>
                <th className="border p-2">Veterinario</th>
              </tr>
            </thead>
            <tbody>
              {results.map((row, idx) => (
                <tr key={idx}>
                  <td className="border p-2">{row.nombre}</td>
                  <td className="border p-2">{row.especie}</td>
                  <td className="border p-2">{row.estado}</td>
                  <td className="border p-2">{row.fecha || "-"}</td>
                  <td className="border p-2">{row.diagnostico || "-"}</td>
                  <td className="border p-2">{row.tratamiento || "-"}</td>
                  <td className="border p-2">{row.veterinario || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500 mt-4">No hay resultados</p>
        )}
      </div>
    </div>
  );
};

export default SearchFilter;