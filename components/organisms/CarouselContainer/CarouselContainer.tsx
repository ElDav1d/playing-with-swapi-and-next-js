import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";
import Image from "next/image";

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

const CarouselContainer = () => {
  return (
    <Carousel
      autoPlay={true}
      autoPlaySpeed={5000}
      infinite={true}
      responsive={responsive}
      transitionDuration={1000}
      sliderClass={"CarouselContailer_UlOverride"}
    >
      <Image
        src="https://vignette.wikia.nocookie.net/starwars/images/2/20/LukeTLJ.jpg"
        alt=""
        layout="fill"
        objectFit="cover"
      />

      <Image
        src="https://vignette.wikia.nocookie.net/starwars/images/4/48/Chewbacca_TLJ.png"
        alt=""
        layout="fill"
        objectFit="cover"
      />

      <Image
        src="https://vignette.wikia.nocookie.net/starwars/images/e/e2/TFAHanSolo.png"
        alt=""
        layout="fill"
        objectFit="cover"
      />
    </Carousel>
  );
};

export default CarouselContainer;
