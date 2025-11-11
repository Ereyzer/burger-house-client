import clsx from 'clsx';
import css from './modal.module.css';
import ArrowLeftSvgIcon from '../../assets/svg/ArrowLeft';
import { useModalCard } from './ModalContext';
import { useEffect, useRef, useState } from 'react';
import { apiService } from '../../services/api.service';
import RemoveSvgIcon from '../../assets/svg/Remove';
import AddSvgIcon from '../../assets/svg/Add';
import { useCart } from '../../context/cartContext';
import { wordEndForStravy } from '../../utils/words/words';

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
  const initialFocusRef = useRef<HTMLButtonElement | null>(null);
  const lastFocusRef = useRef<HTMLButtonElement | null>(null);
  const previouslyActiveElement = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!itemId) {
      setIsOpen(false);
      return;
    }
    previouslyActiveElement.current = document.activeElement as HTMLButtonElement;
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
    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (!e.shiftKey && e.target === lastFocusRef.current) {
        e.preventDefault();
        initialFocusRef.current?.focus();
      }
      if (e.shiftKey && e.target === initialFocusRef.current) {
        e.preventDefault();
        lastFocusRef.current?.focus();
      }
    };
    if (isOpen) {
      // if (initialFocusRef.current) {
      //   initialFocusRef.current.focus();
      // }
      if (document.getElementById('modal-title')) {
        document.getElementById('modal-title')?.focus();
      }
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleTabKey);
    } else {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleTabKey);
    }

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleTabKey);
      previouslyActiveElement.current?.focus();
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
    <>
      <div
        className={clsx(isOpen ? css.open : css.close, css.overlay)}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        {/* <div className="sr-only" aria-live="polite">
          {isOpen && 'Ви у вікні опису страви. Проведіть двома пальцями, щоб прокрутити вміст.'}
        </div> */}
        <div className="container">
          <div className={css.modalHeader}>
            <nav>
              <button
                className={css.mealBackButton}
                onClick={() => closeModalCard()}
                ref={initialFocusRef}
                aria-label="повернутися назад до меню"
              >
                {<ArrowLeftSvgIcon fill={'var(--grey-shades-500)'} />}Назад
              </button>
            </nav>
          </div>
          <div className={css.imageBox}>
            <img
              src={item.product?.image_medium || '/Chef.png'}
              className={css.image}
              alt={`Зображення страви ${item.product?.title || ''} ${item.product?.subtitle || ''}`}
            />
          </div>
          <div className={css.contentBox}>
            <div className={css.titleBox}>
              <h2
                id="modal-title"
                tabIndex={-1}
                className={clsx('montserrat-font', 'montserrat-large', css.contentTitle)}
              >
                {item.product?.title} {item.product?.subtitle}
              </h2>
              {!inCart ? (
                <div className={css.counter}>
                  <button
                    className={css.counterButton}
                    onClick={() => setCount(prev => prev - 1)}
                    disabled={count < 2}
                    aria-label="зменшити кількість на один"
                  >
                    <RemoveSvgIcon fill="var(--grey-shades-500)" />
                  </button>
                  <span
                    className={clsx(css.counterNumber, 'roboto-font', 'roboto-medium')}
                    role="status"
                    aria-live="assertive"
                    aria-atomic="true"
                    // aria-label={`Кількість: ${count}`}
                  >
                    {count}
                  </span>
                  <button
                    className={css.counterButton}
                    onClick={() => setCount(prev => prev + 1)}
                    aria-label="збільшити кількість на один"
                  >
                    <AddSvgIcon fill="var(--grey-shades-500)" />
                  </button>
                </div>
              ) : (
                <div className={css.counter}>
                  <button
                    className={css.counterButton}
                    onClick={() => minusQuantityOfItem(itemId as number)}
                    disabled={quantity < 2}
                    aria-label="зменшити кілкість на один"
                  >
                    <RemoveSvgIcon fill="var(--grey-shades-500)" />
                  </button>
                  <span
                    className={clsx(css.counterNumber, 'roboto-font', 'roboto-medium')}
                    // aria-label={`зараз обрано ${quantity} страв${wordEndForStravy(quantity)}`}
                    aria-live="assertive"
                    aria-atomic="true"
                  >
                    {quantity}
                  </span>
                  <button
                    className={css.counterButton}
                    onClick={() => addQuantityOfItem(itemId as number)}
                    aria-label="збільшити кількість на один"
                  >
                    <AddSvgIcon fill="var(--grey-shades-500)" />
                  </button>
                </div>
              )}
            </div>
            <div className={css.paragraph}>
              <p
                id="modal-description"
                className={clsx('montserrat-font', 'montserrat-small', 'montserrat-small-500')}
              >
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
                ref={lastFocusRef}
              >
                {!inCart ? 'Додати в кошик' : 'Видалити з кошика'}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="sr-only" aria-live="polite">
        {item.loading && 'Завантаження даних про страву...'}
        {item.error && 'Помилка завантаження даних'}
      </div>
    </>
  );
}

export default ModalCard;
