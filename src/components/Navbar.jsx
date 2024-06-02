import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Search } from './Search';
import styles from '../components/Navbar.module.css';

export function Navbar({ handleSearchQuery, cartTotal }) {
  return (
    <div className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.navbarContent}>
          <div className={styles.logoContainer}>
            <a href='https://malkagoods.com'>Malka Goods</a>
          </div>
          <div className={styles.linkContainer}>
            <div className={styles.contactContainer}>
              <a href='mailto:matthew@malkagoods.com'>
                <FontAwesomeIcon icon={faEnvelope} />
              </a>
            </div>
            <div className={styles.cartContainer}>
              <FontAwesomeIcon icon={faShoppingCart} />
              {cartTotal > 0 && (
                <div className={styles.cartQuantityContainer}>{cartTotal}</div>
              )}
            </div>
          </div>
          <div className={styles.searchContainer}>
            <Search handleSearchQuery={handleSearchQuery} />
          </div>
        </div>
      </div>
    </div>
  );
}
