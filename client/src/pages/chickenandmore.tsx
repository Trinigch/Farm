import { useEffect, useState } from "react";
import SummaryCard from "../components/SummaryCard"; 
import moreImage from "./../assets/img/cats.jpeg";
import { Container, ImageContainer, Title, CardsRow, CardContainer } from "./aboutFarm.styles";

interface Bird {
  id: number;
  especie: string; // "chicken" o "turkey"
  estado: string; // "alive" o "deceased"
}

function AboutFarm() {
  const [birds, setBirds] = useState<Bird[]>([]);

  useEffect(() => {
    const fetchBirds = async () => {
      const res = await fetch("/api/animals/");
      const data: Bird[] = await res.json();
      // Filtramos solo aves vivas
      const aliveBirds = data.filter(b => ["chicken", "turkey", "duck"].includes(b.especie) && b.estado !== "deceased");
      setBirds(aliveBirds);
    };
    fetchBirds();
  }, []);

  // Contar por especie
  const counts: Record<string, number> = { chicken: 0, turkey: 0, duck: 0 };
  birds.forEach(b => {
    if (counts[b.especie] !== undefined) counts[b.especie]++;
  });

  return (
    <Container>
      <div className="flex flex-col items-center p-2">
        <Title>{"🐔 Chicken and 🦃 More"}</Title>
      </div>

      <ImageContainer background={moreImage}>
        <CardsRow>
          <CardContainer>
            <SummaryCard title="Chicks" value={counts.chicken} icon="🐔" />
            <SummaryCard title="Duckies" value={counts.duck} icon="🦆" />
            <SummaryCard title="Turkeys" value={counts.turkey} icon="🦃" />
          </CardContainer>
          <CardContainer>
            <SummaryCard title="New born" value={0} icon="🐤" />
          </CardContainer>
   
        </CardsRow>
      </ImageContainer>
    </Container>
  );
}

export default AboutFarm;