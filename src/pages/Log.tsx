import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LogEntry } from '../types';
import { loadLogs, convertDropboxUrl } from '../data/loader';
import LazyImage from '../components/LazyImage';

const ITEMS_PER_PAGE = 10;

export default function Log() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [filterTag, setFilterTag] = useState<string | null>(null);

  useEffect(() => {
    loadLogs().then((data) => {
      setLogs(data);
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

  // 全タグを取得
  const allTags = [...new Set(logs.flatMap(l => l.tags))];
  
  // フィルタリング
  const filteredLogs = filterTag
    ? logs.filter(l => l.tags.includes(filterTag))
    : logs;
  
  const visibleLogs = filteredLogs.slice(0, visibleCount);
  const hasMore = visibleCount < filteredLogs.length;

  // 日付フォーマット
  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('ja-JP', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  // 本文のレンダリング（改行・リンク・ハッシュタグ対応）
  const renderBody = (body: string) => {
    // リンクを抽出
    const parts = body.split(/(https?:\/\/[^\s]+|#[\w-]+)/g);
    return parts.map((part, i) => {
      if (part.match(/^https?:\/\//)) {
        return (
          <a
            key={i}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-[var(--color-border)] hover:decoration-[var(--color-text)] transition-colors duration-200"
          >
            {part}
          </a>
        );
      }
      if (part.startsWith('#')) {
        const tag = part.slice(1);
        return (
          <button
            key={i}
            onClick={() => setFilterTag(tag)}
            className="text-[var(--color-text-light)] hover:text-[var(--color-text)] transition-colors duration-200"
          >
            {part}
          </button>
        );
      }
      // 改行処理
      return <span key={i}>{part.split('\n').map((line, j, arr) => (
        j < arr.length - 1 ? <span key={j}>{line}<br /></span> : <span key={j}>{line}</span>
      ))}</span>;
    });
  };

  return (
    <div className="px-6 py-10 md:px-10 md:py-14">
      <div className="flex items-center justify-between mb-10">
        <h1 className="font-outfit text-[11px] font-light tracking-[0.15em] uppercase text-[var(--color-text-light)]">
          Log
        </h1>
        {filterTag && (
          <button
            onClick={() => setFilterTag(null)}
            className="font-outfit text-[9px] font-light tracking-wider text-[var(--color-text-lighter)] hover:text-[var(--color-text)] transition-colors duration-200"
          >
            #{filterTag} ×
          </button>
        )}
      </div>

      {/* Tag filter */}
      {allTags.length > 0 && !filterTag && (
        <div className="mb-8 flex flex-wrap gap-3">
          {allTags.slice(0, 12).map(tag => (
            <button
              key={tag}
              onClick={() => setFilterTag(tag)}
              className="font-outfit text-[9px] font-light text-[var(--color-text-lighter)] hover:text-[var(--color-text)] transition-colors duration-200"
            >
              #{tag}
            </button>
          ))}
        </div>
      )}

      {/* Log entries */}
      <div className="max-w-xl space-y-0">
        {visibleLogs.map((log) => (
          <div key={log.id} className="border-t border-[var(--color-border-light)] py-5">
            <div className="flex items-baseline gap-4 mb-2">
              <Link
                to={`/log/${log.id}`}
                className="font-outfit text-[9px] font-light text-[var(--color-text-lighter)] hover:text-[var(--color-text)] transition-colors duration-200"
              >
                {formatDate(log.date)}
              </Link>
              {log._demo && (
                <span className="font-outfit text-[8px] tracking-wider text-[var(--color-text-lighter)] uppercase">
                  demo
                </span>
              )}
            </div>
            <div className="font-noto text-[11px] font-light leading-[1.9] mb-2">
              {renderBody(log.body)}
            </div>
            {/* Images */}
            {log.images.length > 0 && (
              <div className="flex gap-2 mt-3">
                {log.images.map((img, i) => (
                  <LazyImage
                    key={i}
                    src={img}
                    alt=""
                    className="w-24 h-24 shrink-0"
                    aspectRatio="1/1"
                  />
                ))}
              </div>
            )}
            {/* Video */}
            {log.video && (
              <div className="mt-3 aspect-video max-w-sm">
                {log.video.type === 'youtube' && (
                  <iframe
                    src={log.video.url}
                    className="w-full h-full"
                    allowFullScreen
                  />
                )}
              </div>
            )}
            {/* Tags */}
            {log.tags.length > 0 && (
              <div className="mt-2 flex gap-2">
                {log.tags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => setFilterTag(tag)}
                    className="font-outfit text-[8px] font-light text-[var(--color-text-lighter)] hover:text-[var(--color-text)] transition-colors duration-200"
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredLogs.length > 0 && (
        <div className="border-t border-[var(--color-border-light)]" />
      )}

      {/* Load more */}
      {hasMore && (
        <div className="mt-8">
          <button
            onClick={() => setVisibleCount(v => v + ITEMS_PER_PAGE)}
            className="font-outfit text-[10px] font-light tracking-wider text-[var(--color-text-lighter)] hover:text-[var(--color-text)] transition-colors duration-200"
          >
            More ↓
          </button>
        </div>
      )}
    </div>
  );
}
