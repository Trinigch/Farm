import { useState, useEffect } from "react";

export type Bird = {
  id: number;
  nombre: string;
  fecha_nacimiento: string;
  observaciones?: string;
  especie: string; // "chicken" | "turkey" | "duck" | "goose"
  estado?: string;
};

export function useBirds() {
  const [birds, setBirds] = useState<Bird[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBirds = async () => {
    try {
      const res = await fetch("/api/animals/");
      const data = await res.json();

      // Filtra solo las especies de aves
      const birdSpecies = ["chicken", "turkey", "duck", "goose"];
      const filtered = data.filter((item: any) =>
        birdSpecies.includes(item.especie)
      );

      setBirds(filtered);
    } catch (error) {
      console.error("Error fetching birds:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBirds();
  }, []);

  return { birds, setBirds, loading, fetchBirds };
}