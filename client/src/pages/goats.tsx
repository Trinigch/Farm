
import { useEffect, useState } from "react";
import GoatDetailPopup from "../components/GoatDetailPopup";
import { Goat } from "./../interfaces/models";

export default function GoatsByYear() {
  const [goats, setGoats] = useState<Goat[]>([]);
  const [selectedGoat, setSelectedGoat] = useState<Goat | null>(null);
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const fetchGoats = async () => {
      const res = await fetch("/api/animals/");
      const data: Goat[] = await res.json();
      setGoats(data.filter(g => g.especie === "cabra"));
    };
    fetchGoats();

    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (goats.length === 0) return <div>Cargando cabras...</div>;

  const hijos = goats.filter(g => g.padre_id || g.madre_id);

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

  // Posiciones centradas
  const colPadreX = width / 2 - 350; // 350 px a la izquierda del centro
  const colHijoX = width / 2 - 50;   // hijo al centro
  const colMadreX = width / 2 + 250; // 250 px a la derecha del centro

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

  // Calcular altura total del SVG
  let svgHeight = 100;
  añosOrdenados.forEach(year => {
    svgHeight += gapSeccion + hijosPorAño[year].length * gapY;
  });

  return (
    <>
      <div className="flex flex-col p-0 text-center bg-yellow-100 font-bold text-3xl">
        {`Total de cabras: ${goats.length}`}
      </div>

      <svg
        width="100%"
        height={svgHeight}
        style={{ background: "#FFF5E1", padding: "40px", borderRadius: "8px" }}
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
              {/* Subtítulo del año */}
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

              {/* Hijos */}
              {yearHijos.map((h, index) => {
                const yBase = yBaseSeccion + 40 + index * gapY;
                const padre = goats.find(g => g.id === h.padre_id);
                const madre = goats.find(g => g.id === h.madre_id);

                return (
                  <g key={h.id}>
                    {/* Subtítulos padre/madre */}
                    {padre && (
                      <text
                        x={colPadreX + 50}
                        y={yBase - 10}
                        fontSize={12}
                        fontWeight="bold"
                        textAnchor="middle"
                      >
                        Dad
                      </text>
                    )}
                    {madre && (
                      <text
                        x={colMadreX + 50}
                        y={yBase - 10}
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
                          fill="#B5651D"
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
                      fill={getColor(h)}
                      stroke="#555"
                      style={{ cursor: "pointer" }}
                      onClick={() => setSelectedGoat(h)}
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
                          fill="#F5DEB3"
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

                    {/* Conexiones (no sobrepasar hijos) */}
                    {padre && (
                      <line
                        x1={colPadreX + 100}
                        y1={yBase + 25}
                        x2={colHijoX}
                        y2={yBase + 25}
                        stroke="#8B4513"
                        strokeWidth={2}
                      />
                    )}
                    {madre && (
                      <line
                        x1={colMadreX }
                        y1={yBase + 25}
                        x2={colHijoX+ 100 }
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
