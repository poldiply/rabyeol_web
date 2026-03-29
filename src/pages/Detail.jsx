import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
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
    const images = selectedProject.images || [selectedProject.thumbnail];
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    const images = selectedProject.images || [selectedProject.thumbnail];
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-white font-sans">
      {/* 1. HERO 섹션 */}
      <div className="h-[40vh] md:h-[60vh] relative overflow-hidden">
        <img src={category.mainImg} className="w-full h-full object-cover" alt={category.title} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-10 md:p-20 text-white">
          <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }}>
            <span className="text-brandRed font-bold tracking-[0.3em] mb-4 block text-sm md:text-base">OUR PORTFOLIO</span>
            <h1 className="text-4xl md:text-7xl font-bold mb-6 uppercase leading-tight">{category.title}</h1>
          </motion.div>
        </div>
      </div>

      {/* 2. OVERVIEW & CONTENTS */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-3 gap-16 items-start">
          <div className="lg:col-span-2">
            <h3 className="text-3xl font-bold mb-8 text-gray-900 flex items-center gap-4">
              Overview
              <span className="h-px flex-1 bg-gray-100 italic font-light text-sm text-gray-400">Total Solutions</span>
            </h3>
            <p className="text-xl text-gray-600 leading-relaxed font-light mb-12 whitespace-pre-wrap">{category.overview}</p>
          </div>
          <div className="bg-gray-50 p-10 rounded-3xl border border-gray-100">
            <h4 className="text-brandRed font-bold uppercase tracking-tighter mb-8 text-sm">Service Scope</h4>
            <ul className="space-y-6">
              {category.contents.map((item, i) => (
                <li key={i} className="text-gray-800 font-medium flex items-center group transition-all">
                  <span className="w-8 h-8 rounded-full bg-brandRed/10 text-brandRed flex items-center justify-center mr-4 group-hover:bg-brandRed group-hover:text-white transition-colors">
                    {i + 1}
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
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

      {/* 5. PROJECT 상세 모달 (상부 정보, 하부 슬라이더 구조) */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 shrink-0">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedProject(null)} className="absolute inset-0 bg-black/95 backdrop-blur-md" />
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              className="relative bg-white w-full max-w-5xl max-h-[90vh] rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col"
            >
              {/* 닫기 버튼: 항상 표시 및 고대비 스타일 */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 z-[110] w-12 h-12 bg-black text-white rounded-full flex items-center justify-center hover:bg-brandRed transition-colors shadow-lg"
                aria-label="Close"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* [상단 영역] 프로젝트 정보 (컴팩트 배치) */}
              <div className="p-8 md:p-12 pb-6 md:pb-8 border-b border-gray-50 flex-shrink-0">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                  <div className="max-w-2xl">
                    <span className="text-brandRed font-bold text-sm tracking-widest uppercase mb-2 block">{selectedProject.client}</span>
                    <h2 className="text-2xl md:text-4xl font-bold text-gray-900 leading-tight mb-4">{selectedProject.title}</h2>
                    <p className="text-gray-500 font-light leading-relaxed text-sm md:text-base">{selectedProject.description}</p>
                  </div>
                  <div className="flex gap-8 shrink-0 py-2 border-l-0 md:border-l md:pl-8 border-gray-100">
                    <div>
                      <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest block mb-1">Category</span>
                      <p className="text-gray-900 text-xs font-semibold">{category.category}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* [하단 영역] 이미지 슬라이더 */}
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
                      alt={`${selectedProject.title} ${currentImageIndex + 1}`}
                    />
                  </AnimatePresence>

                  {/* 좌우 네비게이션 화살표 (심플) */}
                  {(selectedProject.images && selectedProject.images.length > 1) && (
                    <>
                      <button onClick={handlePrev} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/20 hover:bg-black/50 text-white rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                      </button>
                      <button onClick={handleNext} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/20 hover:bg-black/50 text-white rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                      </button>
                    </>
                  )}

                  {/* 하단 점 네비게이션 */}
                  {(selectedProject.images && selectedProject.images.length > 1) && (
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                      {selectedProject.images.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(idx); }}
                          className={`w-2 h-2 rounded-full transition-all ${idx === currentImageIndex ? "bg-white w-6" : "bg-white/40 hover:bg-white/60"}`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 공통 하단 푸터 (정보 영역 전용) */}
      <SimpleFooter />
    </motion.div>
  );
}