import clsx from 'clsx';
import ArrowLeftSvgIcon from '../../assets/svg/ArrowLeft';
import css from './orderPalce.module.css';

interface Props {
  onBackButtonClick: () => void;
  title: string;
  titleRef: React.RefObject<HTMLHeadingElement | null>;
}

function OrderHeader({ title, onBackButtonClick, titleRef }: Props) {
  return (
    <div className={css.header}>
      <button className={css.backButton} onClick={() => onBackButtonClick()}>
        <ArrowLeftSvgIcon fill={'var(--grey-shades-500)'} />
        Назад
      </button>
      <h2
        className={clsx(css.headerTitle, 'montserrat-font', 'montserrat-large')}
        tabIndex={-1}
        ref={titleRef}
      >
        {title}
      </h2>
    </div>
  );
}

export default OrderHeader;
