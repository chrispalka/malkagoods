import { useState, useEffect } from 'preact/hooks';
import useScrollLock from '../hooks/useScrollLock';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faXmark } from '@fortawesome/free-solid-svg-icons';
import productsList from '../assets/products.json';
import styles from '../components/SideNav.module.css';

export function SideNav({ handleSetProducts }) {
  const [showNav, setShowNav] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const { lockScroll, unlockScroll } = useScrollLock();

  useEffect(() => {
    const filteredProducts =
      category !== '' && category !== null
        ? productsList['products'].filter(
            (p) => p.category === category.toLowerCase()
          )
        : productsList['products'];
    setFilteredProducts(filteredProducts);
    handleSetProducts(filteredProducts);
  }, [category]);

  // useEffect(() => {
  //   const results = filteredProducts.filter((product) => {
  //     product.title.toLowerCase().includes(searchQuery);
  //   });
  //   setFilteredProducts(results);
  //   handleSetProducts(filteredProducts);
  // }, []);

  const categories = [
    ...new Set(
      productsList['products'].map(
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

  const handleSetCategory = (category) => {
    setCategory(category);
    toggleShowNav();
  };

  const handleChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  return (
    <>
      <div className={styles.filterContainer} id='nav-click'>
        <FontAwesomeIcon
          className={styles.iconNavClosed}
          icon={faFilter}
          size='lg'
          onClick={toggleShowNav}
        />
        <div className={styles.searchContainer}>
          <input icon='search' placeholder='Search' onChange={handleChange} />
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
            className={styles.iconNavClosed}
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
                onClick={() => handleSetCategory(category)}
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
