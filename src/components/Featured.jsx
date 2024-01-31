import styles from '../components/Featured.module.css';
import { FeaturedCarousel } from './FeaturedCarousel';

export function Featured() {
  return (
    <section id='featured'>
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>Featured</h1>
      </div>
      <FeaturedCarousel />
    </section>
  );
}
