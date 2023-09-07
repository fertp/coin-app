import type { Asset } from '@/types'

export const reduceAssetsPrices = (assets: Asset[]): Record<string, string> => {
  return assets.reduce((acc, { id, priceUsd }) => Object.assign(acc, { [id]: priceUsd }), {})
}

export const addAnimationClassName = (row: unknown, direction: 'up' | 'down'): void => {
  if (row instanceof HTMLTableRowElement) {
    row.classList.add(rowBackgrounAnimations[direction])
  }
}

export const removeAnimationClassName = (row: unknown): void => {
  if (row instanceof HTMLTableRowElement) {
    row.classList.remove(rowBackgrounAnimations.up)
    row.classList.remove(rowBackgrounAnimations.down)
  }
}

const rowBackgrounAnimations = {
  up: 'animate-row-price-up',
  down: 'animate-row-price-down'
}
