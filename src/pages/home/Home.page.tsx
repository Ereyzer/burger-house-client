import { useCallback, useEffect, useRef, useState } from 'react';
import CardItem from '../../components/cardMenu/CardItem';
import CategoryItem from '../../components/category/CategoryItem';
import css from './home.module.css';
import clsx from 'clsx';
import { apiService } from '../../services/api.service';

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
  id: number;
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
  const [activCategory, setActivCategory] = useState('all');
  const [products, setProducts] = useState<ProdactsState>({
    loading: false,
    error: null,
    items: [],
  });

  const loading = useRef(false);
  const page = useRef(0);
  const hasMore = useRef(true);

  const observerTarget = useRef<HTMLDivElement | null>(null);

  const changeCategory = (newCategory: string) => {
    page.current = 0;
    hasMore.current = true;
    setActivCategory(newCategory);
    setProducts(p => ({ ...p, items: [] }));
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
    <section className="container">
      {/* Категорії */}
      <nav className={css.categories} aria-label="Категорії меню">
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

      {/* Картки товарів */}
      {products.items.length < 1 ? (
        <div className={css.emptyList}></div>
      ) : (
        <ul className={clsx(css.productList)}>
          {products.items.map(product => (
            <CardItem product={product} key={product.id} />
          ))}
        </ul>
      )}

      {/* <ul className={clsx(css.productList)}>
        {products.items.map(product => (
          <CardItem product={product} key={product.id} />
        ))}
      </ul> */}
      <div ref={observerTarget} style={{ height: '10px' }} />
    </section>
  );
}

export default HomePage;
