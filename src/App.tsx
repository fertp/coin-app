import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { PublicLayout, publicRoutes } from './modules/guest'
import { useFavoriteAssetsStorage } from './hooks/useFavoriteAssetsStorage'

export default function App(): JSX.Element {
  useFavoriteAssetsStorage()

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={<PublicLayout />}
        >
          {publicRoutes.map(({ path, Element }) => (
            <Route
              key={path}
              path={path}
              element={<Element />}
            />
          ))}
        </Route>

        <Route
          path='*'
          element='404 | Page not found'
        />
      </Routes>
    </BrowserRouter>
  )
}
