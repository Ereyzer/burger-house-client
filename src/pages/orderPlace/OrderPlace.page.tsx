import clsx from 'clsx';
import OrderList from '../../components/orders/orderList';
import { useCart } from '../../context/cartContext';
import css from './orderPalce.module.css';
import { useEffect, useMemo, useRef, useState } from 'react';
import { apiService } from '../../services/api.service';
import OrderHeader from './orderHeader';
import DeliveryScreen from './deliveryScreen';
import OrderedPage from './orderedPage';
import ContactScreen from './contactScreen';
import type { PaymentMethod } from './types';
import PaymentScreen from './paymentScreen';
import OrderedPlaceFooter from './orderedPlaceFooter';
import { myDebounce } from '../../utils/dbounce-trottle';
import WarningLine from './warnungLine';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  prevTotal: number;
}
function OrderPlacePage({ isOpen, onClose, prevTotal }: Props) {
  const { items } = useCart();
  const [itemsOnScreen, setItemsOnScreen] = useState(2);
  const [subTotal, setSubTotal] = useState(() => prevTotal);
  const [totalPrice, setTotalPrice] = useState(() => prevTotal);

  const [deliveryPrice, setDeliveryPrice] = useState(0);
  const [discont, setDiscont] = useState(0);
  const [screen, setScreen] = useState(0);
  const [deliveryType, setDeliveryType] = useState<'delivery' | 'pickup'>('delivery');
  const [orderComment, setOrderComment] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [textareaRows, setTextareaRows] = useState(2);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [payment, setPayment] = useState<PaymentMethod>('CASH_ON_DELIVERY');
  const [isDisabledContinueBtn, setIsDesabledContinueBtn] = useState(false);
  const [street, setStreet] = useState('');
  const [houseNumber, setHouseNumber] = useState('');
  const [additional, setAdditional] = useState('');
  const [checkOrderPrice, setCheckOrderPrice] = useState(false);
  const [streetAutocomplete, setStreetAutocomplete] = useState<{ street: string }[]>([]);
  const [outOfDistanc, setOutOfDistance] = useState(false);
  const [distance, setDistace] = useState<number>(0);

  const headerRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    headerRef.current?.focus();
    console.log(headerRef.current);
  }, [screen]);

  useEffect(() => {
    const el = textareaRef.current;

    if (!el) return;
    if (el.scrollHeight <= 66) return;

    setTextareaRows(Math.ceil(el.scrollHeight / 34));
  }, [orderComment]);

  useEffect(() => {
    if (!isOpen || !checkOrderPrice) return;
    setCheckOrderPrice(false);
    const ids = items.map(({ id, quantity }) => ({
      id,
      quantity,
    }));

    apiService
      .getDistance(`${street} ${houseNumber}`)
      .then(data => {
        apiService
          .getTotalPrice(ids, deliveryType === 'delivery', data.distanceMeters)
          .then(({ total, discont, subTotal, delivery, outOfDistance }) => {
            setDiscont(discont);
            setTotalPrice(total);
            setDeliveryPrice(delivery);
            setSubTotal(subTotal);
            setOutOfDistance(outOfDistance);
            setDistace(data.distanceMeters);
          })
          .catch();
      })
      .catch(err => {
        console.log(err);
      });
  }, [isOpen, checkOrderPrice, deliveryType, items, street, houseNumber]);

  const onMoreClick = () => {
    setItemsOnScreen(items.length);
  };

  const onLessClick = () => {
    setItemsOnScreen(2);
  };

  const onBackButtonClick = () => {
    if (screen === 0) return onClose();
    return setScreen(prev => prev - 1);
  };

  const autocompleteWithDebounce = useMemo(
    () =>
      myDebounce((value: string) => {
        apiService.autocompleteStreet(value).then(data => {
          setStreetAutocomplete([...data]);
        });
      }, 900),
    [],
  );
  const setStreetWithAutocomplete = (value: string, closeAutocomplete?: boolean) => {
    setStreet(value);
    if (closeAutocomplete) {
      setStreetAutocomplete([]);
      return;
    }
    autocompleteWithDebounce(value);
  };
  const chooseScreen = () => {
    switch (screen) {
      case 0:
        return (
          <>
            {/* <p id="category-scroll-hint" className="sr-only">
              Список категорій можна прокручувати вліво або вправо двома пальцями.
            </p> */}
            <OrderHeader
              title="Замовлення"
              onBackButtonClick={onBackButtonClick}
              titleRef={headerRef}
            />
            <OrderList
              items={items}
              isAllList={items.length === itemsOnScreen}
              disableQuantity={true}
            ></OrderList>
            {items.length > itemsOnScreen ? (
              <button
                className={clsx(
                  css.lessMoreButtons,
                  'montserrat-font',
                  'montserrat-medium',
                  'montserrat-medium-700',
                )}
                onClick={() => onMoreClick()}
                aria-label={`Показати ще ${items.length - itemsOnScreen} позиції`}
              >
                +{items.length - itemsOnScreen} Ще
              </button>
            ) : (
              <button
                className={clsx(
                  css.lessMoreButtons,
                  'montserrat-font',
                  'montserrat-medium',
                  'montserrat-medium-700',
                )}
                onClick={() => onLessClick()}
                aria-label="Приховати частину списку замовлень"
              >
                Менше
              </button>
            )}
            <textarea
              id="orderComment"
              name="orderComment"
              value={orderComment}
              onChange={e => setOrderComment(e.target.value)}
              autoComplete="off"
              maxLength={250}
              aria-label="Тут можна додати ваші побажання або алергії наприклад: "
              placeholder="Алергія на горіхи!!! Будь ласка без цибулі."
              rows={textareaRows}
              className={clsx(
                'montserrat-font',
                'montserrat-medium',
                'montserrat-medium-400',
                css.orderComment,
              )}
              ref={textareaRef}
            />
            <OrderedPlaceFooter
              setScreen={() => setScreen(prev => prev + 1)}
              discont={discont}
              subTotal={subTotal}
              deliveryPrice={deliveryPrice}
              totalPrice={prevTotal}
              isDisabledContinueBtn={isDisabledContinueBtn}
            />
          </>
        );
      case 1:
        return (
          <>
            <OrderHeader
              title="Ваші контакти"
              onBackButtonClick={onBackButtonClick}
              titleRef={headerRef}
            />
            <ContactScreen name={name} phone={phone} setName={setName} setPhone={setPhone} />
            <OrderedPlaceFooter
              setScreen={() => setScreen(prev => prev + 1)}
              discont={discont}
              subTotal={subTotal}
              deliveryPrice={deliveryPrice}
              totalPrice={totalPrice}
              isDisabledContinueBtn={isDisabledContinueBtn}
            />
          </>
        );
      case 2:
        return (
          <>
            <OrderHeader
              title="Спосіб отримання"
              onBackButtonClick={() => {
                setCheckOrderPrice(prev => !prev);
                onBackButtonClick();
              }}
              titleRef={headerRef}
            />
            <DeliveryScreen
              deliveryType={deliveryType}
              setDeliveryType={setDeliveryType}
              street={street}
              setStreet={setStreetWithAutocomplete}
              houseNumber={houseNumber}
              setHouseNumber={setHouseNumber}
              additional={additional}
              setAdditional={setAdditional}
              streetAutocomplete={streetAutocomplete}
            />
            <OrderedPlaceFooter
              setScreen={() => {
                setCheckOrderPrice(prev => !prev);
                setScreen(prev => prev + 1);
              }}
              discont={discont}
              subTotal={subTotal}
              deliveryPrice={deliveryPrice}
              totalPrice={totalPrice}
              isDisabledContinueBtn={isDisabledContinueBtn}
            />
          </>
        );
      case 3:
        return deliveryType === 'delivery' ? (
          <>
            <OrderHeader
              title="Спосіб оплати"
              onBackButtonClick={onBackButtonClick}
              titleRef={headerRef}
            />
            {outOfDistanc && (
              <WarningLine message="Ціну доставки уточнюйте при підтведжені замовлення не вдалося знайти адесу!" />
            )}
            <PaymentScreen payment={payment} setPayment={setPayment} />
            <OrderedPlaceFooter
              setScreen={() => setScreen(prev => prev + 1)}
              discont={discont}
              subTotal={subTotal}
              deliveryPrice={deliveryPrice}
              totalPrice={totalPrice}
              isDisabledContinueBtn={isDisabledContinueBtn}
            />
          </>
        ) : (
          <>
            <OrderHeader
              title="Спосіб оплати"
              onBackButtonClick={onBackButtonClick}
              titleRef={headerRef}
            />
            <PaymentScreen payment={payment} setPayment={setPayment} />
            <OrderedPlaceFooter
              setScreen={() => setScreen(prev => prev + 1)}
              discont={discont}
              subTotal={subTotal}
              deliveryPrice={deliveryPrice}
              totalPrice={totalPrice}
              isDisabledContinueBtn={isDisabledContinueBtn}
            />
          </>
        );
      case 4:
        return (
          <OrderedPage
            order={
              deliveryType === 'pickup'
                ? {
                    delivery: false,
                    description: orderComment,
                    phone,
                    amount: totalPrice,
                    payment,
                    customerName: name,
                    selections: items.map(({ id, quantity }) => ({ id, quantity })),
                    deliveryPrice: 0,
                  }
                : {
                    delivery: true,
                    description: orderComment,
                    phone,
                    amount: totalPrice,
                    payment,
                    customerName: name,
                    selections: items.map(({ id, quantity }) => ({ id, quantity })),
                    deliveryPrice,
                    address: `${street} ${houseNumber}`,
                    street,
                    addressClarification: additional,
                    distance,
                  }
            }
          />
        );
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    switch (screen) {
      case 0:
        setIsDesabledContinueBtn(false);
        break;
      case 1:
        if (name === '' || phone === '' || phone.length !== 9 || name.length < 3) {
          setIsDesabledContinueBtn(true);
        } else {
          setIsDesabledContinueBtn(false);
        }

        break;

      case 2:
        if (deliveryType === 'pickup') {
          setIsDesabledContinueBtn(false);
          break;
        } else if (deliveryType === 'delivery' && street.length > 4 && houseNumber.length > 0) {
          setIsDesabledContinueBtn(false);
        } else {
          setIsDesabledContinueBtn(true);
        }
        break;
      default:
        break;
    }
  }, [screen, name, phone, deliveryType, street, houseNumber]);

  return (
    <div className={clsx(isOpen ? css.open : css.close, css.overlay)}>
      <section className="container">
        <div className="sr-only" aria-live="polite">
          {screen === 0 && 'Ви на екрані оформлення замовлення'}
          {screen === 1 && 'Ви на екрані введення контактних даних'}
          {screen === 2 && 'Ви на екрані вибору способу отримання'}
          {screen === 3 && 'Ви на екрані вибору оплати'}
          {screen === 4 && 'Ви на екрані підтвердження замовлення'}
        </div>
        {chooseScreen()}
        {/* {screen === 4 && deliveryType === 'pickup' ? (
          <OrderedPage
            order={{
              delivery: false,
              description: orderComment,
              phone,
              amount: totalPrice,
              payment,
              customerName: name,
              selections: items.map(({ id, quantity }) => ({ id, quantity })),
              deliveryPrice: 0,
            }}
          />
        ) : (
        )} */}
      </section>
    </div>
  );
}

export default OrderPlacePage;

// {subTotal: 50,discount: 10, delivery: 5,total: 40}
