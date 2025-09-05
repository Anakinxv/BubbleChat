"use client";

const actualAppearance = () => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("appearance");
    if (stored) {
      return stored;
    } else {
      return "Navbar Superior"; // Valor por defecto si no hay nada en localStorage
    }
  }
};

export default actualAppearance;
