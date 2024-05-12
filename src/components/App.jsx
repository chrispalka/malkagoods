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
  const [featuredProducts, setFeaturedProducts] = useState([]);
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
    let categoryList = [];
    const categoryHeaders = [
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
    categoryHeaders.forEach((category) => {
      categoryList.push({
        [category]: [
          ...new Set(
            products
              .filter(
                (product) =>
                  product.summaries[0].websiteDisplayGroupName === category
              )
              .map(
                (product) =>
                  product.summaries[0].browseClassification?.displayName
              )
              .sort()
          ),
        ],
      });
    });
    const randomSet = [];
    for (let i = 0; i < 5; i++) {
      const randomIndex = Math.floor(Math.random() * products.length);
      randomSet.push(products[randomIndex]?.images[0].images[0].link);
    }
    setFeaturedProducts(randomSet);
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
    const filteredProductList = products.filter((product) => {
      // Filter by category if category is selected
      const byCategory =
        category !== '' && category !== null
          ? product.summaries[0].websiteDisplayGroupName.toLowerCase() ===
              category ||
            product.summaries[0].browseClassification?.displayName.toLowerCase() ===
              category
          : true;

      const bySearchQuery =
        searchQuery !== '' && searchQuery !== null
          ? product.summaries[0].itemName
              .toLowerCase()
              .includes(searchQuery.toLowerCase())
          : true;

      return byCategory && bySearchQuery;
    });

    setFilteredProducts(filteredProductList);
    // console.log(filteredProductList);
  }, [category, searchQuery, products]);

  return (
    <>
      <Navbar />
      <div className={styles.flexWrapper}>
        <Filter
          handleSetCategory={handleSetCategory}
          handleSearchQuery={handleSearchQuery}
          categories={categories}
        />
        <div className={styles.main}>
          <Featured images={featuredProducts} />
          <Products products={filteredProducts} />
        </div>
      </div>
    </>
  );
}
