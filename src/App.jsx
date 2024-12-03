import React from "react";
import MapboxLayer from "./Components/MapboxLayer";
import { ThemeProvider } from "styled-components";
import { theme } from "./theme/theme.js";
import { GlobalStyles } from "./styles/GlobalStyles.js";
import Header from "./Components/Header.jsx";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Header />
      <MapboxLayer />
    </ThemeProvider>
  );
}

export default App;
