import styled from "styled-components";
import Layout from "../components/templates/Layout/Layout";
import CarouselContainer from "../components/organisms/CarouselContainer/CarouselContainer";

const Title = styled.h1`
  margin: 1rem;
  @media (min-width: 768px) {
    margin: 2.5rem 1rem;
  }
  @media (min-width: 1024px) {
    margin: 3rem 1rem;
  }
`;

export default function Home() {
  return (
    <Layout title="Star Wars Character Database Home Page">
      <Title>Home Page</Title>
      <CarouselContainer />
    </Layout>
  );
}
