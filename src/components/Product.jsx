import { useState } from 'react';
import styles from './Product.module.css';

export function Product({ productDetails, setCartTotal }) {
  const [quantity, setQuantity] = useState(1);
  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  const handleAddToCart = () => {
    setCartTotal((prevTotal) => prevTotal + quantity);
    setQuantity(1);
  };
  return (
    <div className={styles.card}>
      <div className={styles.flexContainer}>
        <div className={styles.imageContainer}>
          <img src={productDetails.image} className={styles.productImage}></img>
        </div>
        <div className={styles.title}>{productDetails.title}</div>
        <div className={styles.priceContainer}>${productDetails.price}</div>
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
            <button
              className={styles.addToCartButton}
              onClick={handleAddToCart}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
