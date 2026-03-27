import { useState } from "react";
import { motion } from "framer-motion";
import Seo from "../components/Seo";
import { SITE_URL } from "../constants/seo";

export default function Contact() {
  const [result, setResult] = useState("");
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "라별커뮤니케이션즈",
    url: `${SITE_URL}/contact`,
    telephone: "032-262-2164",
    email: "rastarcomms@gmail.com",
    address: {
      "@type": "PostalAddress",
      addressCountry: "KR",
      addressRegion: "인천광역시",
      streetAddress: "서구 중봉대로 490, 893호",
    },
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("전송 중...");
    const formData = new FormData(event.target);

    // 여기에 본인의 Access Key를 넣으세요
    formData.append("access_key", "97a8c2ae-feed-4122-a1f9-501da231e52d");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      setResult("문의가 성공적으로 전달되었습니다!");
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };
  return (
    <>
      <Seo
        title="문의하기"
        description="라별커뮤니케이션즈 문의 페이지입니다. 공공행사, 방송 무대 연출, 대학교 축제, 기업 워크숍 상담을 빠르게 남겨보세요."
        path="/contact"
        structuredData={localBusinessSchema}
      />
      <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="pt-32 pb-20 px-6 md:px-20 max-w-7xl mx-auto"
    >
      <div className="mb-16">
        <h2 className="text-brandRed font-bold tracking-widest mb-4 uppercase">Contact</h2>
        <h1 className="text-4xl md:text-6xl font-black text-gray-900">오시는 길 & 문의하기</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        {/* 왼쪽: 지도 및 주소 정보 */}
        <div>
          <div className="bg-gray-200 w-full h-96 rounded-2xl overflow-hidden mb-8 shadow-inner">
            {/* 실제 구글맵 iframe으로 교체 가능 */}
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3163.63660634628!2d126.6666!3d37.5252!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357c9bf1!2z7J247LKc6rSR7Jet7IucIOyEnOq1rCDsoJH didn66y064yA66GcIDQ5MA!!5e0!3m2!1sko!2skr!4v1710000000000!5m2!1sko!2skr" 
              className="w-full h-full border-0" 
              allowFullScreen="" 
              loading="lazy"
            ></iframe>
          </div>
          <div className="space-y-4">
            <p className="text-xl font-bold">인천광역시 서구 중봉대로 490, 893호</p>
            <p className="text-gray-600">Tel. 032-262-2164</p>
            <p className="text-gray-600">Email. rastarcomms@gmail.com</p>
          </div>
        </div>

        {/* 오른쪽: 문의하기 폼 */}
        <div className="bg-gray-50 p-8 md:p-12 rounded-3xl">
          <h3 className="text-2xl font-bold mb-8">Quick Inquiry</h3>
          <form onSubmit={onSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-bold mb-2">성함 / 회사명</label>
              <input name="name" type="text" required className="w-full bg-white border-b-2 border-gray-200 py-3 px-4 focus:border-brandRed outline-none transition" />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">연락처</label>
              <input name="phone" type="tel" required className="w-full bg-white border-b-2 border-gray-200 py-3 px-4 focus:border-brandRed outline-none transition" />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">문의내용</label>
              <textarea name="message" required rows="4" className="w-full bg-white border-b-2 border-gray-200 py-3 px-4 focus:border-brandRed outline-none transition resize-none"></textarea>
            </div>
            
            <button type="submit" className="w-full bg-brandRed text-white font-bold py-4 rounded-xl hover:bg-black transition duration-300">
              문의 보내기
            </button>
            
            {/* 전송 결과 메시지 */}
            {result && <p className="text-center mt-4 font-bold text-brandRed animate-pulse">{result}</p>}
          </form>
        </div>
      </div>
      </motion.div>
    </>
  );
}