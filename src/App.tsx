import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootData from "./components/RootData";
import Root from "./pages";
import Coin, { coinLoader } from "./pages/coin";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <RootData />,
      },
      {
        path: ":coinId",
        element: <Coin />,
        loader: coinLoader,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
