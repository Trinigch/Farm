import { useEffect, useState } from "react";
import { SectionHeader, Title } from "./aboutFarm.styles";

interface Bird {
  id: number;
  especie: "chicken" | "turkey" | "duck" | "goose";
  estado: string; // "alive" o "deceased"
  nombre: string;
  fecha_nacimiento: string;
}

export default function BirdsByYear() {
  const [birds, setBirds] = useState<Bird[]>([]);
  const [selectedBird, setSelectedBird] = useState<Bird | null>(null);

  useEffect(() => {
    const fetchBirds = async () => {
      const res = await fetch("/api/animals/");
      const data: Bird[] = await res.json();
      setBirds(data.filter(b => ["chicken", "turkey", "duck", "goose"].includes(b.especie)));
    };
    fetchBirds();
  }, []);

  if (birds.length === 0) return <div>Cargando aves...</div>;

  // Agrupar por año
  const birdsByYear: Record<string, Bird[]> = {};
  birds.forEach(b => {
    const year = new Date(b.fecha_nacimiento).getFullYear().toString();
    if (!birdsByYear[year]) birdsByYear[year] = [];
    birdsByYear[year].push(b);
  });

  const yearsSorted = Object.keys(birdsByYear).sort((a, b) => Number(b) - Number(a));

  return (
    <>
      <SectionHeader>
        <Title>{`Total Birds: ${birds.length}`}</Title>
      </SectionHeader>

      <div style={{ padding: "20px" }}>
        {yearsSorted.map(year => (
          <div key={year} style={{ marginBottom: "40px" }}>
            <h3 style={{ textAlign: "center", marginBottom: "20px" }}>{year}</h3>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "20px",
                justifyContent: "center",
              }}
            >
              {birdsByYear[year].map(bird => (
                <div
                  key={bird.id}
                  onClick={() => setSelectedBird(bird)}
                  style={{
                    width: "160px",
                    padding: "15px",
                    borderRadius: "12px",
                    background: "#FFF5E1",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                    textAlign: "center",
                    cursor: "pointer",
                    transition: "transform 0.2s ease",
                    transform: bird.estado === "deceased" ? "none" : "scale(1)",
                    opacity: bird.estado === "deceased" ? 0.6 : 1,
                  }}
                  onMouseEnter={e => {
                    if (bird.estado !== "deceased") (e.currentTarget.style.transform = "scale(1.05)");
                  }}
                  onMouseLeave={e => {
                    if (bird.estado !== "deceased") (e.currentTarget.style.transform = "scale(1)");
                  }}
                >
                  <strong>{bird.nombre}</strong>
                                      
                  <p>
                  Id : {bird.id}
                  </p>
                  <p style={{ fontSize: "12px", margin: "5px 0" }}>
                    {new Date(bird.fecha_nacimiento).toLocaleDateString()}
                  </p>
                  <span style={{ fontSize: "11px", color: "#555" }}>
                    {bird.especie} {bird.estado === "deceased" ? "☠️" : "🟢"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Popup modal */}
      {selectedBird && (
        <div
          onClick={() => setSelectedBird(null)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: "#fff",
              borderRadius: "12px",
              padding: "20px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
              minWidth: "300px",
            }}
          >
            <h3>{selectedBird.nombre}</h3>
            <p>{`Especie: ${selectedBird.especie}`}</p>
            <p>{`Nacimiento: ${new Date(selectedBird.fecha_nacimiento).toLocaleDateString()}`}</p>
            <p>{`Estado: ${selectedBird.estado}`}</p>
            <button onClick={() => setSelectedBird(null)}>Cerrar</button>
          </div>
        </div>
      )}
    </>
  );
}
