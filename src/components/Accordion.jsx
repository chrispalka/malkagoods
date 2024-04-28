import { useState } from 'preact/hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';
import styles from './Accordion.module.css';

export function Accordion({ category, handleSelectCategory }) {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className={styles.categoryContainer}>
      {Object.keys(category).map((key, j) => (
        <>
          <div className={styles.parentCategory}>
            <span onClick={() => handleSelectCategory(key)}>{key}</span>
            <FontAwesomeIcon
              className={
                isActive
                  ? [styles.categoryCaret, styles.categoryCaretActive].join(' ')
                  : styles.categoryCaret
              }
              icon={faCaretRight}
              size='lg'
              onClick={() => setIsActive(!isActive)}
            />
          </div>
          <div
            className={
              isActive
                ? [styles.childCategory, styles.childCategoryActive].join(' ')
                : styles.childCategory
            }
          >
            {isActive && (
              <div className={styles.subCategoryContainer}>
                {Array.isArray(category[key]) &&
                  category[key].map((subcat, k) => (
                    <span key={k} onClick={() => handleSelectCategory(subcat)}>
                      {subcat}
                    </span>
                  ))}
              </div>
            )}
          </div>
        </>
      ))}
    </div>
  );
}
