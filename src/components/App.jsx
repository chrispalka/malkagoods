import { useState } from 'preact/hooks';
import { Navbar } from './Navbar';
import { Featured } from './Featured';
import { Products } from './Products';
import { SideNav } from './SideNav';
import '@fontsource/noto-sans';
import '@fontsource/noto-sans/700.css';
import '@fontsource/lobster';
import styles from './App.module.css';

export function App() {
  const [products, setProducts] = useState([]);

  const handleSetProducts = (products) => {
    setProducts(products);
    console.log(products);
  };

  return (
    <>
      <Navbar />
      <div className={styles.flexWrapper}>
        <SideNav handleSetProducts={handleSetProducts} />
        <div>
          <Featured />
          <Products products={products} />
        </div>
      </div>
    </>
  );
}
