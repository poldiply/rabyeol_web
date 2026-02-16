// import { Link } from "react-router-dom";

// export default function Navbar() {
//   return (
//     <nav className="fixed top-0 w-full z-50 flex justify-between items-center px-10 py-6 backdrop-blur-sm bg-white/30">
//       <Link to="/" className="text-2xl font-black text-brandRed tracking-tighter">
//         RABYEOL <span className="text-black font-light">COMMS</span>
//       </Link>
//       <div className="space-x-8 font-medium text-sm hidden md:flex">
//         <Link to="/" className="hover:text-brandRed transition">HOME</Link>
//         <button className="hover:text-brandRed transition">ABOUT</button>
//         <button className="hover:text-brandRed transition">PORTFOLIO</button>
//         <button className="hover:text-brandRed transition font-bold text-brandRed">CONTACT</button>
//       </div>
//       {/* 모바일은 햄버거 메뉴 (DaisyUI 활용 가능) */}
//       <button className="md:hidden text-2xl">☰</button>
//     </nav>
//   );
// }

import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleScroll = (id) => {
    if (location.pathname !== "/") {
      navigate("/");
      // 페이지 이동 후 스크롤을 위해 약간의 지연
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 flex justify-between items-center px-6 md:px-12 py-4 backdrop-blur-md bg-white/70 border-b border-gray-100">
      <Link to="/" onClick={() => window.scrollTo(0,0)}>
        <img src="/images/logo1.png" alt="Rabyeol Logo" className="h-8 md:h-10 object-contain" />
      </Link>
      
      {/* <div className="hidden md:flex space-x-10 font-semibold text-sm tracking-widest text-gray-800">
        <button onClick={() => handleScroll("about")} className="hover:text-brandRed transition">ABOUT</button>
        <button onClick={() => handleScroll("portfolio")} className="hover:text-brandRed transition">PORTFOLIO</button>
        <button onClick={() => handleScroll("contact")} className="hover:text-brandRed transition text-brandRed font-bold">CONTACT</button>
      </div> */}
      
<div className="hidden md:flex space-x-10 font-semibold text-sm tracking-widest text-gray-800">
  <button onClick={() => handleScroll("about")} className="hover:text-brandRed transition">ABOUT</button>
  {/* 사업영역 드롭다운이나 나열식 추천 */}
  <button onClick={() => handleScroll("public-events")} className="hover:text-brandRed transition">PUBLIC</button>
  <button onClick={() => handleScroll("broadcast-stage")} className="hover:text-brandRed transition">MEDIA</button>
  <button onClick={() => handleScroll("univ-festival")} className="hover:text-brandRed transition">CAMPUS</button>
  {/* <button onClick={() => handleScroll("contact")} className="hover:text-brandRed transition text-brandRed font-bold">CONTACT</button> */}
  <Link to="/contact" className="hover:text-brandRed transition text-brandRed font-bold">CONTACT</Link>
</div>

      <button className="md:hidden text-2xl text-brandRed">☰</button>
    </nav>
  );
}