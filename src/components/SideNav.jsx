import { useState } from 'preact/hooks';
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
];

export function SideNav() {
  const [showNav, setShowNav] = useState(true);
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
    <div className={styles.navContainer}>
      <div className={styles.mobile_btn} id='nav-click' onClick={toggleShowNav}>
        {showNav ? (
          <FontAwesomeIcon className={styles.icon} icon={faXmark} size='lg' />
        ) : (
          <FontAwesomeIcon className={styles.icon} icon={faBars} size='lg' />
        )}
      </div>

      <div className={styles.nameContainer}>
        <div
          className={
            showNav
              ? [styles.flexContainer, styles.flexContainer_active].join(' ')
              : styles.flexContainer
          }
        >
          <div>
            <span className={styles.name}>MalkaGoods</span>
          </div>
          <div className={styles.imageContainer}>
            <img alt='' src=''></img>
          </div>
        </div>
      </div>

      <div
        className={
          showNav
            ? [styles.navContainer, styles.navActive].join(' ')
            : styles.navContainer
        }
      >
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
                  className={styles.icon}
                  icon={faEnvelope}
                  size='lg'
                />
              </a>
              <a href='mailto:jimcookemedia@gmail.com'>
                <FontAwesomeIcon
                  className={styles.icon}
                  icon={faLinkedin}
                  size='lg'
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
