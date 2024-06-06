import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import styles from './FeaturedCarousel.module.css';

export function FeaturedCarousel({
  images,
  autoPlay = false,
  showThumbs = false,
  showStatus = false,
  showIndicators = false,
  showArrows = false,
  infiniteLoop = false,
  swipeable = false,
}) {
  return (
    <div className={styles.carouselContainer}>
      <Carousel
        key={images.length}
        autoPlay={autoPlay}
        showThumbs={showThumbs}
        showStatus={showStatus}
        showIndicators={showIndicators}
        showArrows={showArrows}
        infiniteLoop={infiniteLoop}
        swipeable={swipeable}
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
