import { useCallback, useEffect, useRef, useState } from 'react';
import CardItem from '../../components/cardMenu/CardItem';
import CategoryItem from '../../components/category/CategoryItem';
import css from './home.module.css';
import clsx from 'clsx';
import { apiService } from '../../services/api.service';

import { useLocation, useSearchParams } from 'react-router-dom';
import ModalCardContextProvider from '../../components/ModalCard/ModalCardContextProvider';
import { useCart } from '../../context/cartContext';

// const categories = ['Акції', 'Бургери', 'Піца', 'Донати', 'Напої'];
const categories: { id: string; name: string }[] = [
  { id: 'all', name: 'Усе' },
  {
    id: 'burger',
    name: 'Бургер',
  },
  {
    id: 'drink',
    name: 'Напої',
  },
  {
    id: 'dessert',
    name: 'Десерти',
  },
  {
    id: 'vegeterian',
    name: 'Для вегетеріанців',
  },
  {
    id: 'salat',
    name: 'Салати',
  },
  {
    id: 'fried',
    name: 'Смажене',
  },
  {
    id: 'snack',
    name: 'Снеки',
  },
  {
    id: 'kombomenu',
    name: 'Комбо-меню',
  },
  {
    id: 'healsy',
    name: 'Здорова Їжа',
  },
  {
    id: 'special',
    name: 'Спеціальні пропозиції',
  },
  {
    id: 'spicy',
    name: 'Гостре',
  },
  {
    id: 'souse',
    name: 'Соуси',
  },
];

interface ListItem {
  id: string;
  title: string;
  subtitle: string;
  price: number;
  image_medium: string;
  categoryes: string[];
}
interface ProdactsState {
  loading: boolean;
  error: string | null;
  items: ListItem[];
  page?: number;
  hasNextPage?: boolean;
  hasPrevPage?: boolean;
  perPage?: number;
}
const perPage = 10;

function HomePage() {
  const location = useLocation();
  const [activCategory, setActivCategory] = useState(
    () => location.search.split('category=')[1]?.split('&')[0] || 'all',
  );
  const [products, setProducts] = useState<ProdactsState>({
    loading: false,
    error: null,
    items: [],
  });

  const loading = useRef(false);
  const page = useRef(0);
  const hasMore = useRef(true);

  const observerTarget = useRef<HTMLDivElement | null>(null);
  const [, setSearchParams] = useSearchParams();
  const { items } = useCart();

  const [addedItems, setAddedItems] = useState<string[]>([]);

  useEffect(() => {
    setAddedItems(() => items.map(({ id }) => id));
  }, [items]);

  const changeCategory = (newCategory: string) => {
    page.current = 0;
    hasMore.current = true;
    setActivCategory(newCategory);
    // setProducts(p => ({ ...p, items: [] }));
    // console.log(searchParams);

    setSearchParams({ category: newCategory });
    // setSearchParams(prev => ({ ...prev, some: 'some' }));
  };

  const loadMore = useCallback(async (activCategory: string) => {
    if (loading.current || !hasMore.current) return;

    setProducts(p => ({ ...p, loading: true }));
    loading.current = true;

    const p = page.current + 1;
    apiService
      .getMenu({
        category: activCategory === 'all' ? undefined : activCategory,
        page: p,
        perPage,
      })
      .then(data => {
        const { items: newItems, ...pagination } = data;

        setProducts(({ items }) => ({
          loading: false,
          error: null,
          items: p === 1 ? [...newItems] : [...items, ...newItems],
          ...pagination,
        }));
        loading.current = false;
        page.current = p;
        hasMore.current = pagination.hasNextPage;
      })
      .catch(err => {
        console.log(err);
        setProducts(p => ({ ...p, loading: false, error: err.mesage }));
        loading.current = false;
      });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          loadMore(activCategory);
        }
      },
      { threshold: 1.0, rootMargin: '200px' },
    );

    const current = observerTarget.current;

    if (current) observer.observe(current);
    return () => {
      if (current) observer.unobserve(current);
    };
  }, [activCategory, loadMore]);

  return (
    <section>
      {/* Category */}
      {
        // only for reeders
      }
      <p id="category-scroll-hint" className="sr-only">
        Список категорій можна прокручувати вліво або вправо двома пальцями.
      </p>
      <nav
        className={css.categories}
        aria-label="Категорії меню"
        role="tablist"
        aria-describedby="category-scroll-hint"
      >
        {categories.map(({ name, id }) => (
          <CategoryItem
            category={name}
            index={id}
            isActiv={id === activCategory}
            handleChangeActiv={(id: string) => changeCategory(id)}
            key={id}
          />
        ))}
      </nav>

      {/* cards of products */}
      {products.items.length < 1 ? (
        <div
          className={css.emptyList}
          role="status"
          aria-live="polite"
          aria-label="У цій категорії поки що немає страв."
        ></div>
      ) : (
        <ModalCardContextProvider>
          <ul
            className={clsx(css.productList)}
            aria-labelledby={`category-tab-${activCategory}`}
            aria-label="Список страв. Кожна картка містить назву, фото і кнопку для додавання в кошик."
            id={`category-panel-${activCategory}`}
            role="tabpanel"
            tabIndex={0}
          >
            {products.items.map(product => (
              <CardItem
                product={product}
                key={product.id}
                page={page.current}
                IsInCart={addedItems.includes(product.id)}
              />
            ))}
          </ul>
        </ModalCardContextProvider>
      )}
      <div ref={observerTarget} style={{ height: '10px' }} id="target" aria-hidden="true" />
    </section>
  );
}

export default HomePage;
