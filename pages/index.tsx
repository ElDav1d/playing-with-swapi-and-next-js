import { mockHomeCarouselPics } from "../mocks";
import { GetStaticProps } from "next";
import { CarouselPics } from "../interfaces";
import Layout from "../components/templates/Layout/Layout";
import CarouselContainer from "../components/organisms/CarouselContainer/CarouselContainer";
import { MainHeading } from "../components/atoms/StyledHeadings/StyledHeadings";

type Props = {
  picsOnCarousel: CarouselPics;
};

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
