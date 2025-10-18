import clsx from 'clsx';
import RemoveSvgIcon from '../../assets/svg/Remove';
import AddSvgIcon from '../../assets/svg/Add';
import css from './cart.module.css';
import DeleteSvgIcon from '../../assets/svg/Delete';
import { useCart } from '../../context/cartContext';
import { cloudinaryTransform } from '../../utils/cloudinaryTransform';

interface Props {
  id: number;
  title: string;
  subtitle: string;
  image_medium: string;
  price: number;
  quantity: number;
}

function CartItem({ image_medium, id, title, subtitle, price, quantity }: Props) {
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
              <button className={css.counterButton} onClick={() => rmItem(id)}>
                <DeleteSvgIcon fill="var(--grey-shades-500)" />
              </button>
            ) : (
              <button className={css.counterButton} onClick={() => minusQuantityOfItem(id)}>
                <RemoveSvgIcon fill="var(--grey-shades-500)" />
              </button>
            )}
            <span className={clsx(css.counterNumber, 'roboto-mono-font')}>{quantity}</span>
            <button className={css.counterButton} onClick={() => addQuantityOfItem(id)}>
              <AddSvgIcon fill="var(--grey-shades-500)" />
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}

export default CartItem;
