import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/home/Home";
import NotFound from "./pages/notfound/NotFound";

export const router = createBrowserRouter ([
  {
    path: "/",
    element: < Home />
  },
  {
    path: "*",
    element: < NotFound/>
  }
])
