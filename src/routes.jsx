import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import Contact from "./pages/Contact";

// 모든 페이지에 공통적으로 적용될 레이아웃입니다.
// Navbar를 여기에 포함시켜서 SSG 빌드 시에도 상단 메뉴가 누락되지 않도록 합니다.
const Layout = () => (
  <div className="bg-white font-sans text-slate-900">
    <Navbar />
    <Outlet />
  </div>
);

export const routes = [
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/portfolio/:id",
        element: <Detail />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
    ]
  }
];
