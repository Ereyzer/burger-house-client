import clsx from 'clsx';
import CloseIconSvg from '../../assets/svg/Close';
import css from './orderPalce.module.css';
import { useEffect, useRef, useState } from 'react';
import { useAboutPlace } from '../../context/aboutContext';
import type { Order } from './interfaces';
import { apiService } from '../../services/api.service';
import ClockIconSvg from '../../assets/svg/Clock';
import CreditCardIconSvg from '../../assets/svg/CreditCard';
import LocationIconSvg from '../../assets/svg/Location';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/cartContext';

interface Props {
  //   onClose: () => void;
  order: Order;
}
// TODO: loader, create order, try again order, close Button
function OrderedPage({ order }: Props) {
  const [loadingOrder, setLoadingOrder] = useState(true);
  const [isError, setIsError] = useState(false);
  const { phone } = useAboutPlace();
  const { placeAddress } = useAboutPlace();
  const navigate = useNavigate();
  const cart = useCart();
  const firstRender = useRef(true);

  useEffect(() => {
    if (!firstRender.current) return;
    firstRender.current = false;
    apiService
      .createNewOrder(order)
      .then(data => {
        console.log(data);

        setLoadingOrder(false);
      })
      .catch(() => {
        setLoadingOrder(false);

        setIsError(true);
      });
  }, [order]);
  const tryAgainButton = () => {
    apiService
      .createNewOrder(order)
      .then(() => {
        setLoadingOrder(false);
      })
      .catch(() => {
        setLoadingOrder(false);

        setIsError(true);
      });
  };
  const onColseClick = () => {
    if (isError) {
      return;
    }
    cart.clearCart();
    navigate('/', { replace: true });
  };

  return (
    <>
      {loadingOrder ? (
        <></>
      ) : (
        <div>
          <div>
            <button onClick={() => onColseClick()}>
              <CloseIconSvg fill={'var(--grey-shades-500)'} width="48px" height="48px" />
            </button>
          </div>
          <div>
            <img src="/Check-filled.png" className={css.checkFieldImg}></img>
            {isError ? (
              <>
                <h1 className={clsx('montserrat-font', 'montserrat-h1', css.finalPageH)}>
                  Вибачте але у нас якийсь не зрозумілий збій спробуйте ще раз або зателефонуйте до
                  нас!
                </h1>
                <p className={clsx(css.finalPageP)}>
                  <a
                    href={`tel:+380${phone}`}
                    className={clsx(
                      css.finalPageP,
                      'montserrat-font',
                      'montserrat-medium',
                      'montserrat-medium-400',
                    )}
                  >{`+380${phone}`}</a>
                </p>
                <button
                  className={clsx(
                    css.finalPageB,
                    'montserrat-font',
                    'montserrat-medium',
                    'montserrat-medium-700',
                  )}
                  onClick={() => tryAgainButton()}
                >
                  Спробувати знову
                </button>
              </>
            ) : (
              <>
                <h1 className={clsx('montserrat-font', 'montserrat-h1', css.finalPageH)}>
                  Ура! Ваше замовлення надіслано.
                </h1>
                <p className={clsx(css.finalPageP)}>
                  В найближчі кілька хвилин ми зв'яжемося з вами для підтвердження.
                </p>
                <table className={clsx(css.orderedTable, 'montserrat-font', 'montserrat-medium')}>
                  {/* <thead>
                    <tr>
                      <th></th>
                      <th></th>
                      <th></th>
                    </tr>
                  </thead> */}
                  <tbody>
                    <tr>
                      <td>
                        <ClockIconSvg fill="var(--grey-shades-500)" />
                      </td>
                      <td>Доставимо</td>
                      <td className={css.orderTableValue}>як найшвидше</td>
                    </tr>
                    <tr>
                      <td>
                        <LocationIconSvg fill="var(--grey-shades-500)" />
                      </td>
                      <td>Отримати за адресою</td>
                      <td className={css.orderTableValue}>
                        {order.delivery ? order.address : placeAddress}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <CreditCardIconSvg fill="var(--grey-shades-500)" />
                      </td>
                      <td>До оплати</td>
                      <td className={css.orderTableValue}>{order.amount}</td>
                    </tr>
                  </tbody>
                </table>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default OrderedPage;
