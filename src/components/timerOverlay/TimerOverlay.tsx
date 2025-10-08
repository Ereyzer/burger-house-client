import { useEffect, useRef, useState } from 'react';
import ThemeSwitcher from '../theme/components/ThemeSwitcher';
import './timerOverlay.css';
import SecondsTimer from './SecondsTimer';
import MinutsTimer from './MinutsTimer';
import { timeConstants } from './constants';
import HoursTimer from './HoursTimer';
import DaysTimer from './DaysTimer';

const { oneDay, oneHour, oneMinute, oneSecond } = timeConstants;
interface Props {
  timeTo: Date;
}
const dayText = ['День', 'Дні', 'Днів'];
const hourText = ['Година', 'Години', 'Годин'];
const minutText = ['Хвилина', 'Хвидини', 'Хвилин'];
const secondText = ['Секунда', 'Секунди', 'Секунд'];

const textSwitcher = (value: number, text: string[]) => {
  switch (value % 10) {
    case 1:
      return text[0];
    case 2:
    case 3:
    case 4:
      return text[1];

    default:
      return text[2];
  }
};

function TimerOverlay(props: Props) {
  const dateNow = new Date();
  const [lessTime, setLessTime] = useState(() => props.timeTo.getTime() - dateNow.getTime());
  const [days, setDays] = useState(Math.floor((lessTime > 0 ? lessTime : 0) / oneDay));
  const [hours, setHours] = useState(
    Math.floor(((lessTime > 0 ? lessTime : 0) % oneDay) / oneHour),
  );
  const [minuts, setMinuts] = useState(
    Math.floor(((lessTime > 0 ? lessTime : 0) % oneHour) / oneMinute),
  );
  const [seconds, setSeconds] = useState(
    Math.floor(((lessTime > 0 ? lessTime : 0) % oneMinute) / oneSecond),
  );

  const [miliseconds, setMiliseconds] = useState<number | null>(
    Math.floor((lessTime > 0 ? lessTime : 0) % oneSecond),
  );
  const interval = useRef<number | null>(null);

  useEffect(() => {
    if (!miliseconds) return;

    setTimeout(() => {
      setMiliseconds(null);
      setSeconds(s => (s + 60 - 1) % 60);
      setLessTime(m => m - miliseconds);
    }, miliseconds);
  }, [miliseconds]);

  useEffect(() => {
    if (miliseconds) return;

    interval.current = setInterval(() => {
      setLessTime(t => t - oneSecond);
      setSeconds(s => (s + 60 - 1) % 60);
    }, oneSecond);

    return () => clearInterval(interval.current as number);
  }, [miliseconds]);

  useEffect(() => {
    if (lessTime > oneSecond) return;

    if (!interval.current) return;

    clearInterval(interval.current);
  }, [lessTime]);

  useEffect(() => {
    if (lessTime < oneMinute) return;
    if (seconds !== 0) return;
    setTimeout(() => {
      setMinuts(m => (m + 60 - 1) % 60);
    }, oneSecond);
  }, [seconds, lessTime]);

  useEffect(() => {
    if (lessTime < oneHour) return;
    if (minuts === 0 && seconds === 0) {
      setTimeout(() => {
        setHours(h => (h + 24 - 1) % 24);
      }, oneSecond);
    }
  }, [minuts, seconds, lessTime]);

  useEffect(() => {
    if (lessTime < oneDay) return;
    if (hours === 0 && minuts === 0 && seconds === 0) {
      setTimeout(() => {
        setDays(d => d - 1);
      }, oneSecond);
    }
  }, [hours, minuts, seconds, lessTime]);

  const direction = 'countdown';

  return (
    <div style={{ padding: '10px' }}>
      <ThemeSwitcher stylePosition={{ position: 'fixed', bottom: '20px', right: '20px' }} />

      <h1 className="timer-title-h1">ДО ВІДКРИТТЯ ЗАЛИШИЛОСЬ!</h1>
      <div className="timer-process-container">
        <ul className="timer-process-container_list">
          <li className="timer-process-container_item">
            <DaysTimer value={days} direction={direction} />
            <h3>{textSwitcher(days, dayText)}</h3>
          </li>
          <li className="timer-process-container_item">
            <HoursTimer value={hours} direction={direction} />
            <h3>{textSwitcher(hours, hourText)}</h3>
          </li>
          <li className="timer-process-container_item">
            <MinutsTimer value={minuts} direction={direction} />
            <h3>{textSwitcher(minuts, minutText)}</h3>
          </li>
          <li className="timer-process-container_item">
            <SecondsTimer value={seconds} direction={direction} />
            <h3>{textSwitcher(seconds, secondText)}</h3>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default TimerOverlay;
