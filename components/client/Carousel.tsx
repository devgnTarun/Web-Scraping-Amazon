'use client'

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel as ReactCarousel } from 'react-responsive-carousel';
import Image from "next/image";

const utils = [
    { src: '/assets/images/hero-1.svg', alt: 'smartwatch' },
    { src: '/assets/images/hero-2.svg', alt: 'bag' },
    { src: '/assets/images/hero-3.svg', alt: 'lamp' },
    { src: '/assets/images/hero-4.svg', alt: 'air fryer' },
    { src: '/assets/images/hero-5.svg', alt: 'chair' },
]

const Carousel = () => {
    return (
        <div className="hero-carousel">
            <ReactCarousel
                showThumbs={false}
                autoPlay
                infiniteLoop
                interval={2000}
                showArrows={false}
                showStatus={false}
            >
                {utils.map((e) =>
                    <Image src={e.src} alt={e.alt} width={484} height={484} className="object-contain" key={e.alt} />
                )}
            </ReactCarousel>

            <Image width={175} height={175} src={'/assets/icons/hand-drawn-arrow.svg'} alt="arror-hand" className="max-xl:hidden absolute -left-[15%] bottom-0 z-0"/>
        </div>
    )
}

export default Carousel