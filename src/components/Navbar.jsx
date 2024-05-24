import { useState, useEffect } from 'preact/hooks';
import useScrollLock from '../hooks/useScrollLock';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faXmark,
  faEnvelope,
  faShoppingBag,
  faShoppingBasket,
  faShoppingCart,
} from '@fortawesome/free-solid-svg-icons';
import styles from '../components/Navbar.module.css';

const links = [
  {
    name: 'Featured',
    id: '#featured',
  },
  {
    name: 'Products',
    id: '#products',
  },
];

export function Navbar() {
  return (
    <div className={styles.navbar}>
      <div className={styles.navbarContent}>
        <div className={styles.logoContainer}>Malka Goods</div>
        <div className={styles.linkContainer}>
          <div className={styles.contactContainer}>
            <a href='mailto:matthew@malkagoods.com'>
              <FontAwesomeIcon icon={faEnvelope} />
            </a>
          </div>
          <div className={styles.cartContainer}>
            <FontAwesomeIcon icon={faShoppingCart} />
          </div>
        </div>
      </div>
    </div>
  );
}
