import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 메뉴 열릴 때 스크롤 방지
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMenuOpen]);

  const handleScroll = (id) => {
    setIsMenuOpen(false); // 메뉴 닫기
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navLinks = [
    { name: "ABOUT", id: "about" },
    { name: "PUBLIC", id: "public-events" },
    { name: "MEDIA", id: "broadcast-stage" },
    { name: "CAMPUS", id: "univ-festival" },
    { name: "WORKSHOP", id: "workshop-mt" },
  ];

  return (
    <>
      <nav className="fixed top-0 w-full z-50 flex justify-between items-center px-6 md:px-12 py-4 backdrop-blur-md bg-white/70 border-b border-gray-100">
        <Link to="/" onClick={() => { window.scrollTo(0,0); setIsMenuOpen(false); }}>
          <img src="/images/logo1.png" alt="Rabyeol Logo" className="h-8 md:h-10 object-contain" />
        </Link>
        
        {/* 데스크탑 메뉴 */}
        <div className="hidden md:flex space-x-10 font-semibold text-sm tracking-widest text-gray-800">
          {navLinks.map((link) => (
            <button key={link.id} onClick={() => handleScroll(link.id)} className="hover:text-brandRed transition">
              {link.name}
            </button>
          ))}
          <Link to="/contact" className="hover:text-brandRed transition text-brandRed font-bold">CONTACT</Link>
          <a 
            href="https://blog.naver.com/rastar_comms" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 group text-gray-400 hover:text-brandRed transition px-3 py-1 bg-gray-50 rounded-full border border-gray-100"
          >
            <span className="text-[10px] font-bold tracking-widest leading-none">BLOG</span>
            <svg className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>

        {/* 모바일 햄버거 버튼 */}
        <button 
          className="md:hidden text-3xl text-brandRed p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? "✕" : "☰"}
        </button>
      </nav>

      {/* 모바일 오버레이 메뉴 */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[40] bg-white flex flex-col justify-center items-center p-10 md:hidden"
          >
            <div className="flex flex-col gap-8 text-center">
              {navLinks.map((link) => (
                <motion.button
                  key={link.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  onClick={() => handleScroll(link.id)}
                  className="text-3xl font-bold text-gray-900 hover:text-brandRed transition-colors tracking-tighter"
                >
                  {link.name}
                </motion.button>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Link 
                  to="/contact" 
                  onClick={() => setIsMenuOpen(false)}
                  className="text-3xl font-bold text-brandRed tracking-tighter"
                >
                  CONTACT
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <a 
                  href="https://blog.naver.com/rastar_comms" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-2xl font-bold text-gray-400 tracking-tighter flex items-center justify-center gap-2"
                >
                  NAVER BLOG
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </motion.div>
            </div>

            {/* 하단 추가 정보 (선택 사항) */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ delay: 0.5 }}
              className="absolute bottom-10 text-center"
            >
              <img src="/images/logo1.png" alt="Logo" className="h-6 mx-auto mb-4 grayscale" />
              <p className="text-[10px] text-gray-400 font-medium tracking-widest uppercase">
                Storytelling with Rabyeol Comms
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}