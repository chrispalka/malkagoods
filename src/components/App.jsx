import { useState } from 'preact/hooks';
import { Navbar } from './Navbar';
import { FeaturedCarousel } from './FeaturedCarousel';
import { Hero } from './Hero';
import '@fontsource/noto-sans';
import '@fontsource/noto-sans/700.css';
import styles from './App.module.css';

export function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <FeaturedCarousel />
      {/* <div className={styles.wrapperContent}></div> */}
    </>
  );
}
