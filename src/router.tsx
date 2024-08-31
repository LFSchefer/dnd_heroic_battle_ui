import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/home/Home";
import Campaigns from "./pages/campaigns/Campaigns";
import NotFound from "./pages/notfound/NotFound";

export const router = createBrowserRouter ([
  {
    path: "/",
    element: < Home />
  },
  {
    path: "/campaigns",
    element: < Campaigns />
  },
  {
    path: "*",
    element: < NotFound/>
  }
])
