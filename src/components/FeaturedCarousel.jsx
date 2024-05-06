import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import styles from './FeaturedCarousel.module.css';

export function FeaturedCarousel({ images }) {
  return (
    <div className={styles.carouselContainer}>
      <Carousel
        autoPlay
        showThumbs={false}
        showStatus={false}
        showIndicators={false}
        showArrows={false}
        infiniteLoop={true}
      >
        {images.map((image) => (
          <div className={styles.imageContainer}>
            <img alt='' src={image} className={styles.productImage} />
          </div>
        ))}
      </Carousel>
    </div>
  );
}
