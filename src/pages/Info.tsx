export default function Info() {
  return (
    <div className="px-6 py-10 md:px-10 md:py-14">
      <h1 className="font-outfit text-[11px] font-light tracking-[0.15em] uppercase mb-10 text-[var(--color-text-light)]">
        Info
      </h1>

      <div className="max-w-xl space-y-12">
        {/* Name */}
        <section>
          <h2 className="font-outfit text-[9px] font-light tracking-[0.15em] uppercase text-[var(--color-text-lighter)] mb-3">
            Name
          </h2>
          <p className="font-noto text-[13px] font-light leading-tight mb-1">
            高谷隼聖 / Shunto Takaya
          </p>
          <p className="font-outfit text-[10px] font-light text-[var(--color-text-lighter)]">
            suimeow
          </p>
        </section>

        {/* About */}
        <section>
          <h2 className="font-outfit text-[9px] font-light tracking-[0.15em] uppercase text-[var(--color-text-lighter)] mb-3">
            About
          </h2>
          <p className="font-noto text-[12px] font-light leading-[2]">
            映像作家・デザイナー。映像インスタレーション、プロジェクションマッピング、3DCG、モーショングラフィックス、グラフィックなど、複数のジャンルを横断して制作している。
          </p>
          <p className="font-noto text-[12px] font-light leading-[2] mt-3">
            見間違い・聞き違いなどの「誤認」が、個人の経験や記憶によって補完されて生まれる視点をすくいあげ、他者と共有できる形に変換する仕事をしている。
          </p>
        </section>

        {/* Tools */}
        <section>
          <h2 className="font-outfit text-[9px] font-light tracking-[0.15em] uppercase text-[var(--color-text-lighter)] mb-3">
            Tools
          </h2>
          <div className="grid grid-cols-2 gap-x-8 gap-y-1">
            {[
              'Blender', 'After Effects', 'TouchDesigner', 'Cinema 4D',
              'Houdini', 'Illustrator', 'Photoshop', 'Premiere Pro',
              'VS Code', 'DaVinci Resolve'
            ].map(tool => (
              <p key={tool} className="font-zalando text-[10px] font-light py-0.5">
                {tool}
              </p>
            ))}
          </div>
        </section>

        {/* History */}
        <section>
          <h2 className="font-outfit text-[9px] font-light tracking-[0.15em] uppercase text-[var(--color-text-lighter)] mb-3">
            History
          </h2>
          <div className="space-y-3">
            {[
              { year: '2026', text: '——' },
              { year: '2025', text: '——' },
              { year: '2024', text: '——' },
            ].map(item => (
              <div key={item.year} className="flex gap-6">
                <span className="font-outfit text-[10px] font-light text-[var(--color-text-lighter)] w-12 shrink-0">
                  {item.year}
                </span>
                <span className="font-noto text-[11px] font-light">
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
