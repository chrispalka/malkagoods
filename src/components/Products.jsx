import { useState } from 'preact/hooks';
import styles from './Products.module.css';
import { Product } from './Product';
import useScrollLock from '../hooks/useScrollLock';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-modal';

export function Products({ products }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProductDetails, setSelectedProductDetails] = useState({});
  const { lockScroll, unlockScroll } = useScrollLock();

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      transform: 'translate(-50%, -50%)',
      boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
      borderRadius: '5px',
      height: 'auto',
      maxHeight: '80%',
    },
  };

  Modal.setAppElement('#app');

  const handleToggleModal = (product) => {
    if (!isModalOpen) {
      setSelectedProductDetails(product);
      lockScroll();
    } else {
      unlockScroll();
    }
    setIsModalOpen(!isModalOpen);
  };

  return (
    <section id='products'>
      <div className={styles.gridContainer}>
        {products.length > 0 && (
          <>
            {products.map((product, index) => (
              <div
                className={styles.item}
                onClick={() =>
                  handleToggleModal({
                    title: product.summaries[0].itemName,
                    image: product.images[0].images[0].link,
                    price: product.price,
                    description:
                      product.attributes?.product_description?.[0]?.value,
                  })
                }
              >
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
                      ${parseFloat(product.price).toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
      <Modal isOpen={isModalOpen} style={customStyles}>
        <div className={styles.close}>
          <FontAwesomeIcon
            className={styles.icon}
            icon={faXmark}
            size='lg'
            onClick={() => handleToggleModal()}
          />
        </div>
        <Product productDetails={selectedProductDetails} />
      </Modal>
    </section>
  );
}
