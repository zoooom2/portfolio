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
      className='h-full'>
      {images.map((image, index) => (
        <img key={index} src={image} alt='' className='w-full object-contain' />
      ))}
    </Carousel>
  );
};
export default ProductImages;
