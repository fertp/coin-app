import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PublicLayout, publicRoutes } from "./features/public";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <PublicLayout /> } >
          { publicRoutes.map(({ path, Element }) => 
            <Route 
              key={path}
              path={path} 
              element={ <Element /> } 
            />
          )}
        </Route>

        <Route path="*" element='404' />
      </Routes>
    </BrowserRouter>
  )
}
