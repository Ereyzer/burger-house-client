import clsx from 'clsx';
import css from './card.module.css';
import AddSvgIcon from '../../assets/svg/Add';
import { cloudinaryTransform } from '../../utils/cloudinaryTransform';

interface Props {
  product: {
    id: number;
    title: string;
    subtitle: string;
    price: number;
    image_medium: string;
  };
}
// https://res.cloudinary.com/demo/image/upload/c_scale,w_150/docs/camera.jpg
function CardItem({ product }: Props) {
  return (
    <li className={css.card}>
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
        <button className={css.addBtn} aria-label={`Додати ${product.title} ${product.subtitle}`}>
          <AddSvgIcon fill={'var(--prymary-color-600)'} />
        </button>
      </div>
    </li>
  );
}

export default CardItem;
