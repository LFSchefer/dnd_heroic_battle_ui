import { createBrowserRouter, Outlet } from "react-router";
import "./App.css"
import { lazy } from "react";
import ProtectedRoute from "./components/protected-route/ProtectedRoute";
const NotFound = lazy(() => import("./pages/notfound/NotFound"));
const SignIn = lazy(() => import("./pages/signin/SignIn"));
const SignUp = lazy(() => import("./pages/signup/SignUp"));
const Campaigns = lazy(() => import("./pages/campaigns/Campaigns"));
const CampaignBattles = lazy(() => import("./pages/battles/CampaignBattles"));
const BattlePage = lazy(() => import("./pages/battles/Battle"));
const BattleInit = lazy(() => import("./pages/battles/BattleInit"));
const Cgu = lazy(() => import("./pages/cgu/Cgu"));
const Fight = lazy(() => import("./pages/fight/Fight"));
const Header = lazy(() => import("./components/header/Header"));
const Home = lazy(() => import("./pages/home/Home"));
const Footer = lazy(() => import("./components/footer/Footer"));

function Layout() {
  return (
    <>
      <div className="App">
        <Header />
        <Outlet />
        <Footer />
      </div>
    </>
  );
}

export const router = createBrowserRouter ([
    {
    path: "/",
    element: < Layout />,
    children: [
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
            path:"/campaigns/:campaignId/battles/:battleId",
            element: < BattlePage />
          },
          {
            path:"/campaigns/:campaignId/battles/:battleId/initialize",
            element: < BattleInit />
          },
          {
            path:"/campaigns/:campaignId/battles/:battleId/fight",
            element: < Fight />
          },
        ]
      },
    ]
  },
  
])
