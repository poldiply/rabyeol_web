// export default function Footer() {
//   return (
//     <div className="h-full flex flex-col justify-between p-10 md:p-20 text-white relative">
//       <div className="mt-10">
//         <img src="/images/logo3.png" alt="Rabyeol Logo" className="h-12 mb-10 object-contain" />
//         <h2 className="text-4xl md:text-6xl font-bold mb-10 leading-tight">
//           한 편의 완벽한 이야기,<br />
//           <span className="text-brandRed">라별</span>이 함께합니다.
//         </h2>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-sm text-gray-400 border-t border-white/10 pt-10">
//         {/* PDF 28p 정보들 */}
//         <div>
//           <p className="font-bold text-white mb-2 text-lg uppercase tracking-widest">Rabyeol Communications</p>
//           <p>대표 이원석 | 사업자등록번호 130-86-30508</p>
//           <p>주소 인천광역시 서구 중봉대로 490, 893호</p>
//         </div>
//         <div className="md:text-right flex flex-col justify-end">
//           <p className="text-white font-bold">T. 032-262-2164</p>
//           <p className="text-white font-bold">E. rastarcomms@gmail.com</p>
//           <p className="mt-4 opacity-50">© 2025 Rabyeol Comms. All Rights Reserved.</p>
//         </div>
//       </div>
//     </div>
//   );
// }
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="h-full w-full flex flex-col bg-darkGray text-white">
      
      {/* 1. 상단 슬로건 영역 (Dark Gray) */}
      <div className="flex-1 flex flex-col justify-center px-10 md:px-20 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight tracking-tighter">
            한 편의 완벽한 이야기,<br />
            <span className="text-brandRed">라별</span>이 함께합니다.
          </h2>
          {/* 문의하기 버튼 추가 */}
          <Link 
            to="/contact"
            className="btn btn-outline border-white text-white rounded-full px-12 hover:bg-brandRed hover:border-brandRed"
          >
            CONTACT US
          </Link>          
          <a 
            href="/docs/rabyeol_profile.pdf"
            download="라별커뮤니케이션즈_회사소개서.pdf"
            className="btn btn-outline border-white/30 text-white hover:bg-white hover:text-black rounded-full px-10"
          >
            DOWNLOAD PDF
          </a>
        </motion.div>
      </div>

      {/* 2. 하단 정보 영역 (Red + Watermark) */}
      <div className="w-full bg-brandRed relative overflow-hidden">
        
        {/* 배경 은은한 로고 (사이즈 축소) */}
        <div className="absolute inset-0 flex justify-center items-center opacity-70 pointer-events-none">
          {/* <img src="/images/logo3.png" alt="" className="w-48 md:w-64 object-contain" /> */}
          <img src="/images/logo3.png" alt="" className="w-full h-full object-contain scale-100" />
        </div>

        <div className="relative z-10 px-10 md:px-20 py-12 md:py-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-end">
          <div>
            <p className="font-black text-white mb-4 text-xl md:text-2xl uppercase tracking-tighter">
              Rabyeol Communications
            </p>
            <div className="space-y-1 text-sm md:text-base font-medium text-white/90">
              <p>대표 이원석 | 사업자등록번호 130-86-30508</p>
              <p>주소 인천광역시 서구 중봉대로 490, 893호</p>
            </div>
          </div>

          <div className="md:text-right space-y-1 text-sm md:text-base text-white">
            <p className="font-bold text-lg">T. 032-262-2164</p>
            <p className="font-bold text-lg">E. rastarcomms@gmail.com</p>
            <p className="mt-6 opacity-70 text-xs md:text-sm italic">
              © 2025 Rabyeol Comms. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}