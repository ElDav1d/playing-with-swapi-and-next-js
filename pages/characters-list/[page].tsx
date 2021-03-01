import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { GetStaticProps, GetStaticPaths } from "next";
import { useRouter } from "next/router";
import ReactPaginate from "react-paginate";
import Layout from "../../components/Layout/Layout";

const Title = styled.h1`
  color: red;
  margin: 1rem;
`;

type Character = {
  name: string;
};

type Props = {
  charactersOnPage: Character[];
};

type PageIndex = {
  selected: number;
};

type PageParam = string;

export default function ListerPage({ charactersOnPage }: Props) {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const startLoading = () => setLoading(true);
  const stopLoading = () => setLoading(false);

  useEffect(() => {
    router.events.on("routeChangeStart", startLoading);
    router.events.on("routeChangeComplete", stopLoading);

    return () => {
      router.events.off("routeChangeStart", startLoading);
      router.events.off("routeChangeComplete", stopLoading);
    };
  }, []);

  const charactersList = (
    <ul>
      {charactersOnPage.map(({ name }) => (
        <li key={name}>
          <h2>{name}</h2>
        </li>
      ))}
    </ul>
  );

  const pagginationHandler = (page: PageIndex) => {
    const selectedPath = (page.selected + 1).toString();

    router.push({
      pathname: selectedPath,
    });
  };

  return (
    <Layout title="Star Wars Character Database Home Page">
      <Title>Lister Page{isLoading && ": loading... "}</Title>
      {charactersList}
      <ReactPaginate
        pageCount={9}
        pageRangeDisplayed={5}
        marginPagesDisplayed={2}
        previousLabel={"previous"}
        nextLabel={"next"}
        breakClassName={"break-me"}
        pageClassName={"page-li"}
        pageLinkClassName={"page-link"}
        breakLabel={"..."}
        activeClassName={"active"}
        containerClassName={"pagination"}
        subContainerClassName={"pages pagination"}
        onPageChange={pagginationHandler}
      />
    </Layout>
  );
}

const getPageData = async (page: PageParam) => {
  const res = await fetch(`https://swapi.dev/api/people/?page=${page}`);
  const data = await res.json();

  return data;
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { page: "1" } },
      { params: { page: "2" } },
      { params: { page: "3" } },
      { params: { page: "4" } },
      { params: { page: "5" } },
      { params: { page: "6" } },
      { params: { page: "7" } },
      { params: { page: "8" } },
      { params: { page: "9" } },
    ],
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const page: any = params.page;

  const data = await getPageData(page);
  const charactersOnPage = data.results;

  return {
    props: {
      charactersOnPage,
    },
  };
};
