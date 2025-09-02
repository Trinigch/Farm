import { useState} from "react";
import {
  FormContainer,
  Field,
  Label,
  Input,
  Button,
  AnimalCard,
} from "../components/AnimalRecordStyle";
import { Animal } from "./../interfaces/models";

type Historial = {
  id: number;
  animal_id: number;
  fecha: string;
  diagnostico: string;
  tratamiento: string;
  veterinario: string;
  notas: string;
};

export default function MedicalHistory() {
  const [id, setId] = useState("");
  const [animal, setAnimal] = useState<Animal | null>(null);
  const [loading, setLoading] = useState(false);
  const [historial, setHistorial] = useState<Historial[]>([]);
  const [nuevoRegistro, setNuevoRegistro] = useState({
    fecha: "",
    diagnostico: "",
    tratamiento: "",
    veterinario: "",
    notas: "",
  });

  const API_URL = import.meta.env.VITE_API_URL;

  // Buscar animal por ID
  const handleSearch = async () => {
    if (!id) return alert("Please enter a valid ID");
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/animals/${id}`);
      if (!res.ok) throw new Error("Animal not found");
      const data = await res.json();
      setAnimal(data);

      // cargar historial del animal
      const histRes = await fetch(`${API_URL}/api/historial/${id}`);
      const histData = await histRes.json();
      setHistorial(histData);
    } catch (err: any) {
      alert(err.message || "Error searching");
      setAnimal(null);
      setHistorial([]);
    } finally {
      setLoading(false);
    }
  };

  // Guardar nuevo historial
  const handleSaveHistorial = async () => {
    if (!animal) return;
    try {
      const res = await fetch(`${API_URL}/api/historial`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ animal_id: animal.id, ...nuevoRegistro }),
      });
      if (!res.ok) throw new Error("Error saving medical record");
      alert("Medical record saved successfully!");

      // actualizar lista en pantalla
      const histRes = await fetch(`${API_URL}/api/historial/${animal.id}`);
      const histData = await histRes.json();
      setHistorial(histData);

      // reset form
      setNuevoRegistro({
        fecha: "",
        diagnostico: "",
        tratamiento: "",
        veterinario: "",
        notas: "",
      });
    } catch (err: any) {
      alert(err.message || "Error saving medical record");
    }
  };

  return (
    <FormContainer>
      {/* Buscar animal */}
      <Field>
        <Label>Animal ID</Label>
        <Input
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="Ex: 15"
        />
      </Field>
      <Button type="button" onClick={handleSearch} disabled={loading}>
        {loading ? "Searching..." : "Search"}
      </Button>

      {/* Info del animal */}
      {animal && (
        <AnimalCard>
          <p>
            <strong>Name:</strong> {animal.nombre}
          </p>
          <p>
            <strong>Species:</strong> {animal.especie}
          </p>
          <p>
            <strong>Date of Birth:</strong>{" "}
            {animal.fecha_nacimiento
              ? new Date(animal.fecha_nacimiento).toLocaleDateString()
              : "N/A"}
          </p>
          <p>
            <strong>Status:</strong> {animal.estado}
          </p>
        </AnimalCard>
      )}

      {/* Formulario para nuevo historial */}
      {animal && (
        <AnimalCard>
          <h3>Add Medical Record</h3>
          <Field>
            <Label>Date</Label>
            <Input
              type="date"
              value={nuevoRegistro.fecha}
              onChange={(e) =>
                setNuevoRegistro({ ...nuevoRegistro, fecha: e.target.value })
              }
            />
          </Field>
          <Field>
            <Label>Diagnosis</Label>
            <Input
              value={nuevoRegistro.diagnostico}
              onChange={(e) =>
                setNuevoRegistro({
                  ...nuevoRegistro,
                  diagnostico: e.target.value,
                })
              }
            />
          </Field>
          <Field>
            <Label>Treatment</Label>
            <Input
              value={nuevoRegistro.tratamiento}
              onChange={(e) =>
                setNuevoRegistro({
                  ...nuevoRegistro,
                  tratamiento: e.target.value,
                })
              }
            />
          </Field>
          <Field>
            <Label>Veterinarian</Label>
            <Input
              value={nuevoRegistro.veterinario}
              onChange={(e) =>
                setNuevoRegistro({
                  ...nuevoRegistro,
                  veterinario: e.target.value,
                })
              }
            />
          </Field>
          <Field>
            <Label>Notes</Label>
            <Input
              value={nuevoRegistro.notas}
              onChange={(e) =>
                setNuevoRegistro({ ...nuevoRegistro, notas: e.target.value })
              }
            />
          </Field>
          <Button type="button" onClick={handleSaveHistorial}>
            Save Record
          </Button>
        </AnimalCard>
      )}

      {/* Timeline historial */}
      {historial.length > 0 && (
        <AnimalCard>
          <h3>Medical History</h3>
          {historial.map((h) => (
            <div key={h.id} style={{ borderBottom: "1px solid #ccc", margin: "8px 0", paddingBottom: "4px" }}>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(h.fecha).toLocaleDateString()}
              </p>
              <p>
                <strong>Diagnosis:</strong> {h.diagnostico}
              </p>
              <p>
                <strong>Treatment:</strong> {h.tratamiento}
              </p>
              <p>
                <strong>Veterinarian:</strong> {h.veterinario}
              </p>
              <p>
                <strong>Notes:</strong> {h.notas}
              </p>
            </div>
          ))}
        </AnimalCard>
      )}
    </FormContainer>
  );
}