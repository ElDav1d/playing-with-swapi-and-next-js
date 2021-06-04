import React, { Fragment } from "react";
import GlobalStyle from "../components/templates/GlobalStyles/GlobalStyle";
import { CharactersContextProvider } from "../context/Characters";
import "../components/organisms/CarouselContainer/CarouselContainer.css";

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
