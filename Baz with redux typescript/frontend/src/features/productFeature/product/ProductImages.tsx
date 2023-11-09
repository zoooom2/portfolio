import Carousel from 'nuka-carousel';

const ProductImages = ({ images = [] }: { images: string[] }) => {
  return (
    <Carousel>
      {images.map((image, index) => (
        <img key={index} src={image} alt='' />
      ))}
    </Carousel>
  );
};
export default ProductImages;
