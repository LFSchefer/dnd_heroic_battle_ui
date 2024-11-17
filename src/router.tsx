import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/home/Home";
import Campaigns from "./pages/campaigns/Campaigns";
import NotFound from "./pages/notfound/NotFound";
import CampaignBattles from "./pages/battles/CampaignBattles";
import Login from "./pages/login/Login";

export const router = createBrowserRouter ([
  {
    path: "/",
    element: < Home />
  },
  {
    path: "/login",
    element: < Login />
  },
  {
    path: "/campaigns",
    element: < Campaigns />,
  },
  {
    path:"/campaigns/:campaignId",
    element: < CampaignBattles />
  },
  {
    path: "*",
    element: < NotFound/>
  }
])
