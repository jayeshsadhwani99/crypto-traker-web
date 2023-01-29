import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Portfolio from "./components/Portfolio";
import RootData from "./components/RootData";
import { GlobalProvider } from "./context/GlobalContext";
import Root from "./pages";
import About from "./pages/about";
import Coin, { coinLoader } from "./pages/coin";
import ErrorPage from "./pages/error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <RootData />,
        errorElement: <ErrorPage />,
      },
      {
        path: ":coinId",
        element: <Coin />,
        loader: coinLoader,
        errorElement: <ErrorPage />,
      },
    ],
  },
  {
    path: "about",
    element: <About />,
    errorElement: <ErrorPage />,
  },
  {
    path: "portfolio",
    element: <Portfolio />,
    errorElement: <ErrorPage />,
  },
]);

function App() {
  return (
    <GlobalProvider>
      <ToastContainer></ToastContainer>
      <RouterProvider router={router} />
    </GlobalProvider>
  );
}

export default App;
