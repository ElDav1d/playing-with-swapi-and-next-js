import { mockHomeCarouselPics } from "../mocks";
import { GetStaticProps } from "next";
import { CarouselPics } from "../interfaces";
import styled from "styled-components";
import Layout from "../components/templates/Layout/Layout";
import CarouselContainer from "../components/organisms/CarouselContainer/CarouselContainer";

type Props = {
  picsOnCarousel: CarouselPics;
};

const MainHeading = styled.h1`
  margin: 1rem;

  @media (min-width: 768px) {
    margin: 2.5rem 1rem;
  }

  @media (min-width: 1024px) {
    margin: 3rem 1rem;
  }
`;

const HOME_PAGE_TITLE: string = "Star Wars Character Database Home Page";

export default function Home({ picsOnCarousel }: Props) {
  return (
    <Layout title={HOME_PAGE_TITLE}>
      <MainHeading>{HOME_PAGE_TITLE}</MainHeading>
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
