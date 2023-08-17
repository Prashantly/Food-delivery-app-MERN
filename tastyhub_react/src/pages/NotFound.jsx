import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="not-found-container" style={styles.notFoundContainer}>
      <div className="not-found-content" style={styles.notFoundContent}>
        <h1 style={styles.heading1}>Oops! Page not found</h1>
        <p style={styles.para}>
          The page you are looking for might have been removed or is temporarily
          unavailable.
        </p>
        <Link
          to="/"
          className="back-to-home"
          style={(styles.backToHome, styles.backToHomeHover)}
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

const styles = {
  notFoundContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#f4f4f4",
  },

  notFoundContent: {
    textAlign: "center",
    padding: "30px",
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },

  heading1: {
    fontSize: "3rem",
    marginBottom: "10px",
    color: "#333",
  },

  para: {
    fontSize: "1.2rem",
    marginBottom: "20px",
    color: "#666",
  },

  backToHome: {
    display: "inline-block",
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "10px 20px",
    borderRadius: "5px",
    textDecoration: "none",
    fontWeight: "bold",
    transition: "background-color 0.2s",
  },

  backToHomeHover: {
    backgroundColor: "#0056b3",
  },
};

export default NotFound;
