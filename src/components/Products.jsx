import { useState, useEffect } from 'preact/hooks';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import styles from './Products.module.css';
import products from '../assets/products.json';

export function Products() {
  const [category, setCategory] = useState('');

  const filteredProducts =
    category !== '' && category !== null
      ? products['products'].filter(
          (p) => p.category === category.toLowerCase()
        )
      : products['products'];

  const categories = [
    ...new Set(
      products['products'].map(
        (item) =>
          `${item.category.slice(0, 1).toUpperCase() + item.category.slice(1)}`
      )
    ),
  ].sort();

  return (
    <section id='products'>
      <div className={styles.titleContainer}>
        {console.log(category)}
        {console.log(filteredProducts)}
        <h1 className={styles.title}>Products</h1>
      </div>
      <button onClick={() => setCategory(null)}>Reset</button>
      <div className={styles.dropdownContainer}>
        <Dropdown
          options={categories}
          value={category}
          onChange={(e) => setCategory(e.value)}
          placeholder='Select Category'
        />
      </div>
      <div className={styles.flexContainer}>
        {filteredProducts.map((product, index) => (
          <div className={styles.flexItem}>
            <div className={styles.card}>
              <img className={styles.productImage} src={product.thumbnail} />
              <div className={styles.detailsContainer}>
                <div className={styles.productTitle}>{product.title}</div>
                <div className={styles.productDescription}>
                  {product.description}
                </div>
                <div>${product.price}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
