import { motion } from "framer-motion";

export default function PremiumButton({ text, onClick }) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="group relative flex items-center gap-4 px-8 py-4 border border-white/30 rounded-full overflow-hidden transition-all duration-500 hover:border-brandRed"
    >
      {/* 배경 슬라이드 효과 */}
      <div className="absolute inset-0 bg-brandRed translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-0"></div>
      
      {/* 텍스트 */}
      <span className="relative z-10 text-sm font-bold tracking-[0.2em] uppercase group-hover:text-white transition-colors duration-500">
        {text}
      </span>

      {/* 화살표 애니메이션 */}
      <motion.span
        initial={{ x: -10, opacity: 0 }}
        whileHover={{ x: 0, opacity: 1 }}
        className="relative z-10 text-white hidden group-hover:block"
      >
        →
      </motion.span>
    </motion.button>
  );
}