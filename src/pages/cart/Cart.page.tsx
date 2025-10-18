import clsx from 'clsx';
import css from './cart.module.css';
import { useCart } from '../../context/cartContext';
import CartItem from './CartItem';
import { useNavigate } from 'react-router-dom';

function CartPage() {
  const { items } = useCart();
  const navigate = useNavigate();

  const onFindClick = () => {
    navigate('/');
  };
  const totalPrice = items.reduce(
    (state, { price, quantity }) => (state * 100 + Math.round(price * 100) * quantity) / 100,
    0,
  );

  return (
    <section className="container">
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
          <ul className={css.list}>
            {items.map(({ id, quantity, title, subtitle, image_medium, price }) => {
              return (
                <CartItem
                  key={id}
                  id={id}
                  title={title}
                  subtitle={subtitle}
                  image_medium={image_medium}
                  price={price}
                  quantity={quantity}
                />
              );
            })}
          </ul>
          <div className={css.totalPriceBox}>
            <span className={clsx('roboto-font', 'roboto-h', css.totalPric)}>
              &#x20B4;{totalPrice}
            </span>
            <button
              className={clsx(
                'montserrat-font',
                'montserrat-medium',
                'montserrat-medium-700',
                css.takeOrder,
              )}
            >
              Замовлення
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default CartPage;
