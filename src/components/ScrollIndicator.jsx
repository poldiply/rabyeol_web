const sections = ["hero", "about", "public-events", "broadcast-stage", "univ-festival", "workshop-mt", "contact"];

export default function ScrollIndicator({ activeSection }) {
  return (
    <div className="fixed right-6 md:right-10 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-4">
      {sections.map((id) => (
        <button
          key={id}
          onClick={() => document.getElementById(id).scrollIntoView({ behavior: 'smooth' })}
          className={`group flex items-center justify-end gap-4`}
        >
          {/* 섹션 이름 (호버할 때만 슬쩍 보임) */}
          <span className="text-[10px] font-bold tracking-widest text-brandRed opacity-0 group-hover:opacity-100 transition-opacity uppercase">
            {id.replace("-", " ")}
          </span>
          {/* 동그란 점 */}
          <div 
            className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${
              activeSection === id 
                ? "bg-brandRed scale-[2.0]" 
                : "bg-gray-300 group-hover:bg-brandRed"
            }`}
          />
        </button>
      ))}
    </div>
  );
}