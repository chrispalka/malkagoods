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
    <>
      <div className={styles.mobile_btn} id='nav-click' onClick={toggleShowNav}>
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
      <div className={styles.nameContainer}>
        <div
          className={
            showNav
              ? [styles.flexContainer, styles.flexContainer_active].join(' ')
              : styles.flexContainer
          }
        >
          <div>
            <span
              className={
                showNav ? [styles.nameOpen, styles.name].join(' ') : styles.name
              }
            >
              MalkaGoods
            </span>
          </div>
          <div className={styles.imageContainer}>
            <img alt='' src=''></img>
          </div>
        </div>
      </div>

      {/* <div
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
      </div> */}
    </>
  );
}


/*
.navContainer {
  position: sticky;
  width: 100vw;
  top: 0;
  background-color: #272932;
  -webkit-transition: all ease 0.3s;
  -moz-transition: all ease 0.3s;
  transition: all ease 0.23;
  z-index: 9998;
}

.navActive {
  left: 0;
}

.linkContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.linkContainer a {
  color: #e6e8e6;
  font-family: 'Gotham';
  font-weight: 700;
  padding: 1.5rem 0;
  text-decoration: none;
}

.linkContainer a:hover {
  color: #7acee2;
}

.navIconContainer {
  position: absolute;
  display: flex;
  transform: translate(-50%, -100%);
  opacity: 0;
  transition: all ease 0.3s;
  /* padding: 1.5rem; */
}

.navIconContainer_active {
  opacity: 100%;
  transform: translate(-50%, -6%);
}

.navIconContainer a {
  padding: 1.5rem 0.8rem;
}

.mobile_btn {
  position: fixed;
  right: 0;
  top: 0;
  z-index: 9999;
  padding: 1.5rem;
  cursor: pointer;
}

.nameContainer {
  position: fixed;
  top: 0;
  left: 0;
  padding: 1.5rem;
  z-index: 9999;
}

.name {
  color: #272932;
  font-family: Gotham;
  font-weight: 700;
  font-size: 1.25rem;
}

.nameOpen {
  color: #e6e8e6;
  font-family: Gotham;
  font-weight: 700;
  font-size: 1.25rem;
  transition: all ease-in-out 0.4s;
}

.flexContainer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  /* opacity: 0%;
  transition: all ease-in-out 0.4s; */
}

.flexContainer_active {
  /* opacity: 100%; */
}

.imageContainer img {
  filter: grayscale(100%);
  height: 4.375rem;
  border-radius: 50%;
  -webkit-filter: grayscale(100%);
  -webkit-transition: all ease 0.5s;
  -moz-transition: all ease 0.5s;
  transition: all ease 0.5s;
}

.imageContainer img:hover {
  -webkit-filter: grayscale(0%);
  filter: grayscale(0%);
}

.iconNavClosed {
  color: #272932;
}

.iconNavOpen {
  color: #e6e8e6;
}

.iconLinks {
  color: #e6e8e6;
}

/* TABLET */

@media (min-width: 48rem) and (max-width: 64rem) {
  .mobile_btn {
    display: none;
  }

  .nameContainer {
    display: none;
  }
}

/* LAPTOP DESKTOP */

@media (min-width: 64.0625rem) and (max-width: 80rem) {
  .mobile_btn {
    display: none;
  }
  .nameContainer {
    display: none;
  }
}

/* LARGE SCREENS */

@media (min-width: 80.0625rem) {
  .navWrapper {
    display: flex;
    width: 25%;
    border: 2px solid yellow;
    height: 100vh;
  }

  .mobile_btn {
    display: none;
  }

  .name {
    color: #e6e8e6;
  }

  .nameContainer {
    display: flex;
    width: 100%;
  }

  .navContainer {
    width: 25%;
    height: 100vh;
    left: 0;
    background-color: #272932;
  }
}

/*