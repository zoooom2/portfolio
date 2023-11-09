import Carousel from 'nuka-carousel';

const ProductImages = ({ images = [] }: { images: string[] }) => {
  return (
    <Carousel className='h-full'>
      {images.map((image, index) => (
        <div className='pb-4 flex items-center justify-center'>
          <img
            key={index}
            src={image}
            alt=''
            className='w-full object-contain'
          />
        </div>
      ))}
    </Carousel>
  );
};
export default ProductImages;
