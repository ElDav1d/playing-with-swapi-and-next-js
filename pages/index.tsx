import Layout from "../components/Layout/Layout";
import styled from "styled-components";
import Link from "next/Link";

const Title = styled.h1`
  color: red;
  margin: 5rem 1rem;
`;

export default function Home() {
  return (
    <Layout title="Star Wars Character Database Home Page">
      <Title>Home Page</Title>
      <Link href={`/characters-list/1`}>
        <a>START</a>
      </Link>
    </Layout>
  );
}
