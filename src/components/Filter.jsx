import { useState, useEffect } from 'preact/hooks';
import useScrollLock from '../hooks/useScrollLock';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Accordion } from './Accordion';
import styles from '../components/Filter.module.css';

export function Filter({ handleSetCategory, categories }) {
  const [showNav, setShowNav] = useState(false);
  const [category, setCategory] = useState('');
  const { lockScroll, unlockScroll } = useScrollLock();

  useEffect(() => {
    handleSetCategory(category.toLowerCase());
  }, [category]);

  const toggleShowNav = (fromCat = false) => {
    if (fromCat) {
      setShowNav(false);
    } else {
      setShowNav(!showNav);
    }
    if (showNav) {
      unlockScroll();
    } else {
      lockScroll();
    }
  };

  const clearCategory = () => {
    setCategory('');
  };

  const categoryOnChange = (category) => {
    setCategory(category);
    toggleShowNav(true);
  };

  return (
    <div className={styles.filterWrapper}>
      <div className={styles.filterContainer}>
        <div className={styles.filterButton}>
          <FontAwesomeIcon
            className={styles.icon}
            icon={faFilter}
            size='lg'
            onClick={() => toggleShowNav()}
          />
        </div>
      </div>
      <div
        className={
          showNav
            ? [styles.navContainer, styles.navActive].join(' ')
            : styles.navContainer
        }
      >
        <div className={styles.mobile_btn}>
          <div>
            <span>Filter</span>
          </div>
          <FontAwesomeIcon
            className={styles.icon}
            icon={faXmark}
            size='lg'
            onClick={() => toggleShowNav()}
          />
        </div>
        <div className={styles.linkContainer}>
          <h3>Categories</h3>
          <div className={styles.categoriesContainer}>
            {categories.map((category, i) => (
              <Accordion
                category={category}
                handleSelectCategory={categoryOnChange}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
