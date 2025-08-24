// src/pages/RegistroAnimal.tsx
import { useState } from "react";
import { FormContainer, Textarea,FieldsetTitle, Field, Label, Input, Select, Button} from "./AnimalRecordStyle"

export default function AnimalForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const API_URL = import.meta.env.VITE_API_URL;
  const [formData, setFormData] = useState({
    nombre: "",
    especie: "",
    fecha_nacimiento: "",
    padre_id: "",
    madre_id:"",
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
    const response = await fetch(`${API_URL}/api/animals/`, {
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
            <option value="sheep">🐑 Sheep</option>
            <option value="goat">🐐 Goat</option>
            <option value="chicken">🐔 Chicken</option>
            
            <option value="duckie"> 🦆 Duckie</option>
            
            <option value="goose"> 🦢 Goose</option>
            <option value="tukey">🦃 Turkey</option>
          </Select>
        </Field>

     
          <Field>
            <Label> Breed</Label>
            <Input
              type="text"
              name="breed"
              value={formData.breed}
              onChange={handleChange}
              placeholder="Ej: Jacob, East Friesian, mini goat, legbar"
            />
          </Field>
        
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
  <FieldsetTitle>State and observations</FieldsetTitle>
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
    <Textarea name="observations" value={formData.observaciones} onChange={handleChange} placeholder="Ej: problem in the digest system" />
  </Field>

  <Button type="submit">{isSubmitting ? "Saving..." : "Save"}</Button>
</form>
</FormContainer>
)}