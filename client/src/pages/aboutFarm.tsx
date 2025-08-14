import { useEffect, useState } from "react";
import SummaryCard from "../components/SummaryCard"; 
import sheepImage from "./../assets/img/moresheeps.jpeg";
import { Container, ImageContainer, CardsRow, CardContainer } from "./aboutFarm.styles";
import { Sheep, Goat } from "./../interfaces/models";


  

interface SummaryByYear<T> {
  [year: string]: T[];
}

function AboutFarm() {
  const [sheeps, setSheeps] = useState<Sheep[]>([]);
  const [goats, setGoats] = useState<Goat[]>([]);
  const [sheepsByYear, setSheepsByYear] = useState<SummaryByYear<Sheep>>({});
  const [goatsByYear, setGoatsByYear] = useState<SummaryByYear<Goat>>({});

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/animals/");
      const data: any[] = await res.json();

      const sheepsData: Sheep[] = data.filter(a => a.especie === "oveja");
      const goatsData: Goat[] = data.filter(a => a.especie === "cabra");

      setSheeps(sheepsData);
      setGoats(goatsData);

      const groupByYear = <T extends { fecha_nacimiento: string ; estado?: string}>(animals: T[]) => {
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
    };

    fetchData();
  }, []);

  // Unir todos los años presentes en ovejas y cabras
  const allYears = Array.from(
    new Set([...Object.keys(sheepsByYear), ...Object.keys(goatsByYear)])
  ).sort((a, b) => Number(b) - Number(a));

  return (
    <Container>
      <ImageContainer background={sheepImage}>
        <h2 style={{
          marginTop: "40px",
          textAlign: "center",
          marginBottom: "20px",
          color: "#fff8e1",
          fontSize: "2rem"
        }}>
          Total of Animals
        </h2>

        {allYears.map((year) => (
          <div key={year} style={{ marginBottom: "40px" }}>
            <h3 style={{ textAlign: "center", color: "#fff8e1" }}>{year}</h3>
            <CardsRow>
              {/* Ovejas */}
              <CardContainer>
                <SummaryCard
                  title="Sheep"
                  value={sheepsByYear[year]?.length || 0}
                />
                <ul style={{ color: "#faf0e1", marginTop: "8px" }}>
                  {sheepsByYear[year]?.map((sheep) => (
                    <li key={sheep.id}>
                      {sheep.nombre} — {sheep.breed || "No breed"}
                    </li>
                  ))}
                </ul>
              </CardContainer>

              {/* Cabras */}
              <CardContainer>
                <SummaryCard
                  title="Goats"
                  value={goatsByYear[year]?.length || 0}
                />
                <ul style={{ color: "#fff8e1", marginTop: "8px" }}>
                  {goatsByYear[year]?.map((goat) => (
                    <li key={goat.id}>
                      {goat.nombre} — {goat.breed || "No breed"}
                    </li>
                  ))}
                </ul>
              </CardContainer>
            </CardsRow>
          </div>
        ))}
      </ImageContainer>
    </Container>
  );
}
export default AboutFarm;