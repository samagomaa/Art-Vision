import { createHashRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Home from "./Components/Home/Home.jsx";
import Layout from "./Components/Layout/Layout.jsx";
import Artidentity from "./Components/Artidentity/Artidentity.jsx";
import Artcaption from "./Components/Artcaption/Artcaption.jsx";
import Analysis from "./Components/Analysis/Analysis.jsx";
import Help from "./Components/Help/Help.jsx";
import Register from "./Components/Register/Register.jsx";
import Login from "./Components/Login/Login.jsx";
import NotFound from "./Components/NotFound/NotFound.jsx";
import ArtStyleTransfer from "./Components/StyleSwap/StyleSwap.jsx";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute.jsx";
import { useContext, useEffect } from "react";
import { UserContext } from "./Context/UserContext.jsx";
import ForgetPassword from "./Components/ForgetPassword/ForgetPassword.jsx";
import ResetPassword from "./Components/ResetPassword/ResetPassword.jsx";
import History from "./Components/History/History.jsx";

let routers = createHashRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "artidentity",
        element: (
          <ProtectedRoute>
            <Artidentity />
          </ProtectedRoute>
        ),
      },
      {
        path: "artcaption",
        element: (
          <ProtectedRoute>
            <Artcaption />
          </ProtectedRoute>
        ),
      },
      {
        path: "analysis",
        element: (
          <ProtectedRoute>
            <Analysis />
          </ProtectedRoute>
        ),
      },
      {
        path: "history",
        element: (
          <ProtectedRoute>
            <History />
          </ProtectedRoute>
        ),
      },
      {
        path: "styleswap",
        element: (
          <ProtectedRoute>
            <ArtStyleTransfer />
          </ProtectedRoute>
        ),
      },
      {
        path: "help",
        element: (
          <ProtectedRoute>
            <Help />
          </ProtectedRoute>
        ),
      },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      { path: "forgetpassword", element: <ForgetPassword /> },
      { path: "resetpassword", element: <ResetPassword /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

function App() {
  let { setUserToken } = useContext(UserContext);
  useEffect(() => {
    if (localStorage.getItem("userToken") !== null) {
      setUserToken(localStorage.getItem("userToken"));
    }
  }, []);

  return <RouterProvider router={routers}></RouterProvider>;
}

export default App;
