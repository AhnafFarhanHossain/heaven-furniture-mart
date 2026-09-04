import { createContext, useContext } from "react";

// Holds the shared Lenis smooth-scroll instance so components like the
// Navbar can trigger programmatic smooth scrolling (lenis.scrollTo).
export const LenisContext = createContext(null);

export const useLenis = () => useContext(LenisContext);
