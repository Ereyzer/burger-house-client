import clsx from 'clsx';
import css from './orderPalce.module.css';

interface Props {
  subTotal: number;
  discont: number;
  deliveryPrice: number;
  totalPrice: number;
  isDisabledContinueBtn: boolean;
  setScreen: () => void;
}

function OrderedPlaceFooter({
  subTotal,
  discont,
  deliveryPrice,
  totalPrice,
  isDisabledContinueBtn,
  setScreen,
}: Props) {
  return (
    <>
      <ul className={css.billTotalsList}>
        <li className={css.billTotalsItem}>
          <span
            className={clsx(
              'montserrat-font',
              'montserrat-medium',
              'montserrat-medium-400',
              css.billTotalName,
            )}
          >
            Сума
          </span>
          <span className={clsx('roboto-font', 'roboto-medium', css.billTotalName)}>
            {subTotal}
          </span>
        </li>
        <li className={css.billTotalsItem}>
          <span
            className={clsx(
              'montserrat-font',
              'montserrat-medium',
              'montserrat-medium-400',
              css.billTotalName,
            )}
          >
            Знижка
          </span>
          <span className={clsx('roboto-font', 'roboto-medium', css.billTotalName)}>
            -{discont}
          </span>
        </li>
        <li className={css.billTotalsItem}>
          <span
            className={clsx(
              'montserrat-font',
              'montserrat-medium',
              'montserrat-medium-400',
              css.billTotalName,
            )}
          >
            Ціна доставки
          </span>
          <span className={clsx('roboto-font', 'roboto-medium', css.billTotalName)}>
            +{deliveryPrice}
          </span>
        </li>
        <li className={css.billTotalsItem}>
          <span
            className={clsx(
              'montserrat-font',
              'montserrat-large',
              'montserrat-large-400',
              css.billTotalNameTotal,
            )}
          >
            Загалом
          </span>
          <span className={clsx('roboto-font', 'roboto-medium', css.billTotalNameTotal)}>
            {totalPrice}
          </span>
        </li>
      </ul>
      <div className={css.totalPriceBox}>
        <span className={clsx('roboto-font', 'roboto-h', css.totalPric)}>
          &#x20B4; {totalPrice}
        </span>
        <button
          type="button"
          className={clsx(
            'montserrat-font',
            'montserrat-medium',
            'montserrat-medium-700',
            css.takeOrder,
          )}
          onClick={() => setScreen()}
          disabled={isDisabledContinueBtn}
        >
          Продовжити
        </button>
      </div>
    </>
  );
}

export default OrderedPlaceFooter;
