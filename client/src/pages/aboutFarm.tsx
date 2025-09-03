import { useEffect, useState } from "react";
import SummaryCard from "../components/SummaryCard"; 
import sheepImage from "./../assets/img/moresheeps.jpeg";
import { Container, ImageContainer, CardsRow, CardContainer, SectionHeader, AnimalList } from "./aboutFarm.styles";
import { Sheep, Goat, Bird } from "./../interfaces/models";

interface SummaryByYear<T> {
  [year: string]: T[];
}

function AboutFarm() {
  const [sheeps, setSheeps] = useState<Sheep[]>([]);
  const [goats, setGoats] = useState<Goat[]>([]);
  const [birds, setBirds] = useState<Bird[]>([]);
  
  const [sheepsByYear, setSheepsByYear] = useState<SummaryByYear<Sheep>>({});
  const [goatsByYear, setGoatsByYear] = useState<SummaryByYear<Goat>>({});
  const [birdsByYear, setBirdsByYear] = useState<SummaryByYear<Bird>>({});

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/animals/");
      const data: any[] = await res.json();

      const sheepsData: Sheep[] = data.filter(a => a.especie === "sheep");
      const goatsData: Goat[] = data.filter(a => a.especie === "goat");
      const birdsData: Bird[] = data.filter(a => 
        ["chicken", "duck", "turkey"].includes(a.especie)
      );

      setSheeps(sheepsData);
      setGoats(goatsData);
      setBirds(birdsData);

      const groupByYear = <T extends { fecha_nacimiento: string; estado?: string }>(animals: T[]) => {
        const summary: SummaryByYear<T> = {};
        animals.forEach(a => {
          if (a.estado === "deceased") return;
          const year = new Date(a.fecha_nacimiento).getFullYear().toString();
          if (!summary[year]) summary[year] = [];
          summary[year].push(a);
        });
        return summary;
      };

      setSheepsByYear(groupByYear(sheepsData));
      setGoatsByYear(groupByYear(goatsData));
      setBirdsByYear(groupByYear(birdsData));
    };

    fetchData();
  }, []);

  // Unir todos los años presentes
  const allYears = Array.from(
    new Set([
      ...Object.keys(sheepsByYear),
      ...Object.keys(goatsByYear),
      ...Object.keys(birdsByYear),
    ])
  ).sort((a, b) => Number(b) - Number(a));

  return (
    <Container>
      <ImageContainer background={sheepImage}>
        <SectionHeader>Total of Animals</SectionHeader>
          <CardsRow>
            <CardContainer>
                <SummaryCard
                  title="Sheeps"
                  value={sheeps.length || 0}
                />
                <SummaryCard
                  title="Goats"
                  value={goats.length || 0}
                />
                <SummaryCard
                  title="Birds"
                  value={birds.length || 0}
                />
              </CardContainer>
              </CardsRow>
        {allYears.map((year) => (
          <div key={year} style={{ marginBottom: "40px" }}>


            <h3 style={{ textAlign: "center", color: "#fff8e1" }}>{year}</h3>
            <CardsRow>
              {/* Ovejas */}
              <CardContainer>
                <SummaryCard
                  title="Sheeps"
                  value={sheepsByYear[year]?.length || 0}
                />
                <AnimalList style={{ color: "#faf0e1", marginTop: "8px" }}>
                  {sheepsByYear[year]?.map((sheep) => (
                    <li key={sheep.id}>
                      {sheep.nombre} — {sheep.breed || "No breed"}
                    </li>
                  ))}
                </AnimalList>
              </CardContainer>

              {/* Cabras */}
              <CardContainer>
                <SummaryCard
                  title="Goats"
                  value={goatsByYear[year]?.length || 0}
                />
                <AnimalList style={{ color: "#fff8e1", marginTop: "8px" }}>
                  {goatsByYear[year]?.map((goat) => (
                    <li key={goat.id}>
                      {goat.nombre} — {goat.breed || "No breed"}
                    </li>
                  ))}
                </AnimalList>
              </CardContainer>

              {/* Aves */}
              <CardContainer>
                <SummaryCard
                  title="Birds"
                  value={birdsByYear[year]?.length || 0}
                />
                <AnimalList style={{ color: "#fff8e1", marginTop: "8px" }}>
                  {birdsByYear[year]?.map((bird) => (
                    <li key={bird.id}>
                      {bird.nombre} — {bird.especie}
                    </li>
                  ))}
                </AnimalList>
              </CardContainer>
            </CardsRow>
          </div>
        ))}
      </ImageContainer>
    </Container>
  );
}

export default AboutFarm;
