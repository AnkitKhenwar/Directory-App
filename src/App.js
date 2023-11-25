import "./App.css";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";

import { publicRoute } from "./Routes/PublicRoutes";
import { Suspense } from "react";
import { HOME } from "./Routes/Routes";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Suspense fallback={<div>Something went wrong....</div>}>
          <Routes>
            {publicRoute.map((route, index) => {
              return (
                <Route
                  key={index}
                  exact
                  path={route.path}
                  element={route.component}
                />
              );
            })}
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
