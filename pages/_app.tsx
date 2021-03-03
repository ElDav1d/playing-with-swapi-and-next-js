import React, { Fragment } from "react";
import GlobalStyle from "../styles/GlobalStyle";
import { AppContextWrapper } from "../context/store.js";

function MyApp({ Component, pageProps }) {
  return (
    <Fragment>
      <GlobalStyle />
      <AppContextWrapper>
        <Component {...pageProps} />
      </AppContextWrapper>
    </Fragment>
  );
}

export default MyApp;
