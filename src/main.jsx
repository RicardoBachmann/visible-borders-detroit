import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./styles/GlobalStyles.js";
import { theme } from "./theme/theme.js";

import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={theme}>
    <StrictMode>
      <GlobalStyles />
      <App />
    </StrictMode>
  </ThemeProvider>
);
