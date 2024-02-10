import styles from '../components/Featured.module.css';
import { FeaturedCarousel } from './FeaturedCarousel';

export function Featured() {
  return (
    <section id='featured'>
      <FeaturedCarousel />
    </section>
  );
}
