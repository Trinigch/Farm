// import { useEffect, useState } from "react";
// import SummaryCard from "../components/SummaryCard"; 
// import moreImage from "./../assets/img/cats.jpeg";
// import { Container, ImageContainer, Title, CardsRow, CardContainer } from "./../pages/aboutFarm.styles";

// interface Bird {
//   id: number;
//   nombre: string;
//   especie: string; // "chicken", "turkey", "duck"
//   estado: string; // "alive" | "deceased"
//   fecha_nacimiento: string;
// }

// export default function BirdsDetailPopup() {
//   const [birds, setBirds] = useState<Bird[]>([]);
//   const [selectedBird, setSelectedBird] = useState<Bird | null>(null);

//   useEffect(() => {
//     const fetchBirds = async () => {
//       const res = await fetch("/api/animals/");
//       const data: Bird[] = await res.json();
//       // Filtrar solo especies deseadas
//       const filteredBirds = data.filter(
//         b => ["chicken", "turkey", "duck"].includes(b.especie)
//       );
//       setBirds(filteredBirds);
//     };
//     fetchBirds();
//   }, []);

//   const getIcon = (especie: string) => {
//     switch (especie) {
//       case "chicken": return "🐔";
//       case "duck": return "🦆";
//       case "turkey": return "🦃";
//       default: return "🐣";
//     }
//   };

//   const getCardColor = (bird: Bird) => bird.estado === "deceased" ? "#ccc" : "#FFF8DC";

//   return (
//     <Container>
//       <div className="flex flex-col items-center p-2">
//         <Title>{"🐔 Chicken, 🦆 Duck & 🦃 Turkey"}</Title>
//       </div>

//       <ImageContainer background={moreImage}>
//         <CardsRow>
//           {birds.map(bird => (
//             <CardContainer key={bird.id}>
//               <SummaryCard
//                 title={bird.nombre}
//                 value={new Date(bird.fecha_nacimiento).toLocaleDateString()}
//                 icon={getIcon(bird.especie)}
//                 style={{ backgroundColor: getCardColor(bird) }}
//                 onClick={() => setSelectedBird(bird)}
//               />
//             </CardContainer>
//           ))}
//         </CardsRow>
//       </ImageContainer>

//       {selectedBird && (
//         <div
//           onClick={() => setSelectedBird(null)}
//           style={{
//             position: "fixed",
//             top: 0,
//             left: 0,
//             right: 0,
//             bottom: 0,
//             backgroundColor: "rgba(0,0,0,0.3)",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             zIndex: 9999,
//           }}
//         >
//           <div onClick={e => e.stopPropagation()} style={{ backgroundColor: "#fff", padding: "20px", borderRadius: "10px" }}>
//             <h2>{selectedBird.nombre}</h2>
//             <p>Especie: {selectedBird.especie}</p>
//             <p>Fecha de nacimiento: {new Date(selectedBird.fecha_nacimiento).toLocaleDateString()}</p>
//             <p>Estado: {selectedBird.estado}</p>
//             <button onClick={() => setSelectedBird(null)}>Cerrar</button>
//           </div>
//         </div>
//       )}
//     </Container>
//   );
// }
import { useEffect, useState } from "react";
import SummaryCard from "../components/SummaryCard"; 
import moreImage from "./../assets/img/cats.jpeg";
import { Container, ImageContainer, Title, CardsRow, CardContainer } from "./../pages/aboutFarm.styles";

import { Bird } from "./../interfaces/models";



export default function BirdsDetailPopup() {
  const [birds, setBirds] = useState<Bird[]>([]);
  const [selectedBird, setSelectedBird] = useState<Bird | null>(null);

  useEffect(() => {
    const fetchBirds = async () => {
      const res = await fetch("/api/animals/");
      const data: Bird[] = await res.json();
      const filteredBirds = data.filter(b => ["chicken", "turkey", "duck", "goose"].includes(b.especie));
      setBirds(filteredBirds);
    };
    fetchBirds();
  }, []);

  const getIcon = (especie: string) => {
    switch (especie) {
      case "chicken": return "🐔";
      case "duck": return "🦆";
      case "goose": return "";
      case "turkey": return "🦃";
      default: return "🐣";
    }
  };

  const getCardColor = (bird: Bird) => bird.estado === "deceased" ? "#ddd" : "#FFF8DC";

  return (
    <Container>
      <div className="flex flex-col items-center p-2">
        <Title>{"🐔 Chicken, 🦆 Duck & 🦃 Turkey"}</Title>
      </div>

      <ImageContainer background={moreImage}>
        <CardsRow>
          {birds.map(bird => (
            <CardContainer key={bird.id}>
              <SummaryCard
                title={bird.nombre}
                value={new Date(bird.fecha_nacimiento).toLocaleDateString()}
                icon={getIcon(bird.especie)}
                style={{ backgroundColor: getCardColor(bird), cursor: "pointer" }}
                onClick={() => setSelectedBird(bird)}
              />
            </CardContainer>
          ))}
        </CardsRow>
      </ImageContainer>

      {/* Popup */}
      {selectedBird && (
        <div
          onClick={() => setSelectedBird(null)}
          style={{
            position: "fixed",
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: "rgba(0,0,0,0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
              maxWidth: "400px",
              width: "90%",
            }}
          >
            <h2 style={{ marginBottom: "10px" }}>{selectedBird.nombre}</h2>
            <p><strong>Especie:</strong> {selectedBird.especie}</p>
            <p><strong>Fecha de nacimiento:</strong> {new Date(selectedBird.fecha_nacimiento).toLocaleDateString()}</p>
            <p><strong>Estado:</strong> {selectedBird.estado}</p>
            <button
              onClick={() => setSelectedBird(null)}
              style={{
                marginTop: "15px",
                padding: "8px 12px",
                borderRadius: "6px",
                border: "none",
                background: "#f87171",
                color: "white",
                cursor: "pointer"
              }}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </Container>
  );
}
