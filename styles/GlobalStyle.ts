import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
  }

  header {
    position: fixed;
    top: 0;
    padding: 1rem;
    background-color: aquamarine;
    width: 100%;
  }

  footer {
    position: fixed;
    bottom: 0;
    padding: 1rem;
    background-color: aquamarine;
    width: 100%;
  }
`;

export default GlobalStyle;
