import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { portfolioData } from "../data/portfolioData";
import Footer from "../components/Footer";
import ScrollIndicator from "../components/ScrollIndicator";
import PremiumButton from "../components/PremiumButton";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.5 } // 50% 이상 보일 때 활성화
    );

    const sectionElements = document.querySelectorAll("section");
    sectionElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <main className="h-screen overflow-y-auto snap-y snap-mandatory scroll-smooth relative">
        <ScrollIndicator activeSection={activeSection} />
      {/* 1. HERO: logo2 사용 */}
      {/* <section id="hero" className="h-screen w-full snap-start flex flex-col justify-center items-center bg-white overflow-hidden relative">
        <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="relative w-[300px] h-[300px] md:w-[500px] md:h-[500px] flex justify-center items-center"
        >
            <div 
                className="absolute inset-0 z-10 w-full h-full"
                style={{
                    backgroundColor: "white",
                    WebkitMaskImage: "url('/images/logo2.png')",
                    WebkitMaskSize: "contain",
                    WebkitMaskRepeat: "no-repeat",
                    WebkitMaskPosition: "center",
                    maskImage: "url('/images/logo2.png')",
                    maskSize: "contain",
                    maskRepeat: "no-repeat",
                    maskPosition: "center",
                }}
            >
            
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover scale-150"
                >
                    <source src="/videos/bg.mp4" type="video/mp4" />
                </video>
            </div>
        </motion.div>
    </section> */}
    <section id="hero" className="h-screen w-full snap-start relative flex flex-col justify-center items-center overflow-hidden">
  {/* 전체 배경 비디오 */}
  <div className="absolute inset-0 z-0">
    <video
      autoPlay
      loop
      muted
      playsInline
      className="w-full h-full object-cover brightness-[0.6]" // 영상을 약간 어둡게 해서 로고를 돋보이게 함
    >
      <source src="/videos/bg.mp4" type="video/mp4" />
    </video>
  </div>

  {/* 중앙 로고 애니메이션 */}
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 1.2 }}
    className="relative z-10 flex flex-col items-center"
  >
    {/* 유리 질감 효과(Glassmorphism)를 준 로고 배경 - 선택사항 */}
    <div className="backdrop-blur-sm bg-white/10 p-12 rounded-full border border-white/20 shadow-2xl">
      <img src="/images/logo2.png" alt="Rabyeol" className="w-48 md:w-64" />
    </div>
    
    <h1 className="mt-10 text-white text-lg md:text-xl font-light tracking-[0.6em] uppercase opacity-80">
      Rabyeol Communications
    </h1>
  </motion.div>

  {/* 스크롤 유도 디자인 */}
  <div className="absolute bottom-10 z-10 flex flex-col items-center gap-2">
    <span className="text-white/40 text-[10px] tracking-widest uppercase">Scroll</span>
    <div className="w-[1px] h-12 bg-gradient-to-b from-brandRed to-transparent"></div>
  </div>
</section>

      {/* 2. ABOUT: PDF 2~4p 내용 */}
      <section id="about" className="h-screen w-full snap-start flex items-center bg-gray-50 px-6 md:px-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
          <div className="flex flex-col justify-center">
            <h2 className="text-6xl md:text-8xl font-black text-slate-200 mb-6">ABOUT US.</h2>
            <p className="text-2xl font-bold text-brandRed mb-4">라별은 한 편의 완벽한 이야기를<br/>만들어가는 기획사입니다.</p>
            <p className="text-gray-600 leading-relaxed">우리는 사람과 사람, 마음과 마음을 잇는<br/>감동을 설계합니다.</p>
          </div>
          <div className="hidden md:block bg-slate-200 h-96 rounded-2xl overflow-hidden">
             <img src="/images/about_img.png" className="w-full h-full object-cover grayscale" />
          </div>
        </div>
      </section>

      {/* 3. BUSINESS AREAS: 4대 섹션 (6p~27p) */}
      {portfolioData.map((area, index) => (
        <section key={area.id} id={area.id} className="h-screen w-full snap-start relative flex items-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img src={area.mainImg} className="w-full h-full object-cover brightness-[0.4]" alt={area.title} />
          </div>
          <div className="container mx-auto px-10 relative z-10 text-white">
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-brandRed font-bold tracking-[0.3em] mb-4 block"
            >
              0{index + 1} {area.category}
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-7xl font-bold mb-6"
            >
              {area.title}
            </motion.h2>
            {/* <p className="text-lg md:text-2xl mb-10 text-gray-300 max-w-2xl">{area.subTitle}</p>
            <Link to={`/portfolio/${area.id}`} className="btn btn-outline border-white text-white rounded-full px-12 hover:bg-brandRed hover:border-brandRed">
              VIEW PROJECTS
            </Link> */}
            <PremiumButton 
               text="View Projects" 
               onClick={() => navigate(`/portfolio/${area.id}`)} 
            />
          </div>
        </section>
      ))}

      {/* 4. FOOTER: logo3 사용 */}
      <section id="contact" className="h-screen w-full snap-start overflow-hidden">
        <Footer />
    </section>
      
    </main>
  );
}