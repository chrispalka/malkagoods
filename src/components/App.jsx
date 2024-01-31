import { Navbar } from './Navbar';
import { Featured } from './Featured';
import { Products } from './Products';
import { Hero } from './Hero';
import '@fontsource/noto-sans';
import '@fontsource/noto-sans/700.css';
import '@fontsource/lobster';
import styles from './App.module.css';

export function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Featured />
      <Products />
      {/* <div className={styles.wrapperContent}></div> */}
    </>
  );
}
