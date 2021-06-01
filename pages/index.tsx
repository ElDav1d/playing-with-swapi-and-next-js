import { mockHomeCarouselPics } from "../mocks";
import { GetStaticProps } from "next";
import { CarouselPics } from "../interfaces";
import styled from "styled-components";
import Layout from "../components/templates/Layout/Layout";
import CarouselContainer from "../components/organisms/CarouselContainer/CarouselContainer";

type Props = {
  picsOnCarousel: CarouselPics;
};

const Title = styled.h1`
  margin: 1rem;
  @media (min-width: 768px) {
    margin: 2.5rem 1rem;
  }
  @media (min-width: 1024px) {
    margin: 3rem 1rem;
  }
`;

export default function Home({ picsOnCarousel }: Props) {
  return (
    <Layout title="Star Wars Character Database Home Page">
      <Title>Home Page</Title>
      <CarouselContainer carouselPics={picsOnCarousel} />
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const picsOnCarousel = mockHomeCarouselPics;

  return {
    props: {
      picsOnCarousel,
    },
  };
};
