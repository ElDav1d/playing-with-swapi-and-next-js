import "react-multi-carousel/lib/styles.css";
import CarouselPic from "../../atoms/CarouselPic/CarouselPic";
import Carousel from "react-multi-carousel";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 768 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 768, min: 0 },
    items: 1,
  },
};

const CarouselContainer = ({ carouselPics }) => {
  return (
    <Carousel
      autoPlay={true}
      autoPlaySpeed={5000}
      infinite={true}
      responsive={responsive}
      transitionDuration={1000}
      sliderClass={"CarouselContailer_UlOverride"}
    >
      {carouselPics.map(({ path, title, alt }, index) => (
        <CarouselPic path={path} title={title} alt={alt} key={index} />
      ))}
    </Carousel>
  );
};

export default CarouselContainer;
