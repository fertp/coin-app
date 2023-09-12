const priceAnimationMap = {
  up: 'animate-text-price-up',
  down: 'animate-text-price-down'
}

export const addAnimationClassName = (element: unknown, direction: 'up' | 'down'): void => {
  if (element instanceof HTMLLIElement) {
    element.classList.add(priceAnimationMap[direction])
  }
}

export const removeAnimationClassName = (element: unknown): void => {
  if (element instanceof HTMLLIElement) {
    element.classList.remove(priceAnimationMap.up)
    element.classList.remove(priceAnimationMap.down)
  }
}
