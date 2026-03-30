import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Head } from "vite-react-ssg";
import { portfolioData } from "../data/portfolioData";
import { useEffect, useState } from "react";
import SimpleFooter from "../components/SimpleFooter";

export default function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const category = portfolioData.find((p) => p.id === id);
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // 모달 열릴 때 인덱스 초기화
  useEffect(() => {
    if (selectedProject) setCurrentImageIndex(0);
  }, [selectedProject]);

  if (!category) return <div className="p-20 text-center text-gray-500">카테고리를 찾을 수 없습니다.</div>;

  const handleNext = (e) => {
    e.stopPropagation();
    const images = selectedProject.images && selectedProject.images.length > 0 ? selectedProject.images : [selectedProject.thumbnail];
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    const images = selectedProject.images && selectedProject.images.length > 0 ? selectedProject.images : [selectedProject.thumbnail];
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-white font-sans">
      <Head>
        <title>{category.title} | 라별커뮤니케이션즈</title>
        <meta name="description" content={`${category.title} 분야의 주요 실적과 프로젝트를 소개합니다.`} />
        <meta name="keywords" content={`${category.title}, 포트폴리오, 행사실적, 라별커뮤니케이션즈`} />
        <link rel="canonical" href={`https://www.rastarcomms.com/portfolio/${id}`} />
        <meta property="og:title" content={`${category.title} | 라별커뮤니케이션즈`} />
        <meta property="og:image" content="https://www.rastarcomms.com/images/logo3.png" />
      </Head>

      {/* 1. HERO 섹션 */}
      <div className="h-[50vh] md:h-[70vh] relative overflow-hidden">
        <img src={category.mainImg} className="w-full h-full object-cover" alt={category.title} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-10 md:p-24 text-white">
          <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }}>
            <span className="text-brandRed font-bold tracking-[0.4em] mb-4 block text-xs md:text-sm uppercase">Our Expertise</span>
            <h1 className="text-4xl md:text-7xl font-bold mb-6 uppercase leading-tight tracking-tighter">
              {category.title}
            </h1>
            {category.subTitle && (
              <p className="text-lg md:text-2xl font-light text-white/80 max-w-3xl leading-relaxed italic border-l-2 border-brandRed pl-6">
                "{category.subTitle}"
              </p>
            )}
          </motion.div>
        </div>
      </div>

      {/* 2. OVERVIEW & SERVICE SCOPE (Horizontal Layout) */}
      <div className="max-w-7xl mx-auto px-6 py-24 md:py-32">
        <div className="mb-24">
          <h3 className="text-brandRed font-bold uppercase tracking-[0.3em] mb-10 text-xs">Overview</h3>
          <p className="text-2xl md:text-4xl font-light text-gray-800 leading-tight whitespace-pre-wrap italic max-w-4xl">
            {category.overview}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-12">
          {category.contents.map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group"
            >
              <div className="flex gap-6 items-start">
                <span className="text-4xl md:text-5xl font-black text-gray-100 group-hover:text-brandRed/20 transition-colors duration-500 leading-none">
                  0{i + 1}
                </span>
                <div className="pt-2 flex-1">
                  <h4 className="text-lg md:text-xl font-bold text-gray-900 mb-4 tracking-tight group-hover:text-brandRed transition-colors">
                    {item}
                  </h4>
                  <div className="h-[2px] w-8 bg-gray-200 group-hover:w-24 group-hover:bg-brandRed transition-all duration-700"></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 3. PROJECTS BY YEAR */}
      <div className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-4xl font-bold mb-16 text-center text-gray-900">RECENT PROJECTS</h3>
          {category.years && category.years.length > 0 ? (
            <div className="space-y-24">
              {category.years.map((yearGroup) => (
                <div key={yearGroup.year} className="relative">
                  <div className="flex items-center gap-6 mb-12">
                    <span className="text-6xl md:text-8xl font-bold text-gray-200">{yearGroup.year}</span>
                    <div className="h-px flex-1 bg-gray-200"></div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {yearGroup.projects.map((project) => (
                      <motion.div
                        key={project.id}
                        whileHover={{ y: -10 }}
                        onClick={() => setSelectedProject(project)}
                        className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all border border-gray-100 cursor-pointer group"
                      >
                        <div className="h-64 overflow-hidden relative">
                          <img src={project.thumbnail} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt={project.title} />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <span className="text-white border border-white px-6 py-2 rounded-full text-sm font-bold uppercase tracking-widest">View Details</span>
                          </div>
                        </div>
                        <div className="p-8">
                          <span className="text-brandRed text-xs font-bold tracking-widest uppercase mb-3 block">{project.client}</span>
                          <h4 className="text-xl font-bold text-gray-900 mb-2 truncate">{project.title}</h4>
                          <p className="text-gray-500 text-sm font-light leading-relaxed line-clamp-2">{project.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-200">
              <p className="text-gray-400 font-light italic text-xl">준비중인 프로젝트입니다.</p>
            </div>
          )}
        </div>
      </div>

      {/* 4. FOOTER CALL TO ACTION */}
      <div className="py-24 text-center">
        <button onClick={() => navigate("/")} className="group relative inline-flex items-center gap-4 px-16 py-6 border-b-2 border-brandRed overflow-hidden transition-all">
          <span className="relative z-10 text-xl font-bold uppercase tracking-widest group-hover:text-brandRed transition-colors">Back to Home</span>
          <svg className="w-6 h-6 transform group-hover:-translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
      </div>

      {/* 5. PROJECT 상세 모달 */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 shrink-0">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedProject(null)} className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              className="relative bg-white w-full max-w-5xl max-h-[90vh] rounded-2xl overflow-hidden shadow-2xl flex flex-col"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 z-[110] w-10 h-10 bg-white/80 backdrop-blur-md text-gray-900 rounded-full flex items-center justify-center hover:bg-brandRed hover:text-white transition-all shadow-md border border-gray-100"
              >
                ✕
              </button>

              <div className="p-8 md:p-12 pb-6 md:pb-10 border-b border-gray-50 flex-shrink-0">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 md:gap-16">
                  <div className="flex-1">
                    <h2 className="text-2xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
                      {selectedProject.title}
                    </h2>
                    <p className="text-gray-500 font-light leading-relaxed text-sm md:text-lg max-w-2xl whitespace-pre-wrap">
                      {selectedProject.description}
                    </p>
                  </div>
                  
                  {/* 프로젝트 메타 정보 (Client, Location) */}
                  <div className="flex flex-col gap-6 shrink-0 md:min-w-[200px] md:border-l md:pl-10 border-gray-100">
                    {selectedProject.client && (
                      <div>
                        <span className="text-brandRed text-[10px] font-bold uppercase tracking-[0.2em] block mb-2 opacity-70">Client</span>
                        <p className="text-gray-900 text-sm md:text-base font-bold">{selectedProject.client}</p>
                      </div>
                    )}
                    {selectedProject.location && (
                      <div>
                        <span className="text-brandRed text-[10px] font-bold uppercase tracking-[0.2em] block mb-2 opacity-70">Location</span>
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <p className="text-gray-900 text-sm md:text-base font-bold">{selectedProject.location}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex-1 bg-gray-50 p-4 md:p-8 flex flex-col justify-center overflow-hidden">
                <div className="relative w-full max-w-4xl mx-auto aspect-video rounded-2xl overflow-hidden group shadow-xl">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentImageIndex}
                      src={(selectedProject.images && selectedProject.images.length > 0 ? selectedProject.images[currentImageIndex] : selectedProject.thumbnail)}
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.5 }}
                      className="w-full h-full object-cover"
                    />
                  </AnimatePresence>

                  {(selectedProject.images && selectedProject.images.length > 1) && (
                    <>
                      <button onClick={handlePrev} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/20 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">←</button>
                      <button onClick={handleNext} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/20 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">→</button>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <SimpleFooter />
    </motion.div>
  );
}