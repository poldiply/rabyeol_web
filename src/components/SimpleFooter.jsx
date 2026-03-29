import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function SimpleFooter() {
  return (
    <footer className="w-full bg-brandRed relative overflow-hidden">
      {/* 배경 은은한 로고 워터마크 (주석 처리) */}
      {/* <div className="absolute inset-0 flex justify-center items-center opacity-70 pointer-events-none">
        <img src="/images/logo3.png" alt="" className="w-full h-full object-contain" />
      </div> */}

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
          
          {/* 왼쪽: 회사 기본 정보 */}
          <div className="text-white">
            <h3 className="font-black text-2xl uppercase tracking-tighter mb-6">
              Rabyeol Communications
            </h3>
            <div className="space-y-1 text-sm md:text-base font-medium opacity-90">
              <p>대표 이원석 | 사업자등록번호 130-86-30508</p>
              <p>주소 인천광역시 서구 중봉대로 490, 893호</p>
              <div className="pt-4 flex flex-col md:flex-row gap-4 md:gap-8">
                <p><span className="opacity-60 mr-2">T.</span> 032-262-2164</p>
                <p><span className="opacity-60 mr-2">E.</span> rastarcomms@gmail.com</p>
              </div>
            </div>
          </div>

          {/* 오른쪽: 주요 액션 버튼들 (세로 배치 / 동일 너비) */}
          <div className="flex flex-col lg:items-end gap-3">
            <Link 
              to="/contact"
              className="w-full md:w-72 bg-white text-brandRed hover:bg-black hover:text-white px-8 py-4 rounded-full font-bold text-sm tracking-widest transition-all shadow-xl flex items-center justify-between group"
            >
              <span>CONTACT US</span>
              {/* 수정된 아이콘: 깔끔한 말풍선 아이콘 */}
              <svg className="w-5 h-5 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </Link>
            
            <a 
              href="/docs/rabyeol_profile.pdf"
              download="라별커뮤니케이션즈_회사소개서.pdf"
              className="w-full md:w-72 bg-black/20 text-white border border-white/30 hover:bg-white hover:text-brandRed px-8 py-4 rounded-full font-bold text-sm tracking-widest transition-all backdrop-blur-sm flex items-center justify-between group"
            >
              <span>DOWNLOAD PDF</span>
              <svg className="w-5 h-5 transition-transform group-hover:translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </a>

            {/* 카피라이트 */}
            <p className="mt-4 text-[10px] text-white/50 italic uppercase tracking-widest text-center lg:text-right">
              © 2025 Rabyeol Comms. All Rights Reserved.
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
}
