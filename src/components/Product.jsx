import styles from './Product.module.css';

export function Product({ productDetails }) {
  return (
    <div className={styles.card}>
      <img src={productDetails.image} className={styles.productImage}></img>
      <div className={styles.title}>{productDetails.title}</div>
      <div>{productDetails.description}</div>
    </div>
  );
}
