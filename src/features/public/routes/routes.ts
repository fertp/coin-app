import { Home } from "../pages/Home/Home";
import { Coin } from "../pages/Coin/Coin";
import { Route } from "@/interfaces/interfaces";

export const routes: Route[] = [
  {
    path: '',
    to: '/',
    Element: Home,
    name: 'Coins'
  },
  {
    path: 'coins/:id',
    to: null,
    Element: Coin,
    name: 'Coin'
  }
]