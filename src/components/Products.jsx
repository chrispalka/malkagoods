import styles from './Products.module.css';

export function Products({ searchQuery, products }) {
  return (
    <section id='products'>
      <div className={styles.flexContainer}>
        {products !== undefined && (
          <>
            {products.map((product, index) => (
              <div className={styles.item}>
                <div className={styles.card}>
                  <img
                    className={styles.productImage}
                    src={product.thumbnail}
                  />
                  <div className={styles.detailsContainer}>
                    <div className={styles.productTitle}>{product.title}</div>
                    <div className={styles.productDescription}>
                      {product.description}
                    </div>
                    <div>${product.price}</div>
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
