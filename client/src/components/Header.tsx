import styled from "styled-components";
import { Link } from "react-router-dom";

const HeaderContainer = styled.header`
  background: #fdf8f4;
  color: #4a2e19;
  padding: 16px 32px;
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 1000;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.5rem;
    padding: 16px;
  }
`;

const Logo = styled.a`
  font-size: 2.2rem;
  font-family: "Playfair Display", serif;
  font-weight: bold;
  text-decoration: none;
  color: #4a2e19;
  transition: color 0.3s ease;

  &:hover {
    color: #d9a7b5;
  }

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;

  a {
    text-decoration: none;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    background-color: rgba(255, 255, 255, 0.5);
    color: #4a2e19;
    font-weight: 600;
    transition: all 0.2s ease;

    &:hover {
      background-color: #d9a7b5;
      color: white;
    }
  }

  @media (max-width: 768px) {
    justify-content: center;
    width: 100%;
  }
`;

function Header() {
  return (
    <HeaderContainer>
      <Logo href="/">Farm Tracker</Logo>
      <Nav>
        <Link to="/sheeps">🐑 Sheeps</Link>
        <Link to="/goats">🐐 Goats</Link>
        <Link to="/chickenandmore">🐔 Chicken and 🦃  more</Link>
      </Nav>
    </HeaderContainer>
  );
}
export default Header;

