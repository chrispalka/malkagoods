import styles from './Footer.module.css';

export function Footer({}) {
  return (
    <footer className={styles.footerContainer}>
      <div className={styles.container}>
        <div className={styles.contactContainer}>
          <div>
            <p>15 Minneakoning Rd #103</p>
            <p>Flemington, NJ 08822</p>
          </div>
          <div className={styles.email}>
            <a href='mailto:malkagoods@gmail.com'>malkagoods@gmail.com</a>
          </div>
          <div>
            <a href='tel:7329987999'>(732) 998-7999</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
