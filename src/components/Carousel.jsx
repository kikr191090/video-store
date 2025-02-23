import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

export default function Carousel() {
  const offers = [
    {
      id: 1,
      title: "Oferta Especial: Stranger Things",
      image:
        "https://image.tmdb.org/t/p/w1400_and_h450_face/xYZHxQyxkp1e2TKgP3NvImZxqG7.jpg",
      description: "Alquila por 3 días al precio de 2",
    },
    {
      id: 2,
      title: "The Witcher: Pack Completo",
      image:
        "https://image.tmdb.org/t/p/w1400_and_h450_face/zrPpUlehQaBf8YX2NrVrKK8IEpf.jpg",
      description: "Compra la temporada completa con 20% de descuento",
    },
    {
      id: 3,
      title: "Breaking Bad: Oferta Limitada",
      image:
        "https://image.tmdb.org/t/p/w1400_and_h450_face/ggFHVNu6YYI5L9pCfOacjizRGt.jpg",
      description: "Alquila por 5 días al precio de 3",
    },
  ];

  return (
    <div className="carousel-container">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {offers.map((offer) => (
          <SwiperSlide key={offer.id}>
            <div
              className="carousel-slide"
              style={{ backgroundImage: `url(${offer.image})` }}
            >
              <div className="carousel-content">
                <h2>{offer.title}</h2>
                <p>{offer.description}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
