// src/pages/RegistroAnimal.tsx
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
const Textarea = styled.textarea`
  width: 100%;
  padding: 0.5rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  resize: vertical;
  min-height: 80px;
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

const Select = styled.select`
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
const FieldsetTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: bold;
  margin: 1.5rem 0 1rem;
  color: #4a2e19;
  border-bottom: 1px solid #ddd;
  padding-bottom: 0.25rem;
`;
export default function AnimalForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    especie: "",
    fecha_nacimiento: "",
    padre_id: "",
    madre_id: "",
    estado: "alive",
    observaciones: "",
    breed: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true); // ← empieza el envío

  console.log("Console.log Submitted data:", formData);

  try {
    const response = await fetch("http://localhost:3001/api/animals/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (response.ok) {
      alert("Animal registered successfully! 🎉");
      // Reset form
      setFormData({
        nombre: "",
        especie: "",
        fecha_nacimiento: "",
        padre_id: "",
        madre_id: "",
        estado: "",
        observaciones: "",
        breed:"",
      });
    } else {
      alert("Error: " + data.error);
    }
  } catch (err) {
    console.error(err);
    alert("An error occurred while sending the data.");
  } finally {
    setIsSubmitting(false); // ← termina el envío
  }
};

  

  return (
          <FormContainer>
          <form onSubmit={handleSubmit}>
  {/* Grupo 1: Información básica */}
          <FieldsetTitle>Información básica</FieldsetTitle>
          <Field>
          <Label>📝 Name</Label>
          <Input name="nombre" value={formData.nombre} onChange={handleChange} placeholder="Ej: Margarita" />
          </Field>
          <Field>
          <Label>🐾 Species</Label>
          <Select name="especie" value={formData.especie} onChange={handleChange}>
            <option value="">Select</option>
            <option value="oveja">🐑 Sheep</option>
            <option value="cabra">🐐 Goat</option>
            <option value="aves">🐔 🦆 Birds🦢</option>
            <option value="pavo">🦃 Turkey</option>
          </Select>
        </Field>

        {/* Solo mostrar Breed si es oveja */}
        {formData.especie === "oveja" && (
          <Field>
            <Label>🐑 Breed</Label>
            <Input
              type="text"
              name="breed"
              value={formData.breed}
              onChange={handleChange}
              placeholder="Ej: Jacob, East Friesian, Raka, Dragon"
            />
          </Field>
        )}
  <Field>
    <Label>📅 Date of Birth</Label>
    <Input type="date" name="fecha_nacimiento" value={formData.fecha_nacimiento} onChange={handleChange} />
  </Field>

  {/* Grupo 2: Origen */}
  <FieldsetTitle>Origen</FieldsetTitle>
  <Field>
    <Label>👨‍🦱 Father ID</Label>
    <Input name="padre_id" value={formData.padre_id} onChange={handleChange} placeholder="Ej: 0012" />
  </Field>
  <Field>
    <Label>👩‍🦰 Mother ID</Label>
    <Input name="madre_id" value={formData.madre_id} onChange={handleChange} placeholder="Ej: 0013" />
  </Field>

  {/* Grupo 3: Estado y observaciones */}
  <FieldsetTitle>Estado y observaciones</FieldsetTitle>
  <Field>
    <Label>📍 Status</Label>
    <Select name="estado" value={formData.estado} onChange={handleChange}>
      <option value="alive">Alive</option>
      <option value="deceased">Deceased</option>
      <option value="under treatment">Under Treatment</option>
    </Select>
  </Field>
  <Field>
    <Label>📝 Notes</Label>
    <Textarea name="observaciones" value={formData.observaciones} onChange={handleChange} placeholder="Ej: Cojera leve en pata trasera" />
  </Field>

  <Button type="submit">{isSubmitting ? "Saving..." : "Save"}</Button>
</form>
</FormContainer>
)}