import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Hero1 from '../assets/hero.jpeg';
import Hero2 from '../assets/hero.jpg';
import styles from './FeaturedCarousel.module.css';

export function FeaturedCarousel() {
  return (
    <div className={styles.carouselContainer}>
      <Carousel
        autoPlay
        showThumbs={false}
        showStatus={false}
        showArrows={false}
        infiniteLoop={true}
      >
        <div>
          <img src={Hero1} />
        </div>
        <div>
          <img src={Hero2} />
        </div>
      </Carousel>
    </div>
  );
}
