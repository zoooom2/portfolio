// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css/bundle';

const ProductImages = ({ images = [] }: { images: string[] }) => {
  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={1}
      modules={[Pagination]}
      pagination={{ clickable: true }}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}>
      {images.map((image, index) => (
        <SwiperSlide key={index}>
          <img
            src={image}
            alt=''
            style={{ maxWidth: '100vh', maxHeight: '500px' }}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
export default ProductImages;
