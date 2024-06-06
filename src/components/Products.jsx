import { useState } from 'preact/hooks';
import styles from './Products.module.css';
import { Product } from './Product';
import { Card } from './Card';
import useScrollLock from '../hooks/useScrollLock';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-modal';

export function Products({
  products,
  clearCategory,
  category,
  filteredTotal,
  total,
  setCartTotal,
}) {
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
      <div className={styles.infoContainer}>
        <div className={styles.pillContainer}>
          <div className={styles.flexContainer}>
            {category !== '' && (
              <div className={styles.categoryPill} onClick={clearCategory}>
                <div className={styles.pillContents}>
                  <FontAwesomeIcon className={styles.icon} icon={faXmark} />
                  <div className={styles.category}>{category}</div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div>
          {filteredTotal} of {total}
        </div>
      </div>
      <div className={styles.gridContainer}>
        {products.length > 0 && (
          <>
            {products.map((product, index) => (
              <Card
                key={index}
                product={product}
                onClick={() =>
                  handleToggleModal({
                    title: product.summaries[0].itemName,
                    image: product.images[0].images[0].link,
                    price: parseFloat(product.price).toFixed(2),
                    description:
                      product.attributes?.product_description?.[0]?.value,
                  })
                }
                setCartTotal={setCartTotal}
              />
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
        <Product
          productDetails={selectedProductDetails}
          setCartTotal={setCartTotal}
        />
      </Modal>
    </section>
  );
}
