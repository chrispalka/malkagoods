import { useState } from 'preact/hooks';
import useScrollLock from '../hooks/useScrollLock';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faXmark } from '@fortawesome/free-solid-svg-icons';
import products from '../assets/products.json';
import styles from '../components/SideNav.module.css';

export function SideNav() {
  const [showNav, setShowNav] = useState(true);
  const { lockScroll, unlockScroll } = useScrollLock();

  const categories = [
    ...new Set(
      products['products'].map(
        (item) =>
          `${item.category.slice(0, 1).toUpperCase() + item.category.slice(1)}`
      )
    ),
  ].sort();

  const toggleShowNav = () => {
    setShowNav(!showNav);
    if (showNav) {
      unlockScroll();
    } else {
      lockScroll();
    }
  };
  return (
    <>
      <div
        className={styles.filterContainer}
        id='nav-click'
        onClick={toggleShowNav}
      >
        <FontAwesomeIcon
          className={styles.iconNavClosed}
          icon={faFilter}
          size='lg'
        />
        <div className={styles.searchContainer}>
          <input icon='search' placeholder='Search' />
        </div>
      </div>
      <div
        className={
          showNav
            ? [styles.navContainer, styles.navActive].join(' ')
            : styles.navContainer
        }
      >
        <div className={styles.mobile_btn} onClick={toggleShowNav}>
          <div>
            <span>Filter</span>
          </div>
          <FontAwesomeIcon
            className={styles.iconNavClosed}
            icon={faXmark}
            size='lg'
          />
        </div>
        <div className={styles.linkContainer}>
          <h3>Categories</h3>
          <div className={styles.categoriesContainer}>
            {categories.map((category, i) => (
              <a href={category.id} key={i}>
                {category}
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
