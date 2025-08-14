import { useState, useEffect } from "react";
import styled from "styled-components";
import { Goat } from "./../interfaces/models";

interface Props {
  goat: Goat | null;
  onClose: () => void;
  onSave: (updatedGoat: Goat) => Promise<Goat>;
}

const FormContainer = styled.div`
  max-width: 600px;
  margin: 1rem auto;
  background-color: rgba(255, 255, 255, 0.95);
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 0 15px rgba(0,0,0,0.2);
  position: relative;
`;

const Field = styled.div`
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const Label = styled.label`
  width: 140px;
  font-weight: bold;
  color: #4a2e19;
`;

const Input = styled.input`
  flex-grow: 1;
  padding: 0.5rem;
  border-radius: 8px;
  border: 1px solid #ccc;
`;

const Button = styled.button`
  background-color: #4a2e19;
  color: white;
  padding: 0.5rem 1.25rem;
  border-radius: 100px;
  font-weight: bold;
  border: none;
  cursor: pointer;

  &:hover:enabled {
    background-color: #d9a7b5;
    color: #4a2e19;
  }
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const Title = styled.h2`
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  color: #4a2e19;
`;

export default function GoatDetailPopup({ goat, onClose, onSave }: Props) {
  const [formData, setFormData] = useState<Goat | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (goat) setFormData({ ...goat });
  }, [goat]);

  if (!formData) return null;

  const handleChange = (field: keyof Goat, value: string) => {
    setFormData(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        [field]:
          field === "padre_id" || field === "madre_id"
            ? value === "" || value === "0"
              ? null
              : Number(value)
            : value
      };
    });
  };

  const handleSave = async () => {
    if (!formData) return;

    for (const field of ["padre_id", "madre_id"] as const) {
      const val = formData[field];
      if (val !== null && val !== undefined && isNaN(Number(val))) {
        alert(`El campo ${field} debe ser un número válido o vacío`);
        return;
      }
    }

    setIsSubmitting(true);
    try {
      const updated = await onSave(formData);
      setFormData(updated);
    } catch (e) {
      alert("Error al guardar cambios");
      console.error(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed bg-black bg-opacity-50 flex justify-center items-start z-50"
      style={{ paddingTop: "0rem" }}
      onClick={onClose}
    >
      <FormContainer onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between w-full">
          <Title>{formData.nombre}</Title>
          <button
            className="text-gray-600 hover:text-gray-900 font-bold text-xl"
            onClick={onClose}
            aria-label="Close"
            disabled={isSubmitting}
          >
            ❌
          </button>
        </div>

        <Field>
          <Label>ID:</Label>
          <span>{formData.id}</span>
        </Field>

        <Field>
          <Label>Nombre:</Label>
          <Input
            type="text"
            value={formData.nombre}
            onChange={e => handleChange("nombre", e.target.value)}
            disabled={isSubmitting}
          />
        </Field>

        <Field>
          <Label>Fecha Nacimiento:</Label>
          <Input
            type="date"
            value={formData.fecha_nacimiento.split("T")[0]}
            onChange={e => handleChange("fecha_nacimiento", e.target.value)}
            disabled={isSubmitting}
          />
        </Field>

        <Field>
          <Label>Father ID:</Label>
          <Input
            type="text"
            value={formData.padre_id ?? ""}
            onChange={e => handleChange("padre_id", e.target.value)}
            disabled={isSubmitting}
          />
        </Field>

        <Field>
          <Label>Mother ID:</Label>
          <Input
            type="text"
            value={formData.madre_id ?? ""}
            onChange={e => handleChange("madre_id", e.target.value)}
            disabled={isSubmitting}
          />
        </Field>

        <Field>
          <Label>Status:</Label>
          <Input
            type="text"
            value={formData.estado ?? ""}
            onChange={e => handleChange("estado", e.target.value)}
            disabled={isSubmitting}
          />
        </Field>

        <Field>
          <Label>Observaciones:</Label>
          <Input
            type="text"
            value={formData.observaciones ?? ""}
            onChange={e => handleChange("observaciones", e.target.value)}
            disabled={isSubmitting}
          />
        </Field>

        <div style={{ textAlign: "right", marginTop: "1rem" }}>
          <Button onClick={handleSave} disabled={isSubmitting}>
            {isSubmitting ? "Guardando..." : "Guardar Cambios"}
          </Button>
        </div>
      </FormContainer>
    </div>
  );
}
