import clsx from 'clsx';
import { cloudinaryTransform } from '../../utils/cloudinaryTransform';
import { useCart } from '../../context/cartContext';

import css from './orders.module.css';
import DeleteSvgIcon from '../../assets/svg/Delete';
import RemoveSvgIcon from '../../assets/svg/Remove';
import AddSvgIcon from '../../assets/svg/Add';

interface Props {
  id: number;
  title: string;
  subtitle: string;
  image_medium: string;
  price: number;
  quantity: number;
  disableQuantity?: boolean;
}

function OrderItem({
  image_medium,
  id,
  title,
  subtitle,
  price,
  quantity,
  disableQuantity = false,
}: Props) {
  const { rmItem, addQuantityOfItem, minusQuantityOfItem } = useCart();
  return (
    <li className={css.listItem}>
      <div className={css.itemImage}>
        <img
          src={
            !image_medium
              ? '/Chef.png'
              : cloudinaryTransform(image_medium, { w: 100, h: 90, crop: 'fill' })
          }
        />
      </div>
      <div className={css.itemDescription}>
        <div>
          <h3 className={clsx('montserrat-font', 'montserrat-medium')}>
            {title} {subtitle}
          </h3>
        </div>
        <div className={css.itemPriceCountBox}>
          <span className={clsx('roboto-font', 'roboto-medium')}>&#x20B4;{price}</span>
          <div className={css.counterBox}>
            {quantity === 1 ? (
              <button
                className={css.counterButton}
                onClick={() => rmItem(id)}
                disabled={disableQuantity}
              >
                <DeleteSvgIcon fill="var(--grey-shades-500)" />
              </button>
            ) : (
              <button
                className={css.counterButton}
                onClick={() => minusQuantityOfItem(id)}
                disabled={disableQuantity}
              >
                <RemoveSvgIcon fill="var(--grey-shades-500)" />
              </button>
            )}
            <span className={clsx(css.counterNumber, 'roboto-mono-font')}>{quantity}</span>
            <button
              className={css.counterButton}
              onClick={() => addQuantityOfItem(id)}
              disabled={disableQuantity}
            >
              <AddSvgIcon fill="var(--grey-shades-500)" />
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}

export default OrderItem;
