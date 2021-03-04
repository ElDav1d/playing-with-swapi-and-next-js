import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { GetStaticProps, GetStaticPaths } from "next";
import { useRouter } from "next/router";
import Layout from "../../components/templates/Layout/Layout";
import CharactersListContainer from "../../components/organisms/CharactersListContainer/CharactersListContainer";

const Title = styled.h1`
  margin: 1rem;
`;

type CharacterItem = {
  name: string;
};

type Props = {
  charactersOnPage: CharacterItem[];
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

  return (
    <Layout title="Star Wars Character Database Home Page">
      <Title>Lister Page{isLoading && ": loading... "}</Title>
      <CharactersListContainer characters={charactersOnPage} />
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
