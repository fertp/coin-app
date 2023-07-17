import { Home } from '../pages/Home'
import { Coin } from '../pages/Coin'
import { Exchanges } from '../pages/Exchanges'
import { Exchange } from '../pages/Exchange/Exchange'
import type { Route } from '@/types'

export const routes: Route[] = [
  {
    path: '/',
    to: '/',
    Element: Home,
    name: 'Coins'
  },
  {
    path: 'coins/:id',
    to: null,
    Element: Coin,
    name: 'Coin'
  },
  {
    path: '/exchanges',
    to: '/exchanges',
    Element: Exchanges,
    name: 'Exchanges'
  },
  {
    path: 'exchanges/:id',
    to: null,
    Element: Exchange,
    name: 'Coin'
  }
]