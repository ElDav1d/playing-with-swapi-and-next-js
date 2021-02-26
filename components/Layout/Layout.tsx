import React, { Fragment } from "react";
import { ReactNode } from "react";
import Head from "next/head";

type Props = {
  children: ReactNode;
  title: string;
};

const Layout = ({ children, title }: Props) => {
  return (
    <Fragment>
      <Head>
        <title>{title}</title>
      </Head>
      <header>HEADER</header>
      <main>{children}</main>
      <footer>FOOTER</footer>
    </Fragment>
  );
};

export default Layout;
