import styled from "styled-components";
import { GetStaticProps, GetStaticPaths } from "next";
import Layout from "../../components/templates/Layout/Layout";

const Title = styled.h1`
  margin: 1rem;
`;

type CharacterData = {
  name: string;
};

type Props = {
  character: CharacterData;
};

type PageParam = string;

export default function CharacterPage({ character }: Props) {
  return (
    <Layout title={`${character.name}'s page`}>
      <Title>{character.name}</Title>
    </Layout>
  );
}

const getCharacterData = async (id: PageParam) => {
  const res = await fetch(`https://swapi.dev/api/people/${id}/`);
  const data = await res.json();
  return data;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch("https://swapi.dev/api/people/");
  const data = await res.json();

  const pathsArray = () => {
    let paths = [];
    for (let index = 1; index <= data.count; index++) {
      const path = {
        params: {
          id: index.toString(),
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
  const page: any = params.id;

  const character = await getCharacterData(page);

  return {
    props: {
      character,
    },
  };
};
