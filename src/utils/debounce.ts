/**
 * Дебоунсе функция
 * @param fn
 * @param delay
 */
export function debounce<Params extends never[], Return>(
  fn: (...args: Params) => Return,
  delay: number,
): (...args: Params) => void {
  let timeoutId: ReturnType<typeof setTimeout>

  return (...args: Params) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn(...args), delay)
  }
}
