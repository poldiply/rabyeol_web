import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PrivacyModal({ isOpen, onClose }) {
  const [showFullText, setShowFullText] = useState(false);

  // 모달 닫힐 때 상태 초기화
  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => setShowFullText(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />
      
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }} 
        animate={{ scale: 1, opacity: 1, y: 0 }} 
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="relative bg-white w-full max-w-xl rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col max-h-[85vh]"
      >
        {/* 상단 헤더 */}
        <div className="p-8 pb-4 flex justify-between items-center border-b border-gray-50 flex-shrink-0">
          <h4 className="text-xl md:text-2xl font-bold text-gray-900">
            {showFullText ? "개인정보처리방침 전문" : "개인정보 수집 및 이용 안내"}
          </h4>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* 메인 콘텐츠 영역 (화면 전환 애니메이션) */}
        <div className="flex-1 overflow-y-auto p-8 pt-6 custom-scrollbar">
          <AnimatePresence mode="wait">
            {!showFullText ? (
              /* --- 요약 버전 (Summary) --- */
              <motion.div
                key="summary"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <p className="text-gray-600 text-sm leading-relaxed">
                  라별(Rabyeol)은 고객님의 문의사항 처리를 위해 다음과 같이 최소한의 개인정보를 수집 및 이용합니다.
                </p>
                <div className="space-y-4">
                  <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100/50">
                    <ul className="space-y-4 text-sm">
                      <li className="flex gap-3">
                        <span className="font-bold text-brandRed shrink-0">1.</span>
                        <p className="text-gray-700"><strong>수집항목:</strong> 성함/회사명, 연락처, 이메일, 문의내용</p>
                      </li>
                      <li className="flex gap-3">
                        <span className="font-bold text-brandRed shrink-0">2.</span>
                        <p className="text-gray-700"><strong>수집목적:</strong> 문의사항에 대한 상담 및 답변 제공</p>
                      </li>
                      <li className="flex gap-3">
                        <span className="font-bold text-brandRed shrink-0">3.</span>
                        <p className="text-gray-700"><strong>보유기간:</strong> <span className="underline decoration-brandRed/30 decoration-2 underline-offset-4">상담 완료 후 즉시 파기</span></p>
                      </li>
                    </ul>
                  </div>
                </div>
                <p className="text-[11px] text-gray-400 leading-relaxed italic">
                  * 서비스 제공을 위해 필요한 최소한의 정보입니다. 동의를 거부하실 수 있으나, 이 경우 문의하기 서비스 이용이 제한될 수 있습니다.
                </p>
                
                <button 
                  onClick={() => setShowFullText(true)}
                  className="w-full py-4 text-sm font-bold text-gray-400 hover:text-brandRed transition-colors flex items-center justify-center gap-2 border-t border-gray-50 mt-4"
                >
                  전문 보기
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </motion.div>
            ) : (
              /* --- 전체 전문 버전 (Full Text) --- */
              <motion.div
                key="full"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="text-gray-600 text-xs leading-relaxed space-y-6 pb-4"
              >
                <section>
                  <h5 className="font-bold text-gray-900 mb-2">제1조 (목적)</h5>
                  <p>라별커뮤니케이션즈(이하 '회사')는 이용자의 개인정보를 보호하고 관련 법령을 준수하며, 개인정보와 관련한 이용자의 고충을 신속하고 원활하게 처리할 수 있도록 다음과 같이 개인정보 처리방침을 수립·공개합니다.</p>
                </section>

                <section>
                  <h5 className="font-bold text-gray-900 mb-2">제2조 (개인정보의 처리 항목 및 목적)</h5>
                  <p>회사는 다음의 목적을 위해 필요한 최소한의 개인정보를 수집하고 있습니다. 수집된 개인정보는 다음의 목적 이외의 용도로는 이용되지 않습니다.</p>
                  <p className="mt-1">1. 수집항목: 성함/회사명, 연락처, 이메일, 문의내용</p>
                  <p>2. 이용목적: 비즈니스 문의에 대한 본인 확인 및 상담 서비스 제공</p>
                </section>

                <section>
                  <h5 className="font-bold text-gray-900 mb-2">제3조 (개인정보의 처리 및 보유기간)</h5>
                  <p>회사는 원칙적으로 개인정보 수집 및 이용목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다. 단, 관계법령의 규정에 의하여 보존할 필요가 있는 경우 관련 법령에서 정한 일정한 기간 동안 개인정보를 보관합니다.</p>
                </section>

                <section>
                  <h5 className="font-bold text-gray-900 mb-2">제4조 (개인정보의 파기절차 및 방법)</h5>
                  <p>개인정보 보유기간의 경과, 처리 목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체 없이 해당 개인정보를 파기합니다. 전자적 파일 형태의 정보는 기록을 재생할 수 없는 기술적 방법을 사용하여 삭제합니다.</p>
                </section>

                <section>
                  <h5 className="font-bold text-gray-900 mb-2">제5조 (이용자의 권리와 의무)</h5>
                  <p>이용자는 회사에 대해 언제든지 개인정보 열람·정정·삭제·처리정지 요구 등의 권리를 행사할 수 있습니다.</p>
                </section>

                <section>
                  <h5 className="font-bold text-gray-900 mb-2">제6조 (개인정보의 안전성 확보 조치)</h5>
                  <p>회사는 개인정보보호법 제29조에 따라 다음과 같이 안전성 확보에 필요한 기술적/관리적 및 물리적 조치를 하고 있습니다.</p>
                  <p className="mt-1">1. 개인정보 취급 직원의 최소화 및 교육</p>
                  <p>2. 개인정보에 대한 접근 권한의 관리</p>
                </section>

                <section>
                  <h5 className="font-bold text-gray-900 mb-2">제7조 (개인정보 보호책임자)</h5>
                  <p>회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 이용자의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.</p>
                  <div className="bg-gray-50 p-4 rounded-xl mt-2 space-y-1">
                    <p><strong>▶ 개인정보 보호책임 부서/책임자</strong></p>
                    <p>성명: 라별커뮤니케이션즈</p>
                    <p>연락처: 032-262-2164</p>
                    <p>이메일: rastarcomms@gmail.com</p>
                  </div>
                </section>

                <section>
                  <h5 className="font-bold text-gray-900 mb-2">제8조 (개인정보 처리방침의 변경)</h5>
                  <p>이 개인정보 처리방침은 시행일로부터 적용되며, 법령 및 방침에 따른 변경내용의 추가, 삭제 및 정정이 있는 경우에는 공지사항을 통하여 고지할 것입니다.</p>
                </section>

                <button 
                  onClick={() => setShowFullText(false)}
                  className="w-full py-4 text-sm font-bold text-brandRed hover:underline transition-all flex items-center justify-center gap-2 border-t border-gray-50 mt-4"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                  </svg>
                  요약 안내로 돌아가기
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 하단 버튼 (공통) */}
        <div className="p-8 pt-4 border-t border-gray-50 flex-shrink-0">
          <button 
            onClick={onClose}
            className="w-full bg-gray-900 text-white py-4 rounded-2xl font-bold hover:bg-brandRed transition-colors shadow-lg"
          >
            확인했습니다
          </button>
        </div>
      </motion.div>
    </div>
  );
}
