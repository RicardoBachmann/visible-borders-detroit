import React from "react";
import MapboxLayer from "./Components/MapboxLayer";
import { ThemeProvider } from "styled-components";
import Header from "./Components/Header.jsx";
import { theme } from "./theme.js";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <MapboxLayer />
    </ThemeProvider>
  );
}

export default App;
