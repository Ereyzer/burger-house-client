export const wordEndForStravy = (count: number) => {
  if (count > 10 && count < 20) return '';
  switch (count % 10) {
    case 1:
      return 'а';

    case 2:
    case 3:
    case 4:
      return 'и';
    case 5:
    case 6:
    case 7:
    case 8:
    case 9:
    case 0:
      return '';
  }
};
