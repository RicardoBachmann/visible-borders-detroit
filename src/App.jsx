import React from "react";
import MapboxLayer from "./Components/MapboxLayer";
import { ThemeProvider } from "styled-components";

import { theme } from "./theme.js";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <MapboxLayer />
    </ThemeProvider>
  );
}

export default App;
