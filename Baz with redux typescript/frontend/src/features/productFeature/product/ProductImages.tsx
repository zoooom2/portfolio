import Carousel from 'nuka-carousel';

const ProductImages = ({ images = [] }: { images: string[] }) => {
  return (
    <Carousel withoutControls={true} className='h-[40vh] tablet:h-screen'>
      {images.map((image, index) => (
        <img key={index} src={image} alt='' className='w-full object-contain' />
      ))}
    </Carousel>
  );
};
export default ProductImages;
