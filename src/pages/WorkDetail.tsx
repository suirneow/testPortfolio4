import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Work } from '../types';
import { loadWork, loadWorks, convertDropboxUrl } from '../data/loader';
import LazyImage from '../components/LazyImage';

export default function WorkDetail() {
  const { id } = useParams<{ id: string }>();
  const [work, setWork] = useState<Work | null>(null);
  const [allWorks, setAllWorks] = useState<Work[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([loadWork(id!), loadWorks()]).then(([w, all]) => {
      setWork(w);
      setAllWorks(all);
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return (
      <div className="px-6 py-20 md:px-10">
        <p className="font-outfit text-[10px] font-light tracking-wider text-[var(--color-text-lighter)]">
          loading...
        </p>
      </div>
    );
  }

  if (!work) {
    return (
      <div className="px-6 py-20 md:px-10">
        <p className="font-noto text-[12px] font-light">作品が見つかりませんでした。</p>
        <Link to="/" className="mt-4 inline-block font-outfit text-[10px] font-light tracking-wider uppercase opacity-60 hover:opacity-100">
          ← Back to works
        </Link>
      </div>
    );
  }

  const currentIndex = allWorks.findIndex(w => w.id === work.id);
  const prevWork = currentIndex < allWorks.length - 1 ? allWorks[currentIndex + 1] : null;
  const nextWork = currentIndex > 0 ? allWorks[currentIndex - 1] : null;

  const isSpread = work.layout === 'spread';

  return (
    <div>
      {/* Hero section */}
      {work.layout === 'default' && (
        <div className="relative w-full h-[70vh] min-h-[400px] bg-[var(--color-border-light)]">
          {work.thumbnail ? (
            <img
              src={convertDropboxUrl(work.thumbnail)}
              alt={work.title}
              className="w-full h-full object-cover"
              loading="eager"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="font-outfit text-[10px] font-light tracking-wider text-[var(--color-text-lighter)] uppercase">
                {work._demo ? 'demo — no image' : 'no image'}
              </span>
            </div>
          )}
          {/* Caption overlay - bottom left */}
          <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 max-w-md">
            <p className="font-zalando text-[10px] font-light leading-relaxed text-white mix-blend-difference">
              {work.caption_en}
            </p>
          </div>
          {/* Description overlay - bottom right */}
          <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 max-w-sm text-right">
            <p className="font-noto text-[11px] font-light leading-relaxed text-white mix-blend-difference">
              {work.description_ja}
            </p>
          </div>
        </div>
      )}

      {/* Spread layout */}
      {isSpread && (
        <div className="px-6 py-10 md:px-10 md:py-14">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
            {/* Left: image + concept */}
            <div>
              <LazyImage
                src={work.thumbnail}
                alt={work.title}
                className="mb-6"
                aspectRatio="3/4"
              />
              <p className="font-noto text-[11px] font-light leading-relaxed">
                {work.description_ja}
              </p>
              <p className="mt-4 font-zalando text-[10px] font-light leading-relaxed text-[var(--color-text-light)]">
                {work.caption_en}
              </p>
            </div>
            {/* Right: process */}
            <div>
              <h3 className="font-outfit text-[10px] font-light tracking-[0.15em] uppercase mb-6 text-[var(--color-text-light)]">
                (Design Process)
              </h3>
              {work.process_images.length > 0 && (
                <div className="space-y-4 mb-6">
                  {work.process_images.map((img, i) => (
                    <LazyImage key={i} src={img} alt={`${work.title} process ${i + 1}`} aspectRatio="16/9" />
                  ))}
                </div>
              )}
              {work.process_text && (
                <p className="font-noto text-[11px] font-light leading-relaxed text-[var(--color-text-light)]">
                  {work.process_text}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Content section (for default layout) */}
      {work.layout === 'default' && (
        <div className="px-6 py-10 md:px-10 md:py-14">
          {/* Title */}
          <div className="mb-10">
            <h1 className="font-noto text-[16px] font-light leading-tight mb-2">
              {work.title}
              {work._demo && (
                <span className="ml-2 font-outfit text-[9px] tracking-wider text-[var(--color-text-lighter)] uppercase">
                  demo
                </span>
              )}
            </h1>
            <p className="font-outfit text-[10px] font-light text-[var(--color-text-lighter)]">
              {work.year}
            </p>
          </div>

          {/* Images */}
          {work.images.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
              {work.images.map((img, i) => (
                <LazyImage key={i} src={img} alt={`${work.title} ${i + 1}`} aspectRatio="16/9" />
              ))}
            </div>
          )}

          {/* Video */}
          {work.video && (
            <div className="mb-10">
              {work.video.type === 'youtube' && (
                <div className="aspect-video">
                  <iframe
                    src={work.video.url}
                    title={work.title}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              )}
              {work.video.type === 'vimeo' && (
                <div className="aspect-video">
                  <iframe
                    src={work.video.url}
                    title={work.title}
                    className="w-full h-full"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              )}
              {work.video.type === 'mp4' && (
                <video controls className="w-full" preload="metadata">
                  <source src={convertDropboxUrl(work.video.url)} type="video/mp4" />
                </video>
              )}
            </div>
          )}

          {/* Description */}
          <div className="max-w-2xl mb-10">
            <p className="font-noto text-[12px] font-light leading-[2]">
              {work.description_ja}
            </p>
          </div>

          {/* Spec */}
          {(work.spec.size || work.spec.method || (work.spec.software && work.spec.software.length > 0)) && (
            <div className="border-t border-[var(--color-border)] pt-6 mb-10 max-w-2xl">
              <dl className="space-y-2">
                {work.role && (
                  <div className="flex gap-4">
                    <dt className="font-zalando text-[9px] font-light tracking-wider text-[var(--color-text-lighter)] uppercase w-24 shrink-0">Role</dt>
                    <dd className="font-zalando text-[10px] font-light">{work.role}</dd>
                  </div>
                )}
                {work.spec.size && (
                  <div className="flex gap-4">
                    <dt className="font-zalando text-[9px] font-light tracking-wider text-[var(--color-text-lighter)] uppercase w-24 shrink-0">Size</dt>
                    <dd className="font-zalando text-[10px] font-light">{work.spec.size}</dd>
                  </div>
                )}
                {work.spec.method && (
                  <div className="flex gap-4">
                    <dt className="font-zalando text-[9px] font-light tracking-wider text-[var(--color-text-lighter)] uppercase w-24 shrink-0">Method</dt>
                    <dd className="font-zalando text-[10px] font-light">{work.spec.method}</dd>
                  </div>
                )}
                {work.spec.software && work.spec.software.length > 0 && (
                  <div className="flex gap-4">
                    <dt className="font-zalando text-[9px] font-light tracking-wider text-[var(--color-text-lighter)] uppercase w-24 shrink-0">Software</dt>
                    <dd className="font-zalando text-[10px] font-light">{work.spec.software.join(', ')}</dd>
                  </div>
                )}
              </dl>
            </div>
          )}

          {/* Process */}
          {work.process_images.length > 0 && (
            <div className="mb-10">
              <h3 className="font-outfit text-[10px] font-light tracking-[0.15em] uppercase mb-6 text-[var(--color-text-light)]">
                (Design Process)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {work.process_images.map((img, i) => (
                  <LazyImage key={i} src={img} alt={`${work.title} process ${i + 1}`} aspectRatio="16/9" />
                ))}
              </div>
              {work.process_text && (
                <p className="mt-4 font-noto text-[11px] font-light leading-relaxed text-[var(--color-text-light)]">
                  {work.process_text}
                </p>
              )}
            </div>
          )}
        </div>
      )}

      {/* Navigation */}
      <div className="border-t border-[var(--color-border-light)] px-6 py-6 md:px-10 flex items-center justify-between">
        <Link
          to="/"
          className="font-outfit text-[10px] font-light tracking-wider uppercase opacity-50 hover:opacity-100 transition-opacity duration-200"
        >
          ← All works
        </Link>
        <div className="flex gap-6">
          {prevWork && (
            <Link
              to={`/work/${prevWork.id}`}
              className="font-outfit text-[10px] font-light tracking-wider opacity-50 hover:opacity-100 transition-opacity duration-200"
            >
              ← Prev
            </Link>
          )}
          {nextWork && (
            <Link
              to={`/work/${nextWork.id}`}
              className="font-outfit text-[10px] font-light tracking-wider opacity-50 hover:opacity-100 transition-opacity duration-200"
            >
              Next →
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
