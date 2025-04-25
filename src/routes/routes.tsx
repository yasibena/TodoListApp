import { createBrowserRouter } from "react-router-dom";

import Error from "../pages/Error/Error";
import Home from "../pages/home/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Error />,
  },
  //   {
  //     path: "/list",
  //     element: <SignIn />,
  //     errorElement: <Error />,
  //   },
]);
