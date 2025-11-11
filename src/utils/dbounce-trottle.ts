export function myDebounce<Args extends unknown[]>(func: (...args: Args) => void, t = 300) {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: Args): void => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func(...args);
    }, t);
  };
}

export function myThrottle<Args extends unknown[]>(func: (...args: Args) => void, delay = 100) {
  let lastCall = 0;

  return (...args: Args) => {
    const now = Date.now();

    if (now - lastCall >= delay) {
      lastCall = now;
      func(...args);
    }
  };
}
