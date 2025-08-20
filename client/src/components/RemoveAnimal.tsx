// src/pages/RemoveAnimal.tsx
import { useState } from "react";
import styled from "styled-components";

const FormContainer = styled.div`
  max-width: 600px;
  margin: auto;
  background-color: rgba(255, 255, 255, 0.85);
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 0 15px rgba(0,0,0,0.1);
`;

const Field = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #4a2e19;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border-radius: 8px;
  border: 1px solid #ccc;
`;

const Button = styled.button`
  background-color: #4a2e19;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 10px;
  font-weight: bold;
  border: none;
  cursor: pointer;
  display: block;
  margin: 1rem auto 0 auto;

  &:hover {
    background-color: #d9a7b5;
    color: #4a2e19;
  }
`;

const AnimalCard = styled.div`
  background: #FFF5E1;
  padding: 1rem;
  border-radius: 12px;
  margin-top: 1rem;
  text-align: center;
`;

interface Animal {
  id: number;
  nombre: string;
  especie: string;
  fecha_nacimiento: string;
  estado: string;
}

export default function RemoveAnimal() {
  const [id, setId] = useState("");
  const [animal, setAnimal] = useState<Animal | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!id) return alert("Ingrese un ID válido");
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:3001/api/animals/${id}`);
      if (!res.ok) throw new Error("Animal no encontrado");
      const data = await res.json();
      setAnimal(data);
    } catch (err: any) {
      alert(err.message || "Error al buscar el animal");
      setAnimal(null);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!animal) return;
    const confirm = window.confirm(`¿Eliminar ${animal.nombre} (${animal.especie})?`);
    if (!confirm) return;

    try {
      const res = await fetch(`http://localhost:3001/api/animals/${animal.id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Error al eliminar");
      alert("Animal eliminado correctamente ✅");
      setAnimal(null);
      setId("");
    } catch (err: any) {
      alert(err.message || "Error al eliminar el animal");
    }
  };

  return (
    <FormContainer>
      <Field>
        <Label>🆔 Animal ID</Label>
        <Input value={id} onChange={e => setId(e.target.value)} placeholder="Ej: 12" />
      </Field>
      <Button type="button" onClick={handleSearch} disabled={loading}>
        {loading ? "Buscando..." : "Buscar"}
      </Button>

      {animal && (
        <AnimalCard>
          <p><strong>Name:</strong> {animal.nombre}</p>
          <p><strong>Species:</strong> {animal.especie}</p>
          <p><strong>Date of Birth:</strong> {new Date(animal.fecha_nacimiento).toLocaleDateString()}</p>
          <p><strong>Status:</strong> {animal.estado}</p>
          <Button type="button" onClick={handleDelete}>Eliminar Animal</Button>
        </AnimalCard>
      )}
    </FormContainer>
  );
}
