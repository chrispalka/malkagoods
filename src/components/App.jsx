import { useState, useEffect } from 'preact/hooks';
import useDebounce from '../hooks/debounce';
import { Navbar } from './Navbar';
import { Featured } from './Featured';
import { Products } from './Products';
import { SideNav } from './SideNav';
import { fetchProducts } from '../api/S3Service';

import '@fontsource/noto-sans';
import '@fontsource/noto-sans/700.css';
import '@fontsource/lobster';
import styles from './App.module.css';

export function App() {
  /** JSON DATA FROM S3 */
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  /** FETCH JSON PRODUCTS FROM S3 */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchProducts();
        setProducts(response);
        console.log('Products SET');
      } catch (error) {
        console.error('Error fetching S3 Object: ', error);
        throw error;
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    const categoryList = [
      ...new Set(
        products.map(
          (p) =>
            `${
              p.summaries[0].websiteDisplayGroupName.slice(0, 1).toUpperCase() +
              p.summaries[0].websiteDisplayGroupName.slice(1)
            }`
        )
      ),
    ].sort();
    setCategories(categoryList);
  }, [products]);

  const handleSearchQuery = (searchQuery) => {
    setSearchQuery(searchQuery);
  };
  const debounceHandleSearchOnChange = useDebounce(searchQuery, 500);

  const handleSetCategory = (category) => {
    setCategory(category);
  };

  useEffect(() => {
    const filteredProductList =
      category !== '' && category !== null
        ? products.filter(
            (p) =>
              p.summaries[0].websiteDisplayGroupName === category.toLowerCase()
          )
        : searchQuery !== '' && searchQuery !== undefined
        ? products.filter((p) =>
            p.summaries[0].itemName.toLowerCase().includes(searchQuery)
          )
        : products;
    setFilteredProducts(filteredProductList);
  }, [category, debounceHandleSearchOnChange, products]);

  return (
    <>
      <Navbar />
      <div className={styles.flexWrapper}>
        <SideNav
          handleSetCategory={handleSetCategory}
          handleSearchQuery={handleSearchQuery}
          searchQuery={searchQuery}
          categories={categories}
        />
        <div>
          <Featured />
          <Products products={filteredProducts} />
        </div>
      </div>
    </>
  );
}
