import clsx from 'clsx';
import css from './modal.module.css';
import ArrowLeftSvgIcon from '../../assets/svg/ArrowLeft';
import { useModalCard } from './ModalContext';
import { useEffect, useState } from 'react';
import { apiService } from '../../services/api.service';
import RemoveSvgIcon from '../../assets/svg/Remove';
import AddSvgIcon from '../../assets/svg/Add';
import { useCart } from '../../context/cartContext';

interface Props {
  itemId: number | null;
  inCart: boolean;
  quantity?: number;
}

interface Category {
  id: string;
  display_name: string;
}

interface Dish {
  id: number;
}

interface Drink {
  id: number;
}

interface Product {
  id: number;
  title: string;
  subtitle: string;
  calories: number;
  price: number;
  description: string;
  categories: Category[];
  dishes: Dish[];
  drinks: Drink[];
  image_medium: string;
}
interface Item {
  product: Product | null;
  error: string | null;
  loading: boolean;
}
function ModalCard({ itemId, inCart, quantity = 1 }: Props) {
  const { addItem, rmItem, addQuantityOfItem, minusQuantityOfItem } = useCart();

  const [isOpen, setIsOpen] = useState(false);
  const [item, setItem] = useState<Item>({
    loading: false,
    error: null,
    product: null,
  });
  const { closeModalCard } = useModalCard();

  const [count, setCount] = useState(quantity);

  useEffect(() => {
    if (!itemId) {
      setIsOpen(false);
      return;
    }
    setItem(prev => ({ ...prev, loading: true }));
    apiService
      .getMenuItem(itemId)
      .then(data => {
        setItem(prev => ({ ...prev, product: data, error: null, loading: false }));
      })
      .catch(err => {
        setItem(prev => ({ ...prev, loading: false, error: err.mesage }));
      });
  }, [itemId]);

  useEffect(() => {
    if (!item.product) return;
    setIsOpen(true);
  }, [item.product]);

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

  const addToCart = () => {
    addItem({ ...(item.product as Product) }, count);
  };

  const rmFromCart = () => {
    if (!itemId) return;
    rmItem(itemId);
  };

  return (
    <div className={clsx(isOpen ? css.open : css.close, css.overlay)}>
      <div className="container">
        <div className={css.modalHeader}>
          <nav>
            <button className={css.mealBackButton} onClick={() => closeModalCard()}>
              {<ArrowLeftSvgIcon fill={'var(--grey-shades-500)'} />}Назад
            </button>
          </nav>
        </div>
        <div className={css.imageBox}>
          <img src={item.product?.image_medium || '/Chef.png'} className={css.image} />
        </div>
        <div className={css.contentBox}>
          <div className={css.titleBox}>
            <h2 className={clsx('montserrat-font', 'montserrat-large', css.contentTitle)}>
              {item.product?.title} {item.product?.subtitle}
            </h2>
            {!inCart ? (
              <div className={css.counter}>
                <button
                  className={css.counterButton}
                  onClick={() => setCount(prev => prev - 1)}
                  disabled={count < 2}
                >
                  <RemoveSvgIcon fill="var(--grey-shades-500)" />
                </button>
                <span className={clsx(css.counterNumber, 'roboto-font', 'roboto-medium')}>
                  {count}
                </span>
                <button className={css.counterButton} onClick={() => setCount(prev => prev + 1)}>
                  <AddSvgIcon fill="var(--grey-shades-500)" />
                </button>
              </div>
            ) : (
              <div className={css.counter}>
                <button
                  className={css.counterButton}
                  onClick={() => minusQuantityOfItem(itemId as number)}
                  disabled={count < 2}
                >
                  <RemoveSvgIcon fill="var(--grey-shades-500)" />
                </button>
                <span className={clsx(css.counterNumber, 'roboto-font', 'roboto-medium')}>
                  {quantity}
                </span>
                <button
                  className={css.counterButton}
                  onClick={() => addQuantityOfItem(itemId as number)}
                >
                  <AddSvgIcon fill="var(--grey-shades-500)" />
                </button>
              </div>
            )}
          </div>
          <div className={css.paragraph}>
            <p className={clsx('montserrat-font', 'montserrat-small', 'montserrat-small-500')}>
              {item.product?.description ||
                'Нажаль хтось забув додати опис. Мабуть тому, що ми були зайняті створенням шедеврально смачної страви обовязково спробуйте!!!'}
            </p>
          </div>
          <div className={css.priceBox}>
            <span className={clsx('roboto-font', 'roboto-medium', css.priceText)}>
              &#x20B4;{item.product?.price}
            </span>
            <button
              className={css.addToCart}
              onClick={() => (!inCart ? addToCart() : rmFromCart())}
            >
              {!inCart ? 'Додати в кошик' : 'Видалити з кошика'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalCard;
