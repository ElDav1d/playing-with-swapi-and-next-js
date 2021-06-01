import Image from "next/image";

const CarouselPic = ({ path, title, alt }) => {
  return (
    <Image src={path} alt={alt} title={title} layout="fill" objectFit="cover" />
  );
};

export default CarouselPic;
