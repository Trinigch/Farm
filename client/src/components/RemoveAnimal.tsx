// src/pages/RemoveAnimal.tsx
import { useState } from "react";
import { FormContainer,  Field, Label, Input, Button, AnimalCard} from "./AnimalRecordStyle"
import {Animal} from "./../interfaces/models"

export default function RemoveAnimal() {
  const [id, setId] = useState("");
  const [animal, setAnimal] = useState<Animal | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!id) return alert("Please enter a valid ID");
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:3001/api/animals/${id}`);
      if (!res.ok) throw new Error("Animal not found");
      const data = await res.json();
      setAnimal(data);
    } catch (err: any) {
      alert(err.message || "Error searching");
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
      if (!res.ok) throw new Error("Error deleting");
      alert("Animal successfully removed");
      setAnimal(null);
      setId("");
    } catch (err: any) {
      alert(err.message || "Error deleting animal");
    }
  };

  return (
    <FormContainer>
      <Field>
        <Label>Animal ID</Label>
        <Input value={id} onChange={e => setId(e.target.value)} placeholder="Ex: 12" />
      </Field>
      <Button type="button" onClick={handleSearch} disabled={loading}>
        {loading ? "Searching..." : "Search"}
      </Button>

      {animal && (
        <AnimalCard>
          <p><strong>Name:</strong> {animal.nombre}</p>
          <p><strong>Species:</strong> {animal.especie}</p>
          <p><strong>Date of Birth:</strong> {new Date(animal.fecha_nacimiento).toLocaleDateString()}</p>
          <p><strong>Status:</strong> {animal.estado}</p>
          <Button type="button" onClick={handleDelete}>Delete Animal</Button>
        </AnimalCard>
      )}
    </FormContainer>
  );
}
