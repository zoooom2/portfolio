import Carousel from 'nuka-carousel';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

type voidFunc = () => void;

const ProductImages = ({ images = [] }: { images: string[] }) => {
  return (
    <Carousel
      withoutControls={false}
      renderCenterLeftControls={({
        previousSlide,
      }: {
        previousSlide: voidFunc;
      }) => (
        <button onClick={previousSlide} className='text-2xl'>
          <MdKeyboardArrowLeft />
        </button>
      )}
      renderCenterRightControls={({ nextSlide }: { nextSlide: voidFunc }) => (
        <button onClick={nextSlide} className='text-2xl'>
          <MdKeyboardArrowRight />
        </button>
      )}
      className=''>
      {images.map((image, index) => (
        <div key={index} className='h-full grid items-center'>
          <img
            key={index}
            src={image}
            alt=''
            className='min-w-fit object-contain'
          />
        </div>
      ))}
    </Carousel>
  );
};
export default ProductImages;
