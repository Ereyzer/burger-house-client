import { useEffect } from 'react';
import './flipTimer.css';

interface FlipTimerProps {
  value: number;
  firstNum?: number;
  lastNum?: number;
  currentNum?: number;
  direction?: 'up' | 'down';
}

const numArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const textNumArr = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven'];

export default function FlipTimer({
  value,
  firstNum = 0,
  lastNum = 9,
  direction = 'up',
}: FlipTimerProps) {
  const textNumArrCurrent = [
    ...textNumArr.slice(firstNum, lastNum - 1).map(clas => `${clas} before-last`),
    'last',
  ];
  const numArrCurrent = numArr.slice(firstNum, lastNum + 1);
  useEffect(() => {}, [numArrCurrent]);

  return (
    <ul className={`scroll-container`}>
      {numArrCurrent.map(num => {
        let className = num === value ? 'digit current' : undefined;

        if (!className) {
          if (direction === 'up') {
            if (num > value) {
              className = `digit ${
                textNumArrCurrent[textNumArrCurrent.length - (lastNum - (num - value - 1))]
              }`;
            } else {
              className = `digit ${textNumArrCurrent[textNumArrCurrent.length - (value - num)]}`;
            }
          } else {
            if (num > value) {
              className = `digit ${textNumArrCurrent[textNumArrCurrent.length - (num - value)]}`;
            } else {
              className = `digit ${textNumArrCurrent[value - num - 1]}`;
            }
          }
        }

        return (
          <li className={className} key={num}>
            {num}
          </li>
        );
      })}
    </ul>
  );
}
