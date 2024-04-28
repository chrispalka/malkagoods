import styles from './Products.module.css';

export function Products({ products }) {
  return (
    <section id='products'>
      <div className={styles.flexContainer}>
        {products.length > 0 && (
          <>
            {products.map((product, index) => (
              <div className={styles.item}>
                <div className={styles.card}>
                  <img
                    className={styles.productImage}
                    src={product.images[0].images[0].link}
                  />
                  <div className={styles.detailsContainer}>
                    <div className={styles.productTitle}>
                      {product.summaries[0].itemName}
                    </div>
                    <div className={styles.productDescription}>
                      ${product.price}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </section>
  );
}
