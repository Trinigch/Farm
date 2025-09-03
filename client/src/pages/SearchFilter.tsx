import { useState } from "react";
import {
  FormContainer,
  Field,
  Label,
  Input,
  Button,
  AnimalCard,
} from "../components/AnimalRecordStyle";

type SearchResult = {
  animal_id: number;
  nombre: string;
  especie: string;
  estado: string;
  fecha?: string;
  diagnostico?: string;
  tratamiento?: string;
  veterinario?: string;
};

export default function SearchFilter() {
  const [filters, setFilters] = useState({
    nombre: "",
    especie: "",
    estado: "",
    diagnostico: "",
    veterinario: "",
  });

  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = async () => {
    setLoading(true);
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.append(key, value);
    });

    try {
      const res = await fetch(`${API_URL}/api/search?${params.toString()}`);
      if (!res.ok) throw new Error("Error al buscar");
      const data = await res.json();
      setResults(data);
    } catch (err: any) {
      alert(err.message || "Error fetching data");
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormContainer>
      <h1>🔍 Buscar Animales / Historial</h1>

      {/* filtros */}
      <AnimalCard>
        <Field>
          <Label>Nombre</Label>
          <Input
            name="nombre"
            value={filters.nombre}
            onChange={handleChange}
            placeholder="Nombre del animal"
          />
        </Field>

        <Field>
          <Label>Especie</Label>
          <Input
            name="especie"
            value={filters.especie}
            onChange={handleChange}
            placeholder="Ej: Oveja"
          />
        </Field>

        <Field>
          <Label>Estado</Label>
          <select
            name="estado"
            value={filters.estado}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          >
            <option value="">-- Estado --</option>
            <option value="alive">Alive</option>
            <option value="deceased">Deceased</option>
            <option value="under treatment">Under Treatment</option>
          </select>
        </Field>

        <Field>
          <Label>Diagnóstico</Label>
          <Input
            name="diagnostico"
            value={filters.diagnostico}
            onChange={handleChange}
            placeholder="Ej: Neumonía"
          />
        </Field>

        <Field>
          <Label>Veterinario</Label>
          <Input
            name="veterinario"
            value={filters.veterinario}
            onChange={handleChange}
            placeholder="Ej: Dr. López"
          />
        </Field>

        <Button type="button" onClick={handleSearch} disabled={loading}>
          {loading ? "Buscando..." : "Buscar"}
        </Button>
      </AnimalCard>

      {/* resultados */}
      {results.length > 0 && (
        <AnimalCard>
          <h3>Resultados</h3>
          {results.map((row) => (
            <div
              key={`${row.animal_id}-${row.fecha || "nofecha"}`}
              style={{
                borderBottom: "1px solid #ccc",
                margin: "8px 0",
                paddingBottom: "4px",
              }}
            >
              <p>
                <strong>Animal:</strong> {row.nombre} ({row.especie})
              </p>
              <p>
                <strong>Estado:</strong> {row.estado}
              </p>
              <p>
                <strong>Fecha:</strong>{" "}
                {row.fecha ? new Date(row.fecha).toLocaleDateString() : "—"}
              </p>
              <p>
                <strong>Diagnóstico:</strong> {row.diagnostico || "—"}
              </p>
              <p>
                <strong>Tratamiento:</strong> {row.tratamiento || "—"}
              </p>
              <p>
                <strong>Veterinario:</strong> {row.veterinario || "—"}
              </p>
            </div>
          ))}
        </AnimalCard>
      )}

      {results.length === 0 && !loading && (
        <p style={{ marginTop: "1rem", color: "#666" }}>
          No hay resultados
        </p>
      )}
    </FormContainer>
  );
}
