import css from './header.module.css';
import HomeSvgIcon from '../../assets/svg/Home';

import CartSvgIcon from '../../assets/svg/Cart';
import DropdownArrowDown from '../../assets/svg/DropdownArrowDown';
import { NavLink } from 'react-router-dom';
import ThemeSwitcher from '../theme/components/ThemeSwitcher';

const pagesList = [
  {
    id: 'home',
    name: 'Головна',
    Icon: HomeSvgIcon,
  },
  // {
  //   id: 'explore',
  //   name: 'Пошук',
  //   Icon: ExploreSvgIcon,
  // },
  {
    id: 'cart',
    name: 'Кошик',
    Icon: CartSvgIcon,
  },
  // {
  //   id: 'like',
  //   name: 'Подобається',
  //   Icon: LikeIconSvg,
  // },

  // {
  //   id: 'notification',
  //   name: 'Сповіщення',
  //   Icon: NotificationSvgIcon,
  // },
];

function Header() {
  return (
    <header>
      <div className="container">
        <div className={css['header-container']}>
          <nav aria-label="Навігація сторінки">
            <ul className={css['nav-list']}>
              {pagesList.map(({ id, Icon, name }) => (
                <li key={id}>
                  <NavLink
                    to={id === pagesList[0].id ? '/' : `/${id}`}
                    aria-label={`Перейти до сторінки: ${name}`}
                  >
                    {({ isActive }) => (
                      <>
                        {isActive && (
                          <DropdownArrowDown
                            fill="var(--prymary-color-600)"
                            style={{ position: 'absolute', transform: 'translate(10%, -50%)' }}
                          />
                        )}
                        <Icon
                          fill={isActive ? 'var(--prymary-color-600)' : 'var(--grey-shades-400)'}
                          style={{ transform: `rotate(${isActive ? '-20' : '0'}deg)` }}
                          height="32px"
                          width="32px"
                        />
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          <div className={css.theme}>
            <ThemeSwitcher stylePosition={{ position: 'static' }} iconSize={24} />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
