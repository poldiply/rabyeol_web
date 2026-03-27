import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { portfolioData } from "../data/portfolioData";
import { useEffect } from "react";
import Seo from "../components/Seo";

export default function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = portfolioData.find((p) => p.id === id);

  // 상세페이지 진입 시 스크롤을 위로 올림
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!project) {
    return (
      <>
        <Seo
          title="포트폴리오를 찾을 수 없습니다"
          description="요청하신 포트폴리오를 찾을 수 없습니다."
          path={`/portfolio/${id}`}
          robots="noindex,follow"
        />
        <div className="p-20 text-center">프로젝트를 찾을 수 없습니다.</div>
      </>
    );
  }

  return (
    <>
      <Seo
        title={`${project.title} 포트폴리오`}
        description={project.subTitle}
        path={`/portfolio/${project.id}`}
        ogType="article"
        image={project.mainImg}
      />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-20">
      {/* 상단 Hero 섹션 */}
      <div className="h-[50vh] md:h-[70vh] relative overflow-hidden">
        <img src={project.mainImg} alt={project.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-10 md:p-20 text-white">
          <motion.h1 initial={{ y: 30 }} animate={{ y: 0 }} className="text-4xl md:text-6xl font-bold mb-4">
            {project.title}
          </motion.h1>
          <p className="text-xl md:text-2xl opacity-90">{project.subTitle}</p>
        </div>
      </div>

      {/* 정보 섹션 */}
      <div className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-3 gap-16">
        <div className="md:col-span-2">
          <h3 className="text-2xl font-bold mb-6 border-b-2 border-brandRed pb-2 inline-block">Overview</h3>
          <p className="text-lg text-gray-700 leading-relaxed mb-10">{project.overview}</p>
          
          <div className="grid grid-cols-2 gap-4">
             {/* 여기에는 PDF에 있던 추가 사진들을 배치 (예: logo2 활용 가능) */}
             <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center italic text-gray-400">Project Image 1</div>
             <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center italic text-gray-400">Project Image 2</div>
          </div>
        </div>

        <div className="bg-gray-50 p-8 rounded-2xl h-fit">
          <div className="mb-8">
            <h4 className="text-brandRed font-bold uppercase tracking-tighter mb-2 text-sm">Client / Location</h4>
            <p className="text-gray-900 font-medium">{project.client}</p>
            <p className="text-gray-600 text-sm">{project.location}</p>
          </div>
          <div>
            <h4 className="text-brandRed font-bold uppercase tracking-tighter mb-4 text-sm">Key Contents</h4>
            <ul className="space-y-3">
              {project.contents.map((item, i) => (
                <li key={i} className="text-gray-700 text-sm flex items-start">
                  <span className="text-brandRed mr-2">•</span> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="text-center pb-20">
        <button onClick={() => navigate("/")} className="btn btn-outline border-gray-300 hover:bg-brandRed hover:border-brandRed rounded-full px-12">
          LIST
        </button>
      </div>
      </motion.div>
    </>
  );
}