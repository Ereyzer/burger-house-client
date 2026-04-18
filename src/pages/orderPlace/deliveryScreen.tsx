import clsx from 'clsx';
import css from './orderPalce.module.css';
import AutocomleteList from './autocompleteList';
import { useAboutPlace } from '../../context/aboutContext';

type DeliveryType = 'delivery' | 'pickup';
interface Props {
  deliveryType: DeliveryType;
  setDeliveryType: (deliveryType: DeliveryType) => void;
  street: string;
  setStreet: (value: string) => void;
  houseNumber: string;
  setHouseNumber: (value: string) => void;
  additional: string;
  setAdditional: (value: string) => void;
  streetAutocomplete: { street: string }[];
}

function DeliveryScreen({
  deliveryType,
  setDeliveryType,
  street,
  setStreet,
  houseNumber,
  setHouseNumber,
  additional,
  setAdditional,
  streetAutocomplete,
}: Props) {
  const { deliveryOn } = useAboutPlace();
  return (
    <>
      <div className={css.deliveryScreen}>
        <div
          className={css.deliverRadioBlock}
          onClick={() => !deliveryOn || setDeliveryType('delivery')}
        >
          <label
            htmlFor="delivery"
            className={clsx('montserrat-font', 'montserrat-medium', 'montserrat-medium-400')}
          >
            Доставка {!deliveryOn && '(недоступна)'}
          </label>
          <input
            type="radio"
            id="delivery"
            value="delivery"
            name="delivery_type"
            checked={deliveryType === 'delivery'}
            onChange={() => setDeliveryType('delivery')}
            disabled={!deliveryOn}
          />
        </div>
        <div className={css.deliverRadioBlock} onClick={() => setDeliveryType('pickup')}>
          <label
            htmlFor="pickup"
            className={clsx('montserrat-font', 'montserrat-medium', 'montserrat-medium-400')}
          >
            Заберу в закладі
          </label>
          <input
            type="radio"
            id="pickup"
            value="pickup"
            name="delivery_type"
            checked={deliveryType === 'pickup'}
            onChange={() => setDeliveryType('pickup')}
          />
        </div>
      </div>
      {deliveryType === 'delivery' && (
        <form className={css.addressForm}>
          {/* <label htmlFor="street">Вулиця</label>   */}
          <div className={css.streetDiv}>
            <input
              id="street"
              name="street"
              value={street}
              onChange={e => setStreet(e.target.value)}
              // autoComplete="address-line1"
              autoComplete="off"
              type="text"
              placeholder="Почніть вводити назву вулиці"
              className={clsx(
                'montserrat-font',
                'montserrat-medium',
                'montserrat-medium-400',
                css.street,
                streetAutocomplete.length > 0 ? css.autocompleteInput : '',
              )}
            />
            {streetAutocomplete.length > 0 && (
              <AutocomleteList
                items={streetAutocomplete}
                setStreet={setStreet}
                isOpen={streetAutocomplete.length > 0}
              />
            )}
          </div>

          {/* <label htmlFor="house-number">Будинок</label> */}
          <input
            id="house-number"
            name="house-number"
            value={houseNumber}
            onChange={e => setHouseNumber(e.target.value)}
            autoComplete="address-line2"
            type="text"
            placeholder="номер будинку"
            className={clsx('montserrat-font', 'montserrat-medium', 'montserrat-medium-400')}
          />
          <textarea
            id="additional"
            name="additional"
            value={additional}
            onChange={e => setAdditional(e.target.value)}
            autoComplete="address-line3"
            maxLength={100}
            rows={3}
            placeholder="Додатково (наприклад: під'їзд, корпус 2)"
            className={clsx('montserrat-font', 'montserrat-medium', 'montserrat-medium-400')}
          />
        </form>
      )}
    </>
  );
}

export default DeliveryScreen;
