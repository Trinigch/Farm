import styled from "styled-components";


export const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background-color: #fdf8f4;
  padding: 20px 10px;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

export const Title = styled.h2`
  font-family: "Playfair Display", serif;
  font-size: 2.5rem;
  color: #333;
  position: absolute;
  margin-top:40px;
  top: 6.5%;
  right: 20%;
  transform: translate(-50%);
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.3);
  white-space: nowrap;
   @media (max-width: 800px) {
     margin-top:80px;
    font-size: 4rem;
     
  }
    @media (max-width: 650px) {
      margin-top:80px;
      font-size: 3rem;
  }
     @media (max-width: 450px) {
        margin-top:80px;
        font-size: 2rem;
  }
  
`;




export const DateTitle = styled.h1`
  font-family: "Playfair Display", serif;
  font-size: 4.5rem;
  color: #D4AF37; /* Color dorado */
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.4); /* Sombra sutil para resaltar */
  margin-top: 20px;

  @media (max-width: 800px) {
    font-size: 2.5rem;
  }
  @media (max-width: 450px) {
    font-size: 2rem;
  }
`;
export const ImageContainer = styled.div<{ background?: string }>`
  position: relative;
  width: 100%;
  min-height: 100vh;
  max-width: 1200px;
  background: ${(props) => (props.background
      ? `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.7)), url(${props.background}) center/cover no-repeat`
   : "#3e3e3e")};
  border-radius: 10px;
  margin: 50px 0px;
  padding-bottom: 40px;

  @media (max-width: 800px) {
    width: 100%;
    min-height: 100vh;
    margin: 20px;
  }
`;

export const SectionContainer = styled.div.withConfig({shouldForwardProp: (prop) => prop !== 'reverse' })<{ reverse?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-top: 140px 0px;
  padding: 20px 20px;
  flex-direction: ${(props) => (props.reverse ? 'row-reverse' : 'row')};
  
  @media (max-width: 768px) {
    flex-direction: column-reverse; /* Imagen arriba en pantallas pequeñas */
    align-items: center;
    text-align: center;
  }
`;


export const StyledImage = styled.div<{ image: string }>`
  width: 50%;
  max-width: 700px; 
  height: 450px;
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-position: center;
  border-radius: 10px;
  margin: 0px auto; /* Centra y añade margen lateral */
  margin-bottom: 20px 0; /* Espaciado con el texto */
  @media (max-width: 768px) {
    width: 200px; /* Ajusta el tamaño de la imagen */
    height: 200px; 
    border-radius: 50%; /* Hace la imagen circular */
    margin-bottom: 20px 0; /* Espaciado con el texto */
  }
  @media (max-width: 280px) {
  display: none
  }
`;

export const TextContainer = styled.div`
  width: 45%;
  text-align: center;
   @media (max-width: 768px) {
   font-size: 1rem;
  };
    @media (max-width: 600px) {
    width: 100%;  /* Hace que el texto ocupe todo el ancho */
    font-size: 1rem;
    padding: 0 20px; /* Agrega algo de padding para evitar que el texto toque los bordes */
  }
`;

export const SectionTitle = styled.h2`
  font-family: "Playfair Display", serif;
  font-size: 3.5rem;
  font-weight: bold;
  color: #333;
  text-align: center; 
   @media (max-width: 768px) {
      font-size: 1.5rem;
      padding: 10px;
  }
`;

export const SectionText = styled.p`
  font-size: 1.5rem;
  color: #5a5a5a;
  font-style: italic;
  margin-top: 15px 0px;
`;

export const ConfirmationSection = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
  position: relative;
   @media (max-width: 450px) {
      font-size: 1rem;
      border-radius: 50px;
  
  }
`;



 export const ConfirmationText = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 2.5rem;
  font-style: italic;
  padding: 2px;
  text-align: center;
   @media (max-width: 450px) {
      font-size: 2rem;
      border-radius: 100px;
  }
`;
export const CardsRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  margin-top: 2rem;
  flex-wrap: nowrap;
  overflow-x: auto;
  justify-content: center;
  width: 100%;

  & > * {
    min-width: 200px;
  }
`;
export const CardContainer = styled.div`
  background: rgba(255, 255, 255, 0.15); 
  backdrop-filter: blur(10px); 
  -webkit-backdrop-filter: blur(10px);
  border-radius: 16px;
  box-shadow: 0 6px 16px rgba(0,0,0,0.3);
  padding: 16px;
  color: #fff; 
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 20px rgba(0,0,0,0.5);
  }`;

  export const SectionHeader = styled.h2`
  font-size: 2.2rem;
  color: #fff8e1;
  margin: 40px 0 20px;
  text-shadow: 2px 2px 8px rgba(0,0,0,0.4);
`;
export const ButtonRow = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-top: 2rem;
  gap: 1rem;

  a {
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    background-color: rgba(255, 255, 255, 0.3);
    border: 1px solid #ddd;
    color: #333;
    font-weight: 600;
    backdrop-filter: blur(4px);
    transition: all 0.3s ease;

    &:hover {
      background-color: rgba(255, 255, 255, 0.6);
      color: #000;
      transform: scale(1.05);
    }
  }
`;
export const AnimalList = styled.ul`
  margin-top: 10px;
  padding-left: 0;
  list-style: none;
  color: #fdfdfd;
  font-size: 0.95rem;

  li {
    background: rgba(255, 255, 255, 0.1);
    margin: 4px 0;
    padding: 6px 10px;
    border-radius: 6px;
    transition: background 0.2s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.2);
    }
  }
`;