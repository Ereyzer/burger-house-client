import css from './header.module.css';
import HomeSvgIcon from '../../assets/svg/Home';

import CartSvgIcon from '../../assets/svg/Cart';
import DropdownArrowDown from '../../assets/svg/DropdownArrowDown';
import { NavLink } from 'react-router-dom';
import ThemeSwitcher from '../theme/components/ThemeSwitcher';
import clsx from 'clsx';
import { useCart } from '../../context/cartContext';

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

const wordEndForStravy = (count: number) => {
  if (count > 10 && count < 20) return '';
  switch (count % 10) {
    case 1:
      return 'а';

    case 2:
    case 3:
    case 4:
      return 'и';
    case 5:
    case 6:
    case 7:
    case 8:
    case 9:
    case 0:
      return '';
  }
};

function Header() {
  const cart = useCart();
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
                    className={clsx(css.navItem, 'montserrat-font', 'montserrat-large')}
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
                        {id === 'cart' && cart.items.length > 0 && (
                          // here do not count quantity only unique meals
                          <div
                            className={clsx(css.cartNavItem, 'montserrat-font', 'montserrat-small')}
                          >
                            <span
                              aria-label={`В кошику ${cart.items.length} страв${wordEndForStravy(
                                cart.items.length,
                              )}`}
                            >
                              {cart.items.length}
                            </span>
                          </div>
                        )}
                        <span
                          style={{
                            color: `${
                              isActive ? 'var(--prymary-color-600)' : 'var(--grey-shades-400)'
                            }`,
                          }}
                        >
                          {name}
                        </span>
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
