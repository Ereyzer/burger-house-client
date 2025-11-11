import clsx from 'clsx';
import css from './category.module.css';

interface Props {
  index: string;
  category: string;
  isActiv: boolean;
  handleChangeActiv: (id: string) => void;
}

function CategoryItem({ index, category, isActiv, handleChangeActiv }: Props) {
  return (
    <button
      key={index}
      type="button"
      role="tab"
      aria-selected={isActiv}
      aria-controls={`category-panel-${index}`}
      id={`category-tab-${index}`}
      tabIndex={isActiv ? 0 : -1}
      className={clsx(
        css.categoryBtn,
        `${isActiv ? css.active : ''}`,
        'montserrat-font',
        'montserrat-medium',
        `${isActiv ? 'montserrat-medium-600' : 'montserrat-medium-400'}`,
      )}
      onClick={() => handleChangeActiv(index)}
    >
      {category}
    </button>
  );
}

export default CategoryItem;
