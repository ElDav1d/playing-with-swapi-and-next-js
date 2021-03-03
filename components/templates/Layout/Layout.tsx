import React, { Fragment } from "react";
import { ReactNode } from "react";
import Head from "next/head";
import Header from "../../organisms/Header/Header";
import Footer from "../../organisms/Footer/Footer";

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
      <Header />
      <main>{children}</main>
      <Footer />
    </Fragment>
  );
};

export default Layout;
