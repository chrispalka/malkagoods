import { useState, useEffect } from 'preact/hooks';
import useDebounce from '../hooks/debounce';
import { Navbar } from './Navbar';
import { Featured } from './Featured';
import { Products } from './Products';
import { Filter } from './Filter';
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
      } catch (error) {
        console.error('Error fetching S3 Object: ', error);
        throw error;
      }
    };
    fetchData();
  }, []);

  /** SET CATEGORY LIST */
  useEffect(() => {
    console.log(`${products.length} products fetched from S3`);
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

  const handleSearchQuery = (passedSearchQuery) => {
    setSearchQuery(passedSearchQuery);
  };
  const debounceHandleSearchOnChange = useDebounce(searchQuery, 500);

  const handleSetCategory = (category) => {
    setCategory(category);
  };

  /** FILTERING */

  useEffect(() => {
    console.log('category:', category);
    console.log('searchQuery:', searchQuery);

    const filteredProductList = products.filter((product) => {
      // Filter by category if category is selected
      const byCategory =
        category !== '' && category !== null
          ? product.summaries[0].websiteDisplayGroupName.toLowerCase() ===
            category
          : true; // If no category is selected, include all products

      // Filter by search query if search query is provided
      const bySearchQuery =
        searchQuery !== '' && searchQuery !== null
          ? product.summaries[0].itemName
              .toLowerCase()
              .includes(searchQuery.toLowerCase())
          : true; // If no search query is provided, include all products

      // Return true if both category and search query conditions are met
      return byCategory && bySearchQuery;
    });

    setFilteredProducts(filteredProductList);
    console.log('filtered: ', filteredProductList);
  }, [category, searchQuery, products]);

  useEffect(() => {
    console.log('category:', category);
    const filteredProductList =
      category !== '' && category !== null
        ? products.filter(
            (p) =>
              p.summaries[0].websiteDisplayGroupName.toLowerCase() === category
          )
        : searchQuery !== '' && searchQuery !== null
        ? products.filter((p) =>
            p.summaries[0].itemName.toLowerCase().includes(searchQuery)
          )
        : products;
    setFilteredProducts(filteredProductList);
    console.log('filtered: ', filteredProductList);
  }, [category, debounceHandleSearchOnChange, products]);

  return (
    <>
      <Navbar />
      <div className={styles.flexWrapper}>
        <Filter
          handleSetCategory={handleSetCategory}
          handleSearchQuery={handleSearchQuery}
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
