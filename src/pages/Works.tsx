import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Work } from '../types';
import { loadWorks } from '../data/loader';
import LazyImage from '../components/LazyImage';

const genreLabels: Record<string, string> = {
  'projection-mapping': 'Projection Mapping',
  'video-installation': 'Video Installation',
  'motion-graphics': 'Motion Graphics',
  '3dcg': '3DCG',
  'graphic': 'Graphic',
  'interactive': 'Interactive',
  'other': 'Other',
};

export default function Works() {
  const [works, setWorks] = useState<Work[]>([]);
  const [filter, setFilter] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadWorks().then((data) => {
      setWorks(data);
      setLoading(false);
    });
  }, []);

  const genres = [...new Set(works.map(w => w.genre))];
  const filteredWorks = filter === 'all' ? works : works.filter(w => w.genre === filter);

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
      {/* Genre filter */}
      {genres.length > 1 && (
        <div className="mb-10 flex flex-wrap gap-4">
          <button
            onClick={() => setFilter('all')}
            className={`font-outfit text-[10px] font-light tracking-[0.1em] uppercase transition-opacity duration-200 ${
              filter === 'all' ? 'opacity-100' : 'opacity-40 hover:opacity-70'
            }`}
          >
            All
          </button>
          {genres.map(g => (
            <button
              key={g}
              onClick={() => setFilter(g)}
              className={`font-outfit text-[10px] font-light tracking-[0.1em] uppercase transition-opacity duration-200 ${
                filter === g ? 'opacity-100' : 'opacity-40 hover:opacity-70'
              }`}
            >
              {genreLabels[g] || g}
            </button>
          ))}
        </div>
      )}

      {/* Works grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
        {filteredWorks.map((work) => (
          <Link
            key={work.id}
            to={`/work/${work.id}`}
            className="group block"
          >
            <LazyImage
              src={work.thumbnail}
              alt={work.title}
              className="mb-3"
              aspectRatio="4/3"
            />
            <div className="flex items-baseline justify-between">
              <h2 className="font-noto text-[12px] font-light leading-tight">
                {work.title}
                {work._demo && (
                  <span className="ml-2 font-outfit text-[8px] tracking-wider text-[var(--color-text-lighter)] uppercase">
                    demo
                  </span>
                )}
              </h2>
              <span className="font-outfit text-[10px] font-light text-[var(--color-text-lighter)]">
                {work.year}
              </span>
            </div>
            <p className="mt-1 font-zalando text-[9px] font-light text-[var(--color-text-lighter)] leading-relaxed">
              {work.caption_en}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
