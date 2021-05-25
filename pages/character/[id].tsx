import styled from "styled-components";
import { GetStaticProps, GetStaticPaths } from "next";

import { CharacterDetailData } from "../../interfaces";
import GoBackLink from "../../components/atoms/GoBackLink/GoBackLink";
import Layout from "../../components/templates/Layout/Layout";

const Title = styled.h1`
  margin: 1rem;
`;

type Props = {
  character: CharacterDetailData;
};

type PageParam = string;

export default function CharacterPage({ character }: Props) {
  return (
    <Layout title={`${character.name}'s page`}>
      <Title>{character.name}</Title>
      <h2>SPECIES</h2>
      <p>{character.species}</p>
      <h2>HOMEWORLD</h2>
      <p>{character.homeworld}</p>
      <h2>HEIGHT</h2>
      <p>{character.height}</p>
      <h2>MASS</h2>
      <p>{character.mass}</p>
      <h2>HAIR COLOR</h2>
      <p>{character.hair_color}</p>
      <h2>SKIN COLOR</h2>
      <p>{character.skin_color}</p>
      <h2>EYE COLOR</h2>
      <p>{character.eye_color}</p>
      <h2>GENDER</h2>
      <p>{character.gender}</p>
      <ul>
        {character.films.map((film, index) => (
          <li key={index}>{film}</li>
        ))}
      </ul>
      <GoBackLink />
    </Layout>
  );
}

const getCharacterData = async (id: PageParam) => {
  const res = await fetch(`https://swapi.dev/api/people/${id}/`);
  const data = await res.json();

  return {
    name: data.name,
    species: await getNestedData(data.species, "name"),
    homeworld: await getNestedData(data.homeworld, "name"),
    height: data.height,
    mass: data.mass,
    hair_color: data.hair_color,
    skin_color: data.skin_color,
    eye_color: data.eye_color,
    gender: data.gender,
    films: await getNestedData(data.films, "title"),
  };
};

const getNestedData = async (data: string | string[], key: string) => {
  if (typeof data === "string") {
    return getStringData(data, key);
  } else {
    return getArrayData(data, key);
  }
};

const getStringData = async (data: string, key: string) => {
  const res = await fetch(`${data}`);
  const dataItem = await res.json();

  return dataItem[key];
};

const getArrayData = async (data: string[], key: string) => {
  if (data.length) {
    const errorMessage = [];

    const nestedData = await Promise.all(
      data.map(async dataURL => {
        const res = await fetch(`${dataURL}`);
        const dataItem = await res.json();

        if (!res.ok) {
          errorMessage.push("Sorry, there's a disturbance on The Force");
          throw new Error(`An error has occured: ${res.status}`);
        } else {
          return dataItem[key];
        }
      })
    );

    return errorMessage.length ? errorMessage : nestedData;
  } else {
    return ["Sorry, this data is unknown!"];
  }
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
