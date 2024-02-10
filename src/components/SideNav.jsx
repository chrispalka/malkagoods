import { useState } from 'preact/hooks';
import useScrollLock from '../hooks/useScrollLock';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFilter,
  faXmark,
  faSliders,
  faEnvelope,
} from '@fortawesome/free-solid-svg-icons';
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
];

export function SideNav() {
  const [showNav, setShowNav] = useState(false);
  const { lockScroll, unlockScroll } = useScrollLock();

  const toggleShowNav = () => {
    setShowNav(!showNav);
    if (showNav) {
      unlockScroll();
    } else {
      lockScroll();
    }
  };
  return (
    <>
      <div
        className={styles.filterContainer}
        id='nav-click'
        onClick={toggleShowNav}
      >
        <FontAwesomeIcon
          className={styles.iconNavClosed}
          icon={faFilter}
          size='lg'
        />
        <div className={styles.searchContainer}>
          <input icon='search' placeholder='Search' />
        </div>
      </div>
      <div
        className={
          showNav
            ? [styles.navContainer, styles.navActive].join(' ')
            : styles.navContainer
        }
      >
        <div className={styles.mobile_btn} onClick={toggleShowNav}>
          <FontAwesomeIcon
            className={styles.iconNavClosed}
            icon={faXmark}
            size='lg'
          />
        </div>
        <div className={styles.linkContainer}>
          {links.map((link, i) => (
            <a href={link.id} key={i}>
              {link.name}
            </a>
          ))}
          <div className={styles.navIconContainerWrapper}>
            <div
              className={
                showNav
                  ? [
                      styles.navIconContainer,
                      styles.navIconContainer_active,
                    ].join(' ')
                  : styles.navIconContainer
              }
            >
              <a href='mailto:jimcookemedia@gmail.com'>
                <FontAwesomeIcon
                  className={styles.iconLinks}
                  icon={faEnvelope}
                  size='lg'
                />
              </a>
              <a href='mailto:jimcookemedia@gmail.com'>
                <FontAwesomeIcon
                  className={styles.iconLinks}
                  icon={faLinkedin}
                  size='lg'
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
