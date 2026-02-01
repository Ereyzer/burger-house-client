import clsx from 'clsx';
import css from './cart.module.css';
import { useCart } from '../../context/cartContext';
import { useNavigate } from 'react-router-dom';
// import OrderItem from '../../components/orders/orderItem';
import OrderList from '../../components/orders/orderList';
import { useState } from 'react';
import OrderPlacePage from '../orderPlace/OrderPlace.page';
import { useAboutPlace } from '../../context/aboutContext';
import { WorkingStatus } from '../../const/openState';

function CartPage() {
  const { items } = useCart();
  const navigate = useNavigate();
  const [isOrderPlaceOpen, setIsOrderplaceOpen] = useState(false);
  const aboutPlace = useAboutPlace();

  const onFindClick = () => {
    navigate('/', { replace: true });
  };
  const totalPrice = items.reduce(
    (state, { price, quantity }) => (state * 100 + Math.round(price * 100) * quantity) / 100,
    0,
  );

  const onTakeOrderClick = () => {
    setIsOrderplaceOpen(true);
    console.log(items);
  };

  return (
    <>
      <section>
        {items.length < 1 ? (
          <>
            <div className={css.emptyCart}></div>
            <div className={css.emptyAppealBox}>
              <h1 className={clsx('montserrat-font', 'montserrat-h1', css.emptyTitle)}>
                Ваш кошик пустий!
              </h1>
              <p className={clsx('montserrat-font', 'montserrat-medium', css.emptyText)}>
                З знайдіть та додайте в кошик те що вам довподоби...
              </p>
              <button
                className={clsx(
                  'montserrat-font',
                  'montserrat-medium',
                  'montserrat-medium-700',
                  css.emptyExploreButton,
                )}
                onClick={() => onFindClick()}
              >
                Знайти
              </button>
            </div>
          </>
        ) : (
          <div>
            <OrderList items={items} />
            <div className={css.totalPriceBox}>
              <span
                className={clsx('roboto-font', 'roboto-h', css.totalPric)}
                aria-label={`сума замовлення: ${totalPrice} гривень`}
              >
                &#x20B4;{totalPrice}
              </span>
              <button
                type="button"
                className={clsx(
                  'montserrat-font',
                  'montserrat-medium',
                  'montserrat-medium-700',
                  css.takeOrder,
                )}
                onClick={() => onTakeOrderClick()}
                disabled={
                  aboutPlace.workingStatus === WorkingStatus.NOT_OPENED ||
                  aboutPlace.workingStatus === WorkingStatus.CLOSED
                }
              >
                Замовити
              </button>
            </div>
          </div>
        )}
      </section>
      {isOrderPlaceOpen && (
        <OrderPlacePage
          isOpen={isOrderPlaceOpen}
          onClose={() => setIsOrderplaceOpen(false)}
          prevTotal={totalPrice}
        />
      )}
    </>
  );
}

export default CartPage;
