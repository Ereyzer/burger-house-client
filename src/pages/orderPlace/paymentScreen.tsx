import type { PaymentMethod } from './types';
import css from './orderPalce.module.css';

interface Props {
  payment: PaymentMethod;
  setPayment: (value: PaymentMethod) => void;
}

function PaymentScreen({ payment, setPayment }: Props) {
  return (
    <>
      <div className={css.deliveryScreen}>
        <div className={css.deliverRadioBlock} onClick={() => setPayment('CASH_ON_DELIVERY')}>
          <label htmlFor="cashOnDelivery">Готівка при отримані</label>
          <input
            type="radio"
            id="cashOnDelivery"
            value="CASH_ON_DELIVERY"
            name="payment_type"
            checked={payment === 'CASH_ON_DELIVERY'}
            onChange={() => setPayment('CASH_ON_DELIVERY')}
          />
        </div>
        <div className={css.deliverRadioBlock} onClick={() => setPayment('CARD_ON_DELIVERY')}>
          <label htmlFor="cardOnDelivery">Карта при отримані</label>
          <input
            type="radio"
            id="cardOnDelivery"
            value="CARD_ON_DELIVERY"
            name="payment_type"
            checked={payment === 'CARD_ON_DELIVERY'}
            onChange={() => setPayment('CARD_ON_DELIVERY')}
          />
        </div>
      </div>
    </>
  );
}

export default PaymentScreen;
