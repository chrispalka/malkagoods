import { useState, useEffect } from 'preact/hooks';
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
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchProducts();
        const productList =
          category !== '' && category !== null
            ? response.filter(
                (p) =>
                  p.summaries[0].websiteDisplayGroupName ===
                  category.toLowerCase()
              )
            : searchQuery !== ''
            ? response.filter((p) =>
                p.summaries[0].itemName.toLowerCase().includes(searchQuery)
              )
            : response;
        setProducts(productList);
        console.log(response);
      } catch (error) {
        console.error('Error fetching S3 Object: ', error);
        throw error;
      }
    };
    fetchData();
  }, [category, searchQuery]);

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
  }, []);

  const handleSetCategory = (category) => {
    setCategory(category);
  };

  const handleSetSearchQuery = (searchQuery) => {
    setSearchQuery(searchQuery);
  };

  return (
    <>
      <Navbar />
      <div className={styles.flexWrapper}>
        <SideNav
          handleSetCategory={handleSetCategory}
          handleSetSearchQuery={handleSetSearchQuery}
          categories={categories}
        />
        <div>
          <Featured />
          <Products products={products} />
        </div>
      </div>
    </>
  );
}
