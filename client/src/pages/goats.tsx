import { useState, useEffect } from "react";
import GoatDetailPopup from "../components/GoatDetailPopup";
import { Goat, useGoats } from "../Hooks/useGoats";
import { SectionHeader, Title } from "./aboutFarm.styles";

export default function GoatsByYear() {
  const { goats, setGoats, loading } = useGoats();
  const [selectedGoat, setSelectedGoat] = useState<Goat | null>(null);
  const [width, setWidth] = useState(window.innerWidth);
  const [hoveredGoatId, setHoveredGoatId] = useState<number | null>(null);

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

  // 🐐 Cabras sin hijos
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
  const gapSeccion = 100;
  const colPadreX = margin + 100;
  const colHijoX = margin + 350;
  const colMadreX = margin + 600;

  const getGoatFill = (g: Goat, type: "padre" | "madre" | "hijo") => {
    if (g.estado === "deceased") return "#555"; // fallecida
    if (hoveredGoatId === g.id) return "#90EE90"; // hover
    switch (type) {
      case "hijo":
        return "url(#hijoGradient)";
      case "padre":
        return "url(#padreGradient)";
      case "madre":
        return "url(#madreGradient)";
    }
  };

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

      {/* SVG jerárquico */}
      <svg width="100%" height={svgHeight} style={{ background: "#FFF5E1", padding: "40px", borderRadius: "12px" }}>
        <defs>
          <linearGradient id="hijoGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#B2FBA5" />
            <stop offset="100%" stopColor="#ADFF2F" />
          </linearGradient>
          <linearGradient id="padreGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#DEB887" />
            <stop offset="100%" stopColor="#D2B48C" />
          </linearGradient>
          <linearGradient id="madreGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFFACD" />
            <stop offset="100%" stopColor="#FFF8DC" />
          </linearGradient>
        </defs>

        {añosOrdenados.map((year, yearIndex) => {
          const yearHijos = hijosPorAño[year].sort(
            (a, b) => new Date(b.fecha_nacimiento).getTime() - new Date(a.fecha_nacimiento).getTime()
          );

          let yBaseSeccion = 50;
          for (let i = 0; i < yearIndex; i++) {
            yBaseSeccion += gapSeccion + hijosPorAño[añosOrdenados[i]].length * gapY;
          }

          return (
            <g key={year}>
              {/* Fondo sección */}
              <rect
                x={margin / 2}
                y={yBaseSeccion - 30}
                width={width - margin}
                height={yearHijos.length * gapY + 80}
                fill="#fafafa"
                rx={12}
                stroke="#ddd"
              />

              {/* Título año */}
              <text
                x={width / 2}
                y={yBaseSeccion}
                fontSize={22}
                fontWeight="bold"
                textAnchor="middle"
                fontFamily="Arial, sans-serif"
              >
                {year}
              </text>

              {yearHijos.map((h, index) => {
                const yBase = yBaseSeccion + 50 + index * gapY;
                const padre = goats.find(g => g.id === h.padre_id);
                const madre = goats.find(g => g.id === h.madre_id);

                return (
                  <g key={h.id}>
                    {/* Padre */}
                    {padre && (
                      <>
                        <rect x={colPadreX} y={yBase} width={100} height={50} rx={10} fill={getGoatFill(padre, "padre")} stroke="#555" />
                        <text x={colPadreX + 50} y={yBase + 25} fontSize={12} textAnchor="middle" alignmentBaseline="middle">
                          {padre.nombre}
                        </text>
                      </>
                    )}

                    {/* Hijo */}
                    <rect
                      x={colHijoX}
                      y={yBase}
                      width={100}
                      height={50}
                      rx={10}
                      fill={getGoatFill(h, "hijo")}
                      stroke="#555"
                      style={{
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                        transform: hoveredGoatId === h.id ? "scale(1.05)" : "scale(1)",
                        transformOrigin: "center",
                      }}
                      onClick={() => setSelectedGoat(h)}
                      onMouseEnter={() => setHoveredGoatId(h.id)}
                      onMouseLeave={() => setHoveredGoatId(null)}
                    />
                    <text x={colHijoX + 50} y={yBase + 25} fontSize={12} textAnchor="middle" alignmentBaseline="middle" style={{ pointerEvents: "none" }}>
                      {h.nombre}
                    </text>

                    {/* Madre */}
                    {madre && (
                      <>
                        <rect x={colMadreX} y={yBase} width={100} height={50} rx={10} fill={getGoatFill(madre, "madre")} stroke="#555" />
                        <text x={colMadreX + 50} y={yBase + 25} fontSize={12} textAnchor="middle" alignmentBaseline="middle">
                          {madre.nombre}
                        </text>
                      </>
                    )}

                    {/* Conexiones */}
                    {padre && <path d={`M ${colPadreX + 100},${yBase + 25} C ${colPadreX + 180},${yBase + 25} ${colHijoX - 80},${yBase + 25} ${colHijoX},${yBase + 25}`} stroke="#8B4513" fill="none" strokeWidth={2} />}
                    {madre && <path d={`M ${colMadreX},${yBase + 25} C ${colMadreX - 80},${yBase + 25} ${colHijoX + 180},${yBase + 25} ${colHijoX + 100},${yBase + 25}`} stroke="#FF69B4" fill="none" strokeWidth={2} />}
                  </g>
                );
              })}
            </g>
          );
        })}
      </svg>

      {/* Cabras sin hijos */}
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
              <p style={{ fontSize: "12px", margin: "5px 0" }}>{new Date(g.fecha_nacimiento).toLocaleDateString()}</p>
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
            backgroundColor: "rgba(0,0,0,0.4)",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
            zIndex: 9999,
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              marginTop: "80px",
              background: "#fff",
              borderRadius: "12px",
              padding: "20px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
            }}
          >
            <GoatDetailPopup goat={selectedGoat} onClose={() => setSelectedGoat(null)} onSave={handleSaveGoat} />
          </div>
        </div>
      )}
    </>
  );
}
