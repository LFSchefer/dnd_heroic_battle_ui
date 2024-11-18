import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/home/Home";
import Campaigns from "./pages/campaigns/Campaigns";
import NotFound from "./pages/notfound/NotFound";
import CampaignBattles from "./pages/battles/CampaignBattles";
import SignIn from "./pages/signin/SignIn";
import SignUp from "./pages/signup/SignUp";

export const router = createBrowserRouter ([
  {
    path: "/",
    element: < Home />
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
