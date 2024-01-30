import { useState, useEffect } from 'preact/hooks';
import useScrollLock from '../hooks/useScrollLock';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import styles from '../components/SideNav.module.css';

const links = [
  {
    name: 'work',
    id: '#home',
  },
  {
    name: 'me',
    id: '#me',
  },
  {
    name: 'me',
    id: '#me',
  },
];

export function Navbar() {
  const [showNav, setShowNav] = useState(false);
  const { lockScroll, unlockScroll } = useScrollLock();

  const [scrolled, setScrolled] = useState(false);

  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 200) {
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
    // if (showNav) {
    //   unlockScroll();
    // } else {
    //   lockScroll();
    // }
  };
  return (
    <div
      className={
        showNav
          ? [styles.navbar, styles.navbar_active].join(' ')
          : scrolled
          ? [styles.navbar, styles.scrolledCss]
          : styles.navbar
      }
    >
      <div className={styles.logoContainer}>Malka Goods</div>
      <div
        className={styles.mobile_btn}
        id='nav-click'
        onClick={toggleShowNavDropdown}
      >
        {showNav ? (
          <FontAwesomeIcon
            className={styles.iconNavOpen}
            icon={faXmark}
            size='lg'
          />
        ) : (
          <FontAwesomeIcon
            className={styles.iconNavClosed}
            icon={faBars}
            size='lg'
          />
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
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
