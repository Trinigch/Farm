import { useState, useEffect } from "react";

export type Goat = {
  id: number;
  nombre: string;
  fecha_nacimiento: string;
  observaciones?: string;
  especie: string;
  padre_id?: number | null;
  madre_id?: number | null;
  estado?: string;
};

export function useGoats() {
  const [goats, setGoats] = useState<Goat[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchGoats = async () => {
    try {
      const res = await fetch("/api/animals/");
      const data = await res.json();
      // Filtra solo cabras y asegura que padre_id y madre_id sean números o null
      setGoats(data.filter((item: any) => item.especie === "goat"));
    } catch (error) {
      console.error("Error fetching goats:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGoats();
  }, []);

  return { goats, setGoats, loading, fetchGoats };
}
