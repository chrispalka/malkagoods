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
      <Dropdown
        options={categories}
        value={category}
        onChange={(e) => setCategory(e.value)}
        placeholder='Select Category'
      />
      <div className={styles.productsContainer}>
        {filteredProducts.map((product, index) => (
          <div className={styles.col}>
            <div>{product.title}</div>
            <div>
              <img className={styles.productImage} src={product.thumbnail} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
