import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Contact() {
  const [result, setResult] = useState("");
  const [agreed, setAgreed] = useState(true);
  const [showPrivacy, setShowPrivacy] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    
    if (!agreed) {
      setResult("개인정보 처리방침에 동의해주세요.");
      return;
    }

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
      setAgreed(true); // 전송 후에도 기본값인 체크 상태로 유지
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="pt-32 pb-20 px-6 md:px-20 max-w-7xl mx-auto"
    >
      <div className="mb-16">
        <h2 className="text-brandRed font-bold tracking-widest mb-4 uppercase">Contact</h2>
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 font-sans">오시는 길 & 문의하기</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        {/* 왼쪽: 지도 및 주소 정보 */}
        <div>
          <div className="bg-gray-200 w-full h-96 rounded-2xl overflow-hidden mb-8 shadow-inner border border-gray-100">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3163.63660634628!2d126.6666!3d37.5252!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357c9bf1!2z7J247LKc6rSR7Jet7IucIOyEnOq1rCDsoJH didn66y064yA66GcIDQ5MA!!5e0!3m2!1sko!2skr!4v1710000000000!5m2!1sko!2skr" 
              className="w-full h-full border-0" 
              allowFullScreen="" 
              loading="lazy"
            ></iframe>
          </div>
          <div className="space-y-6">
             <div className="flex flex-col">
                <span className="text-brandRed font-bold text-xs uppercase tracking-widest mb-2">Address</span>
                <p className="text-xl font-bold text-gray-900">인천광역시 서구 중봉대로 490, 893호</p>
             </div>
             <div className="flex gap-12">
                <div className="flex flex-col">
                    <span className="text-brandRed font-bold text-xs uppercase tracking-widest mb-2">Call</span>
                    <p className="text-gray-600 font-medium">032-262-2164</p>
                </div>
                <div className="flex flex-col">
                    <span className="text-brandRed font-bold text-xs uppercase tracking-widest mb-2">Email</span>
                    <p className="text-gray-600 font-medium">rastarcomms@gmail.com</p>
                </div>
             </div>
          </div>
        </div>

        {/* 오른쪽: 문의하기 폼 */}
        <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl shadow-gray-200/50 border border-gray-50 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brandRed/5 rounded-bl-full -mr-10 -mt-10"></div>
          
          <form onSubmit={onSubmit} className="space-y-8 relative z-10">
            <div className="group">
              <label className="block text-xs font-bold uppercase tracking-widest mb-3 text-gray-400 group-focus-within:text-brandRed transition-colors">성함 / 회사명</label>
              <input name="name" type="text" required className="w-full bg-gray-50/50 border-b-2 border-gray-100 py-4 px-0 focus:border-brandRed outline-none transition-all placeholder:text-gray-300 font-medium" placeholder="홍길동 / (주)라별" />
            </div>
            <div className="group">
              <label className="block text-xs font-bold uppercase tracking-widest mb-3 text-gray-400 group-focus-within:text-brandRed transition-colors">연락처</label>
              <input name="phone" type="tel" required className="w-full bg-gray-50/50 border-b-2 border-gray-100 py-4 px-0 focus:border-brandRed outline-none transition-all placeholder:text-gray-300 font-medium" placeholder="010-0000-0000" />
            </div>
            <div className="group">
              <label className="block text-xs font-bold uppercase tracking-widest mb-3 text-gray-400 group-focus-within:text-brandRed transition-colors">문의내용</label>
              <textarea name="message" required rows="4" className="w-full bg-gray-50/50 border-b-2 border-gray-100 py-4 px-0 focus:border-brandRed outline-none transition-all resize-none placeholder:text-gray-300 font-medium" placeholder="문의하실 내용을 입력해주세요."></textarea>
            </div>
            
            {/* 개인정보 동의 섹션 */}
            <div className="flex items-start gap-3 py-4 border-t border-gray-50">
              <div className="flex items-center h-5">
                <input
                  id="privacy"
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="w-4 h-4 text-brandRed bg-gray-100 border-gray-300 rounded focus:ring-brandRed accent-brandRed cursor-pointer"
                />
              </div>
              <div className="text-sm">
                <label htmlFor="privacy" className="font-medium text-gray-600 cursor-pointer">
                  개인정보 수집 및 이용에 동의합니다.
                </label>
                <button
                  type="button"
                  onClick={() => setShowPrivacy(true)}
                  className="ml-2 text-gray-400 underline decoration-gray-200 hover:text-brandRed hover:decoration-brandRed transition-all"
                >
                  [자세히 보기]
                </button>
              </div>
            </div>

            <button type="submit" className="w-full bg-brandRed text-white font-bold py-5 rounded-2xl hover:bg-black shadow-xl shadow-brandRed/20 hover:shadow-none transition-all duration-300 transform hover:-translate-y-1 uppercase tracking-[0.2em]">
              문의하기
            </button>
            
            {result && <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center mt-6 font-bold text-brandRed">{result}</motion.p>}
          </form>
        </div>
      </div>

      {/* 개인정보 처리방침 모달 */}
      <AnimatePresence>
        {showPrivacy && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setShowPrivacy(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative bg-white w-full max-w-lg rounded-[2rem] p-10 overflow-hidden shadow-2xl"
            >
              <h4 className="text-2xl font-bold mb-6 text-gray-900">개인정보 수집 및 이용 안내</h4>
              <div className="text-gray-600 text-sm leading-relaxed space-y-4 max-h-[40vh] overflow-y-auto pr-4 custom-scrollbar">
                <p>라별(Rabyeol)은 고객님의 문의사항 처리를 위해 다음과 같이 개인정보를 수집 및 이용합니다.</p>
                <div className="bg-gray-50 p-4 rounded-xl space-y-2">
                    <p><strong>1. 수집항목:</strong> 성함/회사명, 연락처, 이메일, 문의내용</p>
                    <p><strong>2. 수집목적:</strong> 문의사항에 대한 상담 및 답변 제공</p>
                    <p><strong>3. 보유기간:</strong> <span className="text-brandRed font-bold underline">상담 완료 후 즉시 파기</span> (단, 관계법령에 의해 보존할 필요가 있는 경우 관련 법령에 따름)</p>
                </div>
                <p>고객님은 서비스 제공에 필요한 최소한의 개인정보 수집 및 이용 동의를 거부하실 수 있으나, 이 경우 문의하기 서비스 이용이 제한될 수 있습니다.</p>
              </div>
              <button 
                onClick={() => setShowPrivacy(false)}
                className="w-full mt-8 bg-black text-white py-4 rounded-xl font-bold hover:bg-brandRed transition-colors"
              >
                확인했습니다
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}