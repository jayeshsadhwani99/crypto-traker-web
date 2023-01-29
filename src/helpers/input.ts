export function debounce(func: Function, wait: number): Function {
  let timeout: number;
  return function (this: any) {
    const context = this;
    const args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(context, args);
    }, wait);
  };
}
