import type { CartItem } from '../../context/cartContext';
import OrderItem from './orderItem';

import css from './orders.module.css';

interface Props {
  items: CartItem[];
  isAllList?: boolean;
  disableQuantity?: boolean;
}
function OrderList({ items, isAllList = true, disableQuantity = false }: Props) {
  return (
    <ul className={css.list}>
      {items
        .slice(0, isAllList ? items.length : 2)
        .map(({ id, quantity, title, subtitle, image_medium, price }) => {
          return (
            <OrderItem
              key={id}
              id={id}
              title={title}
              subtitle={subtitle}
              image_medium={image_medium}
              price={price}
              quantity={quantity}
              disableQuantity={disableQuantity}
            />
          );
        })}
    </ul>
  );
}

export default OrderList;
