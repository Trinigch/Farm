import { useState, useEffect } from "react";

export type Sheep = {
  id: number;
  nombre: string;
  fecha_nacimiento: string;
  observaciones?: string;
  especie: string;
  padre_id?: number | null;
  madre_id?: number | null;
  estado?: string;
};

export function useSheeps() {
  const [sheeps, setSheeps] = useState<Sheep[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSheeps = async () => {
    try {
      const res = await fetch("/api/animals/");
      const data = await res.json();
      // Asegúrate que padre_id y madre_id sean números o null en los datos
      setSheeps(data.filter((item: any) => item.especie === "oveja"));
    } catch (error) {
      console.error("Error fetching sheeps:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSheeps();
  }, []);

  return { sheeps, setSheeps, loading, fetchSheeps };
}