import styled from "styled-components";
import { GetStaticProps, GetStaticPaths } from "next";

import { CharacterItems } from "../../interfaces";
import { useCharactersContext } from "../../context/Characters";
import Layout from "../../components/templates/Layout/Layout";
import CharactersListContainer from "../../components/organisms/CharactersListContainer/CharactersListContainer";
import { getNestedData } from "../../utils";

const Title = styled.h1`
  margin: 1rem;
`;

type Props = {
  charactersOnPage: CharacterItems;
};

type PageParam = string;

export default function ListerPage({ charactersOnPage }: Props) {
  const { state } = useCharactersContext();
  const filterKeyword: string = state.filterCharactersKeyword;
  const filteredCharacters = charactersOnPage.filter(
    ({ name, species, homeworld, films }) => {
      return (
        name.toLowerCase().includes(filterKeyword) ||
        species.join().toLowerCase().includes(filterKeyword) ||
        homeworld.toLowerCase().includes(filterKeyword) ||
        films.join().toLowerCase().includes(filterKeyword)
      );
    }
  );

  return (
    <Layout title="Star Wars Character Database Home Page">
      <CharactersListContainer characters={filteredCharacters} />
    </Layout>
  );
}

const getPageData = async (page: PageParam) => {
  const res = await fetch(`https://swapi.dev/api/people/?page=${page}`);
  const data = await res.json();

  const pageData = await Promise.all(
    data.results.map(async ({ name, species, homeworld, films }) => {
      return {
        name: name,
        species: await getNestedData(species, "name"),
        homeworld: await getNestedData(homeworld, "name"),
        films: await getNestedData(films, "title"),
      };
    })
  );

  return pageData;
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
  const charactersOnPage = await getPageData(page);

  return {
    props: {
      charactersOnPage,
    },
  };
};
