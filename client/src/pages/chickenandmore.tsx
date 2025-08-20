// import { useEffect, useState } from "react";

// import SummaryCard from "../components/SummaryCard"; 
// import moreImage from "./../assets/img/cats.jpeg";
// import { Container, ImageContainer, Title, CardsRow, CardContainer } from "./aboutFarm.styles";

// import { SectionHeader } from "./aboutFarm.styles";
// interface Bird {
//   id: number;
//   especie: string; // "chicken" o "turkey"
//   estado: string; // "alive" o "deceased"
// }

// function AboutFarm() {
//   const [birds, setBirds] = useState<Bird[]>([]);

//   useEffect(() => {
//     const fetchBirds = async () => {
//       const res = await fetch("/api/animals/");
//       const data: Bird[] = await res.json();
//       // Filtramos solo aves vivas
//       const aliveBirds = data.filter(b => ["chicken", "turkey", "duck"].includes(b.especie) && b.estado !== "deceased");
//       setBirds(aliveBirds);
//     };
//     fetchBirds();
//   }, []);

//   // Contar por especie
//   const counts: Record<string, number> = { chicken: 0, turkey: 0, duck: 0 };
//   birds.forEach(b => {
//     if (counts[b.especie] !== undefined) counts[b.especie]++;
//   });

//   return (
//     <Container>
//              <SectionHeader > 
//         <Title>{"🐔 Chicken and 🦃 More"}</Title>
//       </SectionHeader > 

//       <ImageContainer background={moreImage}>
//         <CardsRow>
//           <CardContainer>
//             <SummaryCard title="Chicks" value={counts.chicken} icon="🐔" />
//             <SummaryCard title="Duckies" value={counts.duck} icon="🦆" />
//             <SummaryCard title="Turkeys" value={counts.turkey} icon="🦃" />
//           </CardContainer>
//           <CardContainer>
//             <SummaryCard title="New born" value={0} icon="🐤" />
//           </CardContainer>
   
//         </CardsRow>
//       </ImageContainer>
//     </Container>
//   );
// }

// export default AboutFarm;

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
            <h2>{year}</h2>
            <ul>
              {birdsByYear[year].map(bird => (
                <li
                  key={bird.id}
                  style={{
                    cursor: "pointer",
                    margin: "5px 0",
                    color: bird.estado === "deceased" ? "#999" : "#000",
                  }}
                  onClick={() => setSelectedBird(bird)}
                >
                  {`${bird.nombre} (${bird.especie}) - ${new Date(bird.fecha_nacimiento).toLocaleDateString()}`}
                </li>
              ))}
            </ul>
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
