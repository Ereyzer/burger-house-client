import FlipTimer from './FlipTimer';
interface Props {
  value: number;
  direction?: 'countdown' | 'countup';
}
export default function MinutsTimer({ value, direction = 'countup' }: Props) {
  return (
    <div style={{ display: 'flex', gap: '2px', justifyContent: 'center', marginTop: '0px' }}>
      <FlipTimer
        value={Math.floor(value / 10)}
        lastNum={5}
        direction={direction === 'countup' ? 'up' : 'down'}
      />
      <FlipTimer
        value={value % 10}
        lastNum={9}
        direction={direction === 'countup' ? 'up' : 'down'}
      />
    </div>
  );
}
