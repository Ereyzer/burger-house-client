import clsx from 'clsx';
import OrderList from '../../components/orders/orderList';
import { useCart } from '../../context/cartContext';
import css from './orderPalce.module.css';
import { useEffect, useRef, useState } from 'react';
import { apiService } from '../../services/api.service';
import OrderHeader from './orderHeader';
import DeliveryScreen from './deliveryScreen';
import OrderedPage from './orderedPage';
import ContactScreen from './contactScreen';
import type { PaymentMethod } from './types';
import PaymentScreen from './paymentScreen';
import OrderedPlaceFooter from './orderedPlaceFooter';

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
  const [textareaRows, setTextareaRows] = useState(3);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [payment, setPayment] = useState<PaymentMethod>('CASH_ON_DELIVERY');
  const [isDisabledContinueBtn, setIsDesabledContinueBtn] = useState(false);
  const [street, setStreet] = useState('');
  const [houseNumber, setHouseNumber] = useState('');
  const [additional, setAdditional] = useState('');

  const handleInput = () => {
    const el = textareaRef.current;
    if (el) {
      // el.style.height = 'auto';
      // el.style.height = el.scrollHeight + 5 + 'px';
      console.log(el.scrollHeight);
    }
  };
  useEffect(() => {
    const el = textareaRef.current;

    if (!el) return;
    if (el.scrollHeight <= 101) return;
    console.log('ssss: ', Math.ceil(el.scrollHeight / 34));

    setTextareaRows(Math.ceil(el.scrollHeight / 34));
  }, [orderComment]);
  useEffect(() => {
    if (!isOpen) return;
    const ids = items.map(({ id, quantity }) => ({
      id,
      quantity,
    }));
    apiService
      .getTotalPrice(ids)
      .then(({ total, discont, subTotal, delivery }) => {
        if (discont) setDiscont(discont);
        setTotalPrice(total);
        if (delivery) setDeliveryPrice(delivery);
        if (subTotal) setSubTotal(subTotal);
      })
      .catch();
  }, [items, isOpen, discont, deliveryType]);
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
  const chooseScreen = () => {
    switch (screen) {
      case 0:
        return (
          <>
            <OrderHeader title="Замовлення" onBackButtonClick={onBackButtonClick} />
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
              placeholder="Алергія на горіхи!!! Будь ласка без цибулі."
              rows={textareaRows}
              className={clsx(
                'montserrat-font',
                'montserrat-medium',
                'montserrat-medium-400',
                css.orderComment,
              )}
              ref={textareaRef}
              onInput={handleInput}
            />
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
      case 1:
        return (
          <>
            <OrderHeader title="Ваші контакти" onBackButtonClick={onBackButtonClick} />
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
            <OrderHeader title="Спосіб отримання" onBackButtonClick={onBackButtonClick} />
            <DeliveryScreen
              deliveryType={deliveryType}
              setDeliveryType={setDeliveryType}
              street={street}
              setStreet={setStreet}
              houseNumber={houseNumber}
              setHouseNumber={setHouseNumber}
              additional={additional}
              setAdditional={setAdditional}
            />
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
      case 3:
        return deliveryType === 'delivery' ? (
          <>
            <OrderHeader title="Спосіб оплати" onBackButtonClick={onBackButtonClick} />
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
            <OrderHeader title="Спосіб оплати" onBackButtonClick={onBackButtonClick} />
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
