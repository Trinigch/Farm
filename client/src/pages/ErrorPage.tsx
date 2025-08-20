import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <section
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to top, #f2e8cf 0%, #a7c957 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        fontFamily: "'Playfair Display', serif",
      }}
    >
      <h1 style={{ fontSize: "5rem", marginBottom: "1rem", color: "#283618" }}>
        404
      </h1>
      <p style={{ fontSize: "1.5rem", color: "#6a4c2b", marginBottom: "2rem" }}>
        Oops! Looks like you wandered off the farm fields 🌾
      </p>
      <h2 style={{ fontSize: "2rem", marginBottom: "1.5rem", color: "#283618" }}>
        Page Not Found
      </h2>
      <Link
        to="/"
        style={{
          padding: "12px 24px",
          backgroundColor: "#dda15e",
          color: "#fff",
          borderRadius: "10px",
          textDecoration: "none",
          fontWeight: "bold",
          transition: "background 0.3s",
        }}
        onMouseOver={(e) =>
          (e.currentTarget.style.backgroundColor = "#bc6c25")
        }
        onMouseOut={(e) =>
          (e.currentTarget.style.backgroundColor = "#dda15e")
        }
      >
        Back to Home
      </Link>
    </section>
  );
};

export default ErrorPage;