import { useState, useEffect } from 'preact/hooks';
import useScrollLock from '../hooks/useScrollLock';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faXmark } from '@fortawesome/free-solid-svg-icons';
import styles from '../components/Filter.module.css';

export function Filter({ handleSetCategory, handleSearchQuery, categories }) {
  const [showNav, setShowNav] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('');
  const { lockScroll, unlockScroll } = useScrollLock();

  useEffect(() => {
    handleSearchQuery(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    handleSetCategory(category.toLowerCase());
  }, [category]);

  const toggleShowNav = () => {
    setShowNav(!showNav);
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
    // handleSearchQuery('');
    setCategory(category);
    toggleShowNav();
  };

  const handleChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
  };

  return (
    <>
      <div className={styles.filterContainer} id='nav-click'>
        <div>
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
        <div className={styles.pillContainer}>
          {category !== '' && (
            <div className={styles.categoryPill} onClick={clearCategory}>
              <div className={styles.pillContents}>
                <FontAwesomeIcon className={styles.icon} icon={faXmark} />
                <div className={styles.category}>{category}</div>
              </div>
            </div>
          )}
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
