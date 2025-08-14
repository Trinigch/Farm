

import { useEffect, useState } from "react";
import SheepDetailPopup from "../components/SheepDetailPopup";
import { Sheep } from "./../interfaces/models";

export default function SheepsByYear() {
  const [sheeps, setSheeps] = useState<Sheep[]>([]);
  const [selectedSheep, setSelectedSheep] = useState<Sheep | null>(null);
  const [width, setWidth] = useState(window.innerWidth);
const [hoveredSheepId, setHoveredSheepId] = useState<number | null>(null);

  useEffect(() => {
    const fetchSheeps = async () => {
      const res = await fetch("/api/animals/");
      const data: Sheep[] = await res.json();
      setSheeps(data.filter(s => s.especie === "oveja"));
    };
    fetchSheeps();

    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (sheeps.length === 0) return <div>Cargando ovejas...</div>;

  const hijos = sheeps.filter(s => s.padre_id || s.madre_id);

  // Agrupar hijos por año
  const hijosPorAño: Record<string, Sheep[]> = {};
  hijos.forEach(h => {
    const year = new Date(h.fecha_nacimiento).getFullYear().toString();
    if (!hijosPorAño[year]) hijosPorAño[year] = [];
    hijosPorAño[year].push(h);
  });

  const añosOrdenados = Object.keys(hijosPorAño).sort((a, b) => Number(b) - Number(a));

  const margin = 40;
  const gapY = 120;
  const gapSeccion = 60;
  const colPadreX = margin + 100;
  const colHijoX = margin + 350;
  const colMadreX = margin + 600;

  const getColor = (s: Sheep) => (!s.padre_id && !s.madre_id ? "#FFF8DC" : "#98FB98");

  const handleSaveSheep = async (updatedSheep: Sheep) => {
    const res = await fetch(`/api/animals/${updatedSheep.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedSheep),
    });
    const data = await res.json();
    setSheeps(prev => prev.map(s => (s.id === data.id ? data : s)));
    return data;
  };

  // Calcular altura total del SVG
  let svgHeight = 100;
  añosOrdenados.forEach(year => {
    svgHeight += gapSeccion + hijosPorAño[year].length * gapY;
  });

  const getSheepFill = (s: Sheep, type: "padre" | "madre" | "hijo") => {
  if (s.estado === "deceased") return "#555"; // gris oscuro si fallecida
  if (hoveredSheepId === s.id) return "#90EE90"; // verde claro si hover
  switch(type) {
    case "hijo": return "#98FB98"; // hijo vivo
    case "padre": return "#D2B48C"; // padre vivo
    case "madre": return "#FFF8DC"; // madre viva
  }
}

  return (
    <>
      <div className="flex flex-col p-0 text-center bg-green-100 font-bold text-3xl">
        {`Sheeps Total: ${sheeps.length}`}
      </div>

      <svg
        width="100%"
        height={svgHeight}
        style={{ background: "#E6F2E6", padding: "40px", borderRadius: "8px" }}
      >
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
              {/* Título año */}
              <text
                x={width / 2}
                y={yBaseSeccion}
                fontSize={20}
                fontWeight="bold"
                textAnchor="middle"
              >
                {year}
              </text>

              {/* Línea separadora */}
              <line
                x1={margin}
                y1={yBaseSeccion + 10}
                x2={width - margin}
                y2={yBaseSeccion + 10}
                stroke="#555"
                strokeWidth={2}
              />

              {yearHijos.map((h, index) => {
                const yBase = yBaseSeccion + 40 + index * gapY;
                const padre = sheeps.find(s => s.id === h.padre_id);
                const madre = sheeps.find(s => s.id === h.madre_id);

                return (
                  <g key={h.id}>
                    {/* Subtítulos Dad y Mom */}
                    {padre && index === 0 && (
                      <text
                        x={colPadreX + 50}
                        y={yBaseSeccion + 30}
                        fontSize={12}
                        fontWeight="bold"
                        textAnchor="middle"
                      >
                        Dad
                      </text>
                    )}
                    {madre && index === 0 && (
                      <text
                        x={colMadreX + 50}
                        y={yBaseSeccion + 30}
                        fontSize={12}
                        fontWeight="bold"
                        textAnchor="middle"
                      >
                        Mom
                      </text>
                    )}

                    {/* Padre */}
                    {padre && (
                      <>
                        <rect
                          x={colPadreX}
                          y={yBase}
                          width={100}
                          height={50}
                          rx={10}
                          ry={10}
                          fill={getSheepFill(padre, "padre")}
                          stroke="#555"
                        />
                        <text
                          x={colPadreX + 50}
                          y={yBase + 25}
                          fontSize={12}
                          textAnchor="middle"
                          alignmentBaseline="middle"
                        >
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
                  ry={10}
                  fill={getSheepFill(h, "hijo")}
                  stroke="#555"
                  style={{ cursor: "pointer", transition: "fill 0.2s" }}
                  onClick={() => setSelectedSheep(h)}
                  onMouseEnter={() => setHoveredSheepId(h.id)}
                  onMouseLeave={() => setHoveredSheepId(null)}
                />
                <text
                  x={colHijoX + 50}
                  y={yBase + 25}
                  fontSize={12}
                  textAnchor="middle"
                  alignmentBaseline="middle"
                  style={{ pointerEvents: "none" }}
                >
                  {h.nombre}
                </text>

                    {/* Madre */}
                    {madre && (
                      <>
                        <rect
                          x={colMadreX}
                          y={yBase}
                          width={100}
                          height={50}
                          rx={10}
                          ry={10}
                          fill={getSheepFill(madre, "madre")}
                          stroke="#555"
                        />
                        <text
                          x={colMadreX + 50}
                          y={yBase + 25}
                          fontSize={12}
                          textAnchor="middle"
                          alignmentBaseline="middle"
                        >
                          {madre.nombre}
                        </text>
                      </>
                    )}

                    {/* Líneas */}
                    {padre && (
                      <line
                        x1={colPadreX + 100} // borde derecho del padre
                        y1={yBase + 25}
                        x2={colHijoX} // borde izquierdo del hijo
                        y2={yBase + 25}
                        stroke="#8B4513"
                        strokeWidth={2}
                      />
                    )}
                    {madre && (
                      <line
                        x1={colMadreX  } // borde izquierdo de la madre
                        y1={yBase + 25}
                        x2={colHijoX + 100 } // borde izquierdo del hijo
                        y2={yBase + 25}
                        stroke="#FFB6C1"
                        strokeWidth={2}
                      />
                    )}
                  </g>
                );
              })}
            </g>
          );
        })}
      </svg>

      {/* Popup modal */}
      {selectedSheep && (
        <div
          onClick={() => setSelectedSheep(null)}
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
            <SheepDetailPopup
              sheep={selectedSheep}
              onClose={() => setSelectedSheep(null)}
              onSave={handleSaveSheep}
            />
          </div>
        </div>
      )}
    </>
  );
}
