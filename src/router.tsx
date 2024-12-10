import { createBrowserRouter } from "react-router";
import ProtectedRoute from "./components/protected-route/ProtectedRoute";
import Home from "./pages/home/Home";
import NotFound from "./pages/notfound/NotFound";
import SignIn from "./pages/signin/SignIn";
import SignUp from "./pages/signup/SignUp";
import Campaigns from "./pages/campaigns/Campaigns";
import CampaignBattles from "./pages/battles/CampaignBattles";

export const router = createBrowserRouter ([
  {
    path: "/",
    element: < Home />
  },
  {
    path: "*",
    element: < NotFound/>
  },
  {
    path: "/sign-in",
    element: < SignIn />
  },
  {
    path: "/sign-up",
    element: < SignUp />
  },
  {
    element:<ProtectedRoute />,
    children: [
      {
        path:"/campaigns",
        element: <Campaigns/>
      },
      {
        path:"/campaigns/:campaignId",
        element: < CampaignBattles />
      },
    ]
  },
])
