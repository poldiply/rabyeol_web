import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Head } from "vite-react-ssg";
import { portfolioData } from "../data/portfolioData";
import Footer from "../components/Footer";
import ScrollIndicator from "../components/ScrollIndicator";
import PremiumButton from "../components/PremiumButton";

export default function Home() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("home");

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
      <Head>
        <title>라별커뮤니케이션즈 | 한 편의 완벽한 이야기를 만드는 기획사</title>
        <meta name="description" content="공연, 축제, 미디어 콘텐츠, 기업 워크숍 전문 기획 그룹 라별커뮤니케이션즈입니다." />
        <meta name="keywords" content="라별커뮤니케이션즈, 기업/기관 행사, 대학 행사, 행사 전문 대행사, 여행/관광, 섭외 대행, 축제기획, 공연기획, 워크숍전문" />
        <link rel="canonical" href="https://www.rastarcomms.com/" />
        
        {/* OpenGraph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.rastarcomms.com/" />
        <meta property="og:title" content="라별커뮤니케이션즈 | Rabyeol Communications" />
        <meta property="og:description" content="한 편의 완벽한 이야기를 만들어가는 기획사, 라별커뮤니케이션즈의 포트폴리오를 확인하세요." />
        <meta property="og:image" content="https://www.rastarcomms.com/images/logo3.png" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content="라별커뮤니케이션즈 | Rabyeol Communications" />
        <meta property="twitter:image" content="https://www.rastarcomms.com/images/logo3.png" />
      </Head>

      <ScrollIndicator activeSection={activeSection} />
      
      {/* 1. HERO 섹션 */}
      <section id="home" className="h-screen w-full snap-start relative flex flex-col justify-center items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover brightness-[0.6]"
          >
            <source src="/videos/bg.mp4" type="video/mp4" />
          </video>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="relative z-10 flex flex-col items-center"
        >
          <div className="backdrop-blur-sm bg-white/10 p-12 rounded-full border border-white/20 shadow-2xl">
            <img src="/images/logo2.png" alt="Rabyeol" className="w-48 md:w-64" />
          </div>

          <h1 className="mt-10 text-white text-lg md:text-xl font-light tracking-[0.6em] uppercase opacity-80">
            Rabyeol Communications
          </h1>
        </motion.div>

        <div className="absolute bottom-10 z-10 flex flex-col items-center gap-2">
          <span className="text-white/40 text-[10px] tracking-widest uppercase">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-brandRed to-transparent"></div>
        </div>
      </section>

      {/* 2. ABOUT */}
      <section id="about" className="h-screen w-full snap-start flex items-center bg-gray-50 px-6 md:px-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
          <div className="flex flex-col justify-center">
            <h2 className="text-6xl md:text-8xl font-black text-slate-200 mb-6">ABOUT US.</h2>
            <p className="text-2xl font-bold text-brandRed mb-4">라별은 한 편의 완벽한 이야기를<br />만들어가는 기획사입니다.</p>
            <p className="text-gray-600 leading-relaxed font-medium">우리는 사람과 사람, 마음과 마음을 잇는<br />감동을 설계합니다.</p>
          </div>
          <div className="hidden md:block bg-slate-200 h-96 rounded-2xl overflow-hidden shadow-2xl">
            <img src="/images/about_img.png" className="w-full h-full object-cover grayscale brightness-110" alt="About Rabyeol" />
          </div>
        </div>
      </section>

      {/* 3. BUSINESS AREAS */}
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
            <PremiumButton
              text="View Projects"
              onClick={() => navigate(`/portfolio/${area.id}`)}
            />
          </div>
        </section>
      ))}

      {/* 4. FOOTER */}
      <section id="contact" className="h-screen w-full snap-start overflow-hidden">
        <Footer />
      </section>
    </main>
  );
}