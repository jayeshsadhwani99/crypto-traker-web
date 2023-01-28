import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import RootData from "./components/RootData";
import { GlobalProvider } from "./context/GlobalContext";
import Root from "./pages";
import About from "./pages/about";
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
  {
    path: "about",
    element: <About />,
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
