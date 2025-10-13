import clsx from 'clsx';
import css from './cart.module.css';

function CartPage() {
  return (
    <section className="container">
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
        >
          Знайти
        </button>
      </div>
    </section>
  );
}

export default CartPage;
