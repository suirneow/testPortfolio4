import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { WritingMeta } from '../types';
import { loadWritingList } from '../data/loader';

export default function Writing() {
  const [articles, setArticles] = useState<WritingMeta[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadWritingList().then((data) => {
      setArticles(data);
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
      <h1 className="font-outfit text-[11px] font-light tracking-[0.15em] uppercase mb-10 text-[var(--color-text-light)]">
        Writing
      </h1>

      <div className="space-y-0">
        {articles.map((article) => (
          <Link
            key={article.slug}
            to={`/writing/${article.slug}`}
            className="block border-t border-[var(--color-border-light)] py-5 group"
          >
            <div className="flex items-baseline gap-6">
              <time className="font-outfit text-[10px] font-light text-[var(--color-text-lighter)] shrink-0 w-20">
                {article.date}
              </time>
              <h2 className="font-noto text-[12px] font-light leading-tight group-hover:opacity-60 transition-opacity duration-200">
                {article.title}
                {article._demo && (
                  <span className="ml-2 font-outfit text-[8px] tracking-wider text-[var(--color-text-lighter)] uppercase">
                    demo
                  </span>
                )}
              </h2>
            </div>
            {article.tags.length > 0 && (
              <div className="mt-1.5 ml-26 flex gap-2">
                {article.tags.map(tag => (
                  <span key={tag} className="font-outfit text-[9px] font-light text-[var(--color-text-lighter)]">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </Link>
        ))}
      </div>
      {articles.length > 0 && (
        <div className="border-t border-[var(--color-border-light)]" />
      )}
    </div>
  );
}
