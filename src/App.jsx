import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import Contact from "./pages/Contact";
import { portfolioData } from "./data/portfolioData";

function RootLayout() {
  return (
    <div className="bg-white font-sans text-slate-900">
      <Navbar />
      <Outlet />
    </div>
  );
}

export const routes = [
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "portfolio/:id",
        element: <Detail />,
        getStaticPaths: () => portfolioData.map((item) => `portfolio/${item.id}`),
      },
      { path: "contact", element: <Contact /> },
    ],
  },
];

function App() {
  return (
    <div className="bg-white font-sans text-slate-900">
      <Navbar />
      <Home />
    </div>
  );
}

export default App;