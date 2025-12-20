import clsx from 'clsx';
import css from './orderPalce.module.css';

interface Props {
  items: { street: string }[];
  setStreet: (value: string, closeAutocomplete?: boolean) => void;
  isOpen?: boolean;
}

function AutocomleteList({ items, setStreet, isOpen = false }: Props) {
  return (
    <>
      <ul
        className={clsx(
          'montserrat-font',
          'montserrat-medium',
          css.autocompleteList,
          isOpen ? css.openList : '',
        )}
      >
        {items.map(({ street }, index) => {
          return (
            <li key={index}>
              <button type="button" onClick={() => setStreet(street, true)}>
                {street}
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default AutocomleteList;
