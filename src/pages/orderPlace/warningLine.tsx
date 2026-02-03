import clsx from 'clsx';
import css from './orderPalce.module.css';
import { useEffect, useRef, useState } from 'react';

interface Props {
  message: string;
}

function WarningLine({ message }: Props) {
  const [changeLine, setChangeLine] = useState(true);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (!isFirstRender.current) return;
    isFirstRender.current = false;
    setChangeLine(prev => !prev);
    setInterval(() => {
      setChangeLine(prev => !prev);
    }, 10000);
  }, []);
  return (
    <div className={clsx(css.warningLineDiv, 'roboto-mono-font')}>
      <p
        className={changeLine ? css.moveLine : css.backLine}
        aria-label={message}
        aria-live="assertive"
        role="alert"
      >
        {message}
      </p>
      <p className={changeLine ? css.backLine : css.moveLine} aria-label={message}>
        {message}
      </p>
    </div>
  );
}

export default WarningLine;
