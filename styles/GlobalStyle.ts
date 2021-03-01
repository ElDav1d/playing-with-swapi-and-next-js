import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body,
  h1 {
    margin: 0;
    padding: 0;
  }

  header {

    padding: 1rem;
    background-color: aquamarine;
    width: 100%;
  }

  footer {
    padding: 1rem;
    background-color: aquamarine;
    width: 100%;
  }

  .pagination {
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
