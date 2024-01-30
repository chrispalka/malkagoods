import { useState } from 'preact/hooks';
import { Navbar } from './Navbar';
import { Hero } from './Hero';
import styles from './App.module.css';

export function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Hero />
      <Hero />
      {/* <div className={styles.wrapperContent}></div> */}
    </>
  );
}
