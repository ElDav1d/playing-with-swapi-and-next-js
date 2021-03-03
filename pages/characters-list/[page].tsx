import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { GetStaticProps, GetStaticPaths } from "next";
import Link from "next/Link";
import { useRouter } from "next/router";
import ReactPaginate from "react-paginate";
import Layout from "../../components/templates/Layout/Layout";
// import { useAppContext } from "../../../context/store.js";

const Title = styled.h1`
  margin: 1rem;
`;

type CharacterItem = {
  name: string;
};

type Props = {
  charactersOnPage: CharacterItem[];
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
  // const [state, dispatcher] = useAppContext();

  useEffect(() => {
    router.events.on("routeChangeStart", startLoading);
    router.events.on("routeChangeComplete", stopLoading);

    return () => {
      router.events.off("routeChangeStart", startLoading);
      router.events.off("routeChangeComplete", stopLoading);
    };
  }, []);

  const calcItemId = (itemIndex: number, currentPage: number) => {
    if (currentPage === 1) return itemIndex;
    return itemIndex + (currentPage - 1) * 10;
  };

  const getItemId = (index: number) => {
    const currentPage: number = +router.query.page;

    return calcItemId(index + 1, currentPage);
  };

  const charactersList = (
    <ul>
      {charactersOnPage.map(({ name }, index) => (
        <li key={index}>
          <Link href={`/character/${getItemId(index)}`}>
            <a>
              <h2>{name}</h2>
              <p>{getItemId(index)}</p>
            </a>
          </Link>
        </li>
      ))}
    </ul>
  );

  const paginationHandler = (page: PageIndex) => {
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
        onPageChange={paginationHandler}
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
  const res = await fetch("https://swapi.dev/api/people/");
  const data = await res.json();
  const charactersCount = data.count;
  const maxCharsPerPage = data.results.length;

  const pathsArray = () => {
    let paths = [];
    let counter = 0;
    for (let index = 1; index < charactersCount; index += maxCharsPerPage) {
      counter++;
      const path = {
        params: {
          page: counter.toString(),
        },
      };
      paths.push(path);
    }
    return paths;
  };

  return {
    paths: pathsArray(),
    fallback: true,
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
