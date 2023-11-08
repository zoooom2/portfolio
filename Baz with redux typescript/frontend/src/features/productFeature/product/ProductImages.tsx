// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';

const ProductImages = ({ images = [] }: { images: string[] }) => {
  //   return (
  //     <Wrapper className='p-5'>
  //       <div className='w-full h-auto flex justify-center p-8'>
  //         <img
  //           loading='lazy'
  //           src={images[index]}
  //           alt='main'
  //           className='object-contain h-full'
  //         />
  //       </div>

  //       <div className='gallery'>
  //         {images.map((image, count) => {
  //           return (
  //             <div
  //               className={`flex items-center ${
  //                 image === images[index] ? 'active' : null
  //               } p-3 h-[130px] w-[125px] cursor-pointer object-contain`}>
  //               <img
  //                 src={image}
  //                 loading='lazy'
  //                 alt=''
  //                 key={count}
  //                 onClick={() => setIndex(count)}
  //               />
  //             </div>
  //           );
  //         })}
  //       </div>
  //     </Wrapper>
  //   );
  // };

  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={1}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}>
      {images.map((image, index) => (
        <SwiperSlide key={index}>
          <img src={image} alt='' />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
export default ProductImages;
