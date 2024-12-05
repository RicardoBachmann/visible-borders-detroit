import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { theme } from "./theme/theme.js";
import { GlobalStyles } from "./styles/GlobalStyles.js";
import Home from "./Pages/Home.jsx";
import VisualGuide from "./Pages/VisualGuide.jsx";
import Header from "./Components/Header.jsx";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/visual-guide" element={<VisualGuide />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
