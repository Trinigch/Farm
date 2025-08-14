import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from './components/Header';
import styled from "styled-components";
import Footer from './components/Footer';

const Layout = styled.div`
  display: flex;
  flex-direction: row;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

function App() {
  return (
      <>
      <Header />
      <Layout>
        <Sidebar />
        <main style={{ flex: 1, padding: "0rem" }}>
          <Outlet />
        </main>
      </Layout>
      <Footer />
    </>
  );
}

export default App;
