import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/home/Home";
import Campaigns from "./pages/campaigns/Campaigns";
import NotFound from "./pages/notfound/NotFound";
import CampaignBattles from "./pages/campaigns/CampaignBattles";

export const router = createBrowserRouter ([
  {
    path: "/",
    element: < Home />
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
