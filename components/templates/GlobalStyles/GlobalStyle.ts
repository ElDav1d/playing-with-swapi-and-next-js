import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    background-color: black;
    color: #FFC500;
    text-align: center;
  }

  body,
  body * {
    box-sizing: border-box;
  }

  body,
  h1,
  h3,
  a,
  ul {
    margin: 0;
    padding: 0;
  }

  a {
    display: block;
  }

  header,
  footer {
    padding: 1rem;
    width: 100%;
    box-shadow: 0 1px 5px 2px rgba(255, 197, 0, 0.15);
  }

  ul {
    list-style: none;
  }

  .page-li {
    display: inline-block;
    background: red;
    padding: .75rem;
    margin: .5rem
  }

  .page-li.active{
    background: salmon;
  }

  .previous,
  .next,
  .break-me {
    display: inline-block;
    background: green;
    padding: .75rem;
    margin: .5rem
  }

`;

export default GlobalStyle;
