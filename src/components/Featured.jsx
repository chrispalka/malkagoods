import styles from '../components/Featured.module.css';
import { FeaturedCarousel } from './FeaturedCarousel';

export function Featured({ images }) {
  return (
    <section id={styles.featured}>
      <FeaturedCarousel images={images} />
    </section>
  );
}
