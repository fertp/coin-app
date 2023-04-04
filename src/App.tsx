import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { PublicLayout, publicRoutes } from './features/public'
import { store } from './app/store'
import { Provider } from 'react-redux'

export default function App(): JSX.Element {
  return (
    <Provider store={store}>
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
            element='404'
          />
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}
