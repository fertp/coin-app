import type { Asset } from '@/types'

export const reduceAssetsPrices = (assets: Asset[]): Record<string, string> => {
  return assets.reduce((acc, { id, priceUsd }) => Object.assign(acc, { [id]: priceUsd }), {})
}

export const reduceAssetsToHighlight = (
  assetsPrices: Record<string, string>,
  newPrices: Record<string, string>
): Record<string, 'up' | 'down'> => {
  return Object.keys(newPrices).reduce((acc, newPriceId) => {
    return Object.assign(acc, { [newPriceId]: newPrices[newPriceId] > assetsPrices[newPriceId] ? 'up' : 'down' })
  }, {})
}
