import { useState, useEffect } from 'preact/hooks';
import useScrollLock from '../hooks/useScrollLock';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faXmark } from '@fortawesome/free-solid-svg-icons';
import styles from '../components/SideNav.module.css';

export function SideNav({ handleSetCategory, handleSearchQuery, categories }) {
  const [showNav, setShowNav] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { lockScroll, unlockScroll } = useScrollLock();

  const toggleShowNav = () => {
    setShowNav(!showNav);
    if (showNav) {
      unlockScroll();
    } else {
      lockScroll();
    }
  };

  const categoryOnChange = (category) => {
    handleSearchQuery('');
    handleSetCategory(category);
    toggleShowNav();
  };

  const handleChange = (e) => {
    const query = e.target.value.toLowerCase();
    handleSetCategory('');
    setSearchQuery(query);
    handleSearchQuery(searchQuery);
  };

  return (
    <>
      <div className={styles.filterContainer} id='nav-click'>
        <div className={styles.filterButton}>
          <FontAwesomeIcon
            className={styles.icon}
            icon={faFilter}
            size='lg'
            onClick={toggleShowNav}
          />
        </div>
        <div className={styles.searchContainer}>
          <input
            id='search'
            icon='search'
            placeholder='Search'
            value={searchQuery}
            onChange={handleChange}
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
            onClick={toggleShowNav}
          />
        </div>
        <div className={styles.linkContainer}>
          <h3>Categories</h3>
          <div className={styles.categoriesContainer}>
            {categories.map((category, i) => (
              <a
                href={category.id}
                key={i}
                onClick={() => categoryOnChange(category)}
              >
                {category}
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
