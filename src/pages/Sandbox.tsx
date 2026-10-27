import { useState, useEffect } from 'react';
import { SandboxItem } from '../types';
import { loadSandbox, convertDropboxUrl } from '../data/loader';
import LazyImage from '../components/LazyImage';

export default function Sandbox() {
  const [items, setItems] = useState<SandboxItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSandbox().then((data) => {
      setItems(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="px-6 py-20 md:px-10">
        <p className="font-outfit text-[10px] font-light tracking-wider text-[var(--color-text-lighter)]">
          loading...
        </p>
      </div>
    );
  }

  return (
    <div className="px-6 py-10 md:px-10 md:py-14">
      <div className="mb-10">
        <h1 className="font-outfit text-[11px] font-light tracking-[0.15em] uppercase text-[var(--color-text-light)] mb-3">
          Sandbox
        </h1>
        <p className="font-noto text-[11px] font-light leading-[1.9] text-[var(--color-text-light)] max-w-md">
          実験的な制作物の置き場。まだ作品と呼ぶ段階ではないもの、方向性のメモ、試みの記録。
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
        {items.map((item) => (
          <div key={item.id} className="group">
            <LazyImage
              src={item.thumbnail}
              alt={item.title}
              className="mb-3"
              aspectRatio="4/3"
            />
            <h2 className="font-noto text-[12px] font-light leading-tight mb-1">
              {item.title}
              {item._demo && (
                <span className="ml-2 font-outfit text-[8px] tracking-wider text-[var(--color-text-lighter)] uppercase">
                  demo
                </span>
              )}
            </h2>
            <p className="font-noto text-[10px] font-light leading-relaxed text-[var(--color-text-light)]">
              {item.description_ja}
            </p>
            {item.tags.length > 0 && (
              <div className="mt-2 flex gap-2">
                {item.tags.map(tag => (
                  <span key={tag} className="font-outfit text-[8px] font-light text-[var(--color-text-lighter)]">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
            {/* Video embed */}
            {item.video && (
              <div className="mt-3 aspect-video">
                {item.video.type === 'youtube' && (
                  <iframe src={item.video.url} className="w-full h-full" allowFullScreen />
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
