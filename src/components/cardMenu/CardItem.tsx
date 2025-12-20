import clsx from 'clsx';
import css from './card.module.css';
import AddSvgIcon from '../../assets/svg/Add';
import { cloudinaryTransform } from '../../utils/cloudinaryTransform';

import { useModalCard } from '../ModalCard/ModalContext';
import { useCart } from '../../context/cartContext';
// import { useEffect, useState } from 'react';
import RemoveSvgIcon from '../../assets/svg/Remove';
import { useState } from 'react';

interface Props {
  product: {
    id: string;
    title: string;
    subtitle: string;
    price: number;
    image_medium: string;
  };
  page: number;
  IsInCart: boolean;
}
// https://res.cloudinary.com/demo/image/upload/c_scale,w_150/docs/camera.jpg
export interface SearchFromLocaion {
  itemId: string;
  search: string;
  page: number;
}
function CardItem({ product, IsInCart }: Props) {
  const { openModalCard } = useModalCard();
  const { rmItem, addItem } = useCart();

  const [lastAction, setLastAction] = useState<string | null>(null);

  const onCardClick = () => {
    openModalCard(product.id);
  };
  const onAddClick = () => {
    addItem({ ...product });
    setLastAction(`${product.title} ${product.subtitle} додано до кошика`);
    setTimeout(() => setLastAction(null), 1500);
  };
  const onRemoveClick = () => {
    rmItem(product.id);
    setLastAction(`${product.title} ${product.subtitle} видалено з кошика`);
    setTimeout(() => setLastAction(null), 1500);
  };
  return (
    <li
      className={css.card}
      id={`item-${product.id}`}
      aria-label={`Картка страви ${product.title} ${product.subtitle}`}
    >
      <button
        className={css.cardButton}
        onClick={() => onCardClick()}
        aria-label={`Більше про ${product.title} ${product.subtitle}`}
      >
        <div className={css.imageWrapper}>
          <img
            src={
              !product.image_medium
                ? '/Chef.png'
                : cloudinaryTransform(product.image_medium, { w: 200, h: 130, crop: 'fill' })
            }
            alt={'картинка' + product.title + ' ' + product.subtitle}
            className={css.image}
          />
          {/* <div className={css.rating}>
        ⭐ <span>{product.rating}</span>
      </div> */}
        </div>
        <div className={css.info}>
          <h3 className={clsx(css.name, 'montserrat-font', 'montserrat-medium')}>
            {product.title + ' ' + product.subtitle}
          </h3>
          <p className={clsx(css.price, 'roboto-font', 'roboto-medium')}>&#x20B4;{product.price}</p>
        </div>
      </button>
      {IsInCart ? (
        <button
          className={css.addBtn}
          aria-label={`Видалити ${product.title} ${product.subtitle} з кошика`}
          onClick={() => onRemoveClick()}
        >
          <RemoveSvgIcon fill={'var(--prymary-color-600)'} />
        </button>
      ) : (
        <button
          className={css.addBtn}
          aria-label={`Додати ${product.title} ${product.subtitle} у кошик`}
          onClick={() => onAddClick()}
        >
          <AddSvgIcon fill={'var(--prymary-color-600)'} />
        </button>
      )}
      <div aria-live="polite" className="sr-only">
        {lastAction && `${lastAction}`}
      </div>
    </li>
  );
}

export default CardItem;
