import clsx from 'clsx';
import ArrowLeftSvgIcon from '../../assets/svg/ArrowLeft';
import css from './orderPalce.module.css';

interface Props {
  onBackButtonClick: () => void;
  title: string;
}

function OrderHeader({ title, onBackButtonClick }: Props) {
  return (
    <div className={css.header}>
      <button className={css.backButton} onClick={() => onBackButtonClick()}>
        <ArrowLeftSvgIcon fill={'var(--grey-shades-500)'} />
        Назад
      </button>
      <h3 className={clsx(css.headerTitle, 'montserrat-font', 'montserrat-large')}>{title}</h3>
    </div>
  );
}

export default OrderHeader;
