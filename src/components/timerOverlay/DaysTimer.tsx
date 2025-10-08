import FlipTimer from './FlipTimer';
interface Props {
  value: number;
  direction?: 'countdown' | 'countup';
}
export default function valueTimer({ value, direction = 'countup' }: Props) {
  const tens = Math.floor(value / 10);
  return (
    <div style={{ display: 'flex', gap: '2px', justifyContent: 'center', marginTop: '0px' }}>
      <FlipTimer value={tens} lastNum={9} direction={direction === 'countup' ? 'up' : 'down'} />
      <FlipTimer
        value={value % 10}
        lastNum={9}
        direction={direction === 'countup' ? 'up' : 'down'}
      />
    </div>
  );
}
