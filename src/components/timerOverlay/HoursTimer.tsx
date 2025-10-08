import FlipTimer from './FlipTimer';

type directionType = 'countdown' | 'countup';
interface Props {
  value: number;
  direction?: directionType;
}

function lastNumvalue(direction: directionType, ones: number, tens: number): number {
  let lastNum = 9;
  if (direction === 'countup') {
    lastNum = 9;
    if (tens === 2 || (tens === 0 && ones === 0)) {
      lastNum = 3;
    }
  } else {
    if ((tens === 2 && ones !== 0) || (tens === 0 && ones === 0)) {
      lastNum = 3;
    }
  }

  return lastNum;
}

export default function valueTimer({ value, direction = 'countup' }: Props) {
  const tens = Math.floor(value / 10);
  const ones = value % 10;

  return (
    <div style={{ display: 'flex', gap: '2px', justifyContent: 'center', marginTop: '0px' }}>
      <FlipTimer value={tens} lastNum={2} direction={direction === 'countup' ? 'up' : 'down'} />
      <FlipTimer
        value={ones}
        lastNum={lastNumvalue(direction, ones, tens)}
        direction={direction === 'countup' ? 'up' : 'down'}
      />
    </div>
  );
}
