import React, { Fragment } from "react";
import GlobalStyle from "../styles/GlobalStyle";
import { CharactersContextProvider } from "../context/Characters";

function MyApp({ Component, pageProps }) {
  return (
    <Fragment>
      <GlobalStyle />
      <CharactersContextProvider>
        <Component {...pageProps} />
      </CharactersContextProvider>
    </Fragment>
  );
}

export default MyApp;
