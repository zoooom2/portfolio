// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css/bundle';

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
      slidesPerView={3}
      modules={[Pagination]}
      pagination={{ clickable: true }}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}>
      <SwiperSlide>
        <img src={images[0]} alt='' />
      </SwiperSlide>
      <SwiperSlide>
        <img src={images[0]} alt='' />
      </SwiperSlide>
      {images.map((image, index) => (
        <SwiperSlide key={index}>
          <img src={image} alt='' />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
export default ProductImages;
