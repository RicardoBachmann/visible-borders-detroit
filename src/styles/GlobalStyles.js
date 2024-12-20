import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
*,
*::before,
*::after {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

:root {
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;

  color-scheme: light dark;
  color: rgba(255, 255, 255, 0.87);
  background-color: #242424;

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  display: flex;
  place-items: center;
  min-width: 320px;
  min-height: 100vh;
}

/* Root for full screen div */
#root {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
`;
