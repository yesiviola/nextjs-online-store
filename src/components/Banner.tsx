import {Carousel } from "react-responsive-carousel";
import Image from 'next/image';
import "react-responsive-carousel/lib/styles/carousel.min.css";


const Banner = () => {
    return (
        <div className="relative">
            <div className="absolute w-full h-28 bg-gradient-to-t from-gray-100 to-transparent bottom-0 z-20"></div>
            <Carousel
                autoPlay
                infiniteLoop
                showStatus={false}
                showIndicators={false}
                showThumbs={false}
                interval={5000}
            >
                <div className='relative h-full w-full'>
                    <Image loading="lazy"
                     src="https://i0.wp.com/blog2.roomiapp.com/wp-content/uploads/2021/08/pexels-photo-1472612.jpeg?fit=1880%2C1253&ssl=1" 
                     alt=""
                     className="object-cover"
                     width={300}
                     height={200}
                 
                />
                </div>
                <div className='relative h-full w-full'>
                    <Image loading="lazy" 
                    src=" https://www.filmsperu.pe/wp-content/uploads/2023/01/marcas-mas-caras-del-mundo.jpg" 
                    alt=""
                    className="object-cover"
                    width={500}
                    height={300}
                   
                    />
                </div>
                <div className='relative h-full w-full'>
                    <Image  loading="lazy"
                     src="https://www.creativosonline.org/wp-content/uploads/2022/05/logos-marcas-de-ropa-de-lujo.jpg "
                      alt=""
                        className="object-cover"
                        width={300}
                        height={200}
                    />
                </div>
            </Carousel>
        </div>
    )
}

export default Banner;
