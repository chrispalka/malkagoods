import { useState } from 'react';
import styles from './Card.module.css';

export function Card({ product, onClick }) {
  const [quantity, setQuantity] = useState(1);

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className={styles.item}>
      <div className={styles.card}>
        <div onClick={onClick}>
          <img
            className={styles.productImage}
            src={product.images[0].images[0].link}
            alt={product.summaries[0].itemName}
          />
          <div className={styles.detailsContainer}>
            <div className={styles.productTitle}>
              {product.summaries[0].itemName}
            </div>
            <div className={styles.productDescription}>
              ${parseFloat(product.price).toFixed(2)}
            </div>
          </div>
        </div>
        <div className={styles.cartContainer}>
          <div>
            <button className={styles.cartButton} onClick={handleDecrease}>
              -
            </button>
            <span className={styles.quantity}>{quantity}</span>
            <button className={styles.cartButton} onClick={handleIncrease}>
              +
            </button>
          </div>
          <div className={styles.addToCardContainer}>
            <button className={styles.addToCartButton}>Add to cart</button>
          </div>
        </div>
      </div>
    </div>
  );
}
