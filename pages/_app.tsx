import React, { Fragment } from "react";
import GlobalStyle from "../styles/GlobalStyle";
import { VisitedCharactersContextProvider } from "../context/visitedCharacters";

function MyApp({ Component, pageProps }) {
  return (
    <Fragment>
      <GlobalStyle />
      <VisitedCharactersContextProvider>
        <Component {...pageProps} />
      </VisitedCharactersContextProvider>
    </Fragment>
  );
}

export default MyApp;
