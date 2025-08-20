import { useState, useEffect } from "react";
import GoatDetailPopup from "../components/GoatDetailPopup";
import { Goat, useGoats } from "../Hooks/useGoats"; 
import { SectionHeader , Title } from "./aboutFarm.styles";

export default function GoatsByYear() {
  const { goats, setGoats, loading } = useGoats(); 
  const [selectedGoat, setSelectedGoat] = useState<Goat | null>(null);
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (loading) return <div>Cargando cabras...</div>;
  if (goats.length === 0) return <div>No hay cabras registradas.</div>;

  // 🐐 Hijos = cabras con padre o madre
  const hijos = goats.filter(g => g.padre_id || g.madre_id);

  // 🐐 IDs que son usados como padre o madre
  const usedAsParent = new Set<number>();
  hijos.forEach(h => {
    if (h.padre_id) usedAsParent.add(h.padre_id);
    if (h.madre_id) usedAsParent.add(h.madre_id);
  });

  // 🐐 Cabras sin hijos = las que no aparecen como padre/madre
  const goatsSinHijos = goats.filter(g => !usedAsParent.has(g.id));

  // Agrupar hijos por año
  const hijosPorAño: Record<string, Goat[]> = {};
  hijos.forEach(h => {
    const year = new Date(h.fecha_nacimiento).getFullYear().toString();
    if (!hijosPorAño[year]) hijosPorAño[year] = [];
    hijosPorAño[year].push(h);
  });

  const añosOrdenados = Object.keys(hijosPorAño).sort((a, b) => Number(b) - Number(a));

  const margin = 40;
  const gapY = 120;
  const gapSeccion = 60;

  const colPadreX = width / 2 - 350;
  const colHijoX = width / 2 - 50;
  const colMadreX = width / 2 + 250;

  const getColor = (g: Goat) => (!g.padre_id && !g.madre_id ? "#F5DEB3" : "#ADFF2F");

  const handleSaveGoat = async (updatedGoat: Goat) => {
    const res = await fetch(`/api/animals/${updatedGoat.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedGoat),
    });
    const data = await res.json();
    setGoats(prev => prev.map(g => (g.id === data.id ? data : g)));
    return data;
  };

  let svgHeight = 100;
  añosOrdenados.forEach(year => {
    svgHeight += gapSeccion + hijosPorAño[year].length * gapY;
  });

  return (
    <>
      <SectionHeader>  
        <Title>{`Goats Total: ${goats.length}`}</Title>
      </SectionHeader> 

      {/* SVG de cabras con hijos */}
      <svg
        width="100%"
        height={svgHeight}
        style={{ background: "#FFF5E1", padding: "40px", borderRadius: "8px" }}
      >
        {/* ... render de cabras por año (igual que tenías) ... */}
      </svg>

      {/* Nueva sección: cabras sin hijos */}
      <div style={{ marginTop: "40px", padding: "20px", background: "#fafafa", borderRadius: "12px" }}>
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Goats sin hijos</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center" }}>
          {goatsSinHijos.map(g => (
            <div
              key={g.id}
              onClick={() => setSelectedGoat(g)}
              style={{
                width: "150px",
                padding: "15px",
                borderRadius: "10px",
                background: "#FFF5E1",
                boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                textAlign: "center",
                cursor: "pointer",
              }}
            >
              <strong>{g.nombre}</strong>
              <p style={{ fontSize: "12px", margin: "5px 0" }}>
                {new Date(g.fecha_nacimiento).toLocaleDateString()}
              </p>
              <span style={{ fontSize: "11px", color: "#555" }}>{g.estado ?? "Activo"}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Popup detalle */}
      {selectedGoat && (
        <div
          onClick={() => setSelectedGoat(null)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.3)",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
            zIndex: 9999,
          }}
        >
          <div onClick={e => e.stopPropagation()}>
            <GoatDetailPopup
              goat={selectedGoat}
              onClose={() => setSelectedGoat(null)}
              onSave={handleSaveGoat}
            />
          </div>
        </div>
      )}
    </>
  );
}
