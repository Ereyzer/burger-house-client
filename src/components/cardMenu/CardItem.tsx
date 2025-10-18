import clsx from 'clsx';
import css from './card.module.css';
import AddSvgIcon from '../../assets/svg/Add';
import { cloudinaryTransform } from '../../utils/cloudinaryTransform';

import { useModalCard } from '../ModalCard/ModalContext';
import { useCart } from '../../context/cartContext';
// import { useEffect, useState } from 'react';
import RemoveSvgIcon from '../../assets/svg/Remove';

interface Props {
  product: {
    id: number;
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

  const onCardClick = () => {
    openModalCard(product.id);
  };
  const onAddClick = () => {
    addItem({ ...product });
  };
  const onRemoveClick = () => {
    rmItem(product.id);
  };
  return (
    <li className={css.card} id={`item-${product.id}`}>
      <button className={css.cardButton} onClick={() => onCardClick()}>
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
          aria-label={`Додати ${product.title} ${product.subtitle}`}
          onClick={() => onRemoveClick()}
        >
          <RemoveSvgIcon fill={'var(--prymary-color-600)'} />
        </button>
      ) : (
        <button
          className={css.addBtn}
          aria-label={`Додати ${product.title} ${product.subtitle}`}
          onClick={() => onAddClick()}
        >
          <AddSvgIcon fill={'var(--prymary-color-600)'} />
        </button>
      )}
    </li>
  );
}

export default CardItem;
