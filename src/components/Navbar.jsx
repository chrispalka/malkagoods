import { useState, useEffect } from 'preact/hooks';
import useScrollLock from '../hooks/useScrollLock';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import styles from '../components/Navbar.module.css';

const links = [
  {
    name: 'Featured',
    id: '#featured',
  },
  {
    name: 'Products',
    id: '#products',
  },
];

export function Navbar() {
  const [showNav, setShowNav] = useState(false);
  const { lockScroll, unlockScroll } = useScrollLock();

  const [scrolled, setScrolled] = useState(false);

  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 25) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
  });

  const toggleShowNavDropdown = () => {
    setShowNav(!showNav);
  };
  return (
    <div
      className={
        showNav && scrolled
          ? [styles.navbar, styles.navbar_active, styles.scrolled].join(' ')
          : showNav
          ? [styles.navbar, styles.navbar_active].join(' ')
          : scrolled
          ? [styles.navbar, styles.scrolled].join(' ')
          : styles.navbar
      }
    >
      <div className={styles.navbarContent}>
        <div className={styles.logoContainer}>Malka Goods</div>
        <div
          className={styles.mobile_btn}
          id='nav-click'
          onClick={toggleShowNavDropdown}
        >
          {showNav ? (
            <div className={styles.iconContainer}>
              <FontAwesomeIcon
                className={styles.icon}
                icon={faXmark}
                size='lg'
              />
            </div>
          ) : (
            <div className={styles.iconContainer}>
              <FontAwesomeIcon
                className={styles.icon}
                icon={faBars}
                size='lg'
              />
            </div>
          )}
        </div>
        <div
          className={
            showNav ? [styles.menu, styles.menu_active].join(' ') : styles.menu
          }
        >
          <div className={styles.linkContainer}>
            {links.map((link, i) => (
              <a
                className={
                  showNav
                    ? [styles.links, styles.linksFadeIn].join(' ')
                    : styles.links
                }
                href={link.id}
                key={i}
                onClick={toggleShowNavDropdown}
              >
                {link.name}
              </a>
            ))}
            <div className={styles.contactContainer}>
              <a href='mailto:malkagood@gmail.com'>
                <FontAwesomeIcon icon={faEnvelope} size='lg' />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
