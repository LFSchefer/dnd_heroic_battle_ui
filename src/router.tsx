import { createBrowserRouter } from "react-router";
import ProtectedRoute from "./components/protected-route/ProtectedRoute";
import Home from "./pages/home/Home";
import NotFound from "./pages/notfound/NotFound";
import SignIn from "./pages/signin/SignIn";
import SignUp from "./pages/signup/SignUp";
import Campaigns from "./pages/campaigns/Campaigns";
import CampaignBattles from "./pages/battles/CampaignBattles";
import BattlePage from "./pages/battles/Battle";
import BattleInit from "./pages/battles/BattleInit";
import Cgu from "./pages/cgu/Cgu";

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
    path: "/cgu",
    element: < Cgu/>
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
      {
        path:"/battles/:battleId",
        element: < BattlePage />
      },
      {
        path:"/battles/:battleId/initialize",
        element: < BattleInit />
      },
    ]
  },
])
