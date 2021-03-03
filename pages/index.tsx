import styled from "styled-components";
import Layout from "../components/templates/Layout/Layout";

const Title = styled.h1`
  margin: 5rem 1rem;
`;

export default function Home() {
  return (
    <Layout title="Star Wars Character Database Home Page">
      <Title>Home Page</Title>
    </Layout>
  );
}
