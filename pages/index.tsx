import Layout from "../components/Layout/Layout";
import styled from "styled-components";

const Title = styled.h1`
  color: red;
  margin: 5rem 1rem;
`;

export default function Home() {
  return (
    <Layout title="Star Wars Character Database Home Page">
      <Title>Hello World</Title>
    </Layout>
  );
}
