import styles from './Product.module.css';

export function Product({ productDetails }) {
  return (
    <div className={styles.card}>
      <div className={styles.flexContainer}>
        <div className={styles.imageContainer}>
          <img src={productDetails.image} className={styles.productImage}></img>
        </div>
        <div className={styles.descriptionContainer}>
          <div className={styles.title}>{productDetails.title}</div>
          <div>{productDetails.description}</div>
        </div>
        <div className={styles.priceContainer}>
          ${parseFloat(productDetails.price).toFixed(2)}
        </div>
      </div>
    </div>
  );
}
