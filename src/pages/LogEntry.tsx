import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { LogEntry } from '../types';
import { loadLog, convertDropboxUrl } from '../data/loader';
import LazyImage from '../components/LazyImage';

export default function LogEntryPage() {
  const { id } = useParams<{ id: string }>();
  const [log, setLog] = useState<LogEntry | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLog(id!).then((data) => {
      setLog(data);
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

  if (!log) {
    return (
      <div className="px-6 py-20 md:px-10">
        <p className="font-noto text-[12px] font-light">投稿が見つかりませんでした。</p>
        <Link to="/log" className="mt-4 inline-block font-outfit text-[10px] font-light tracking-wider uppercase opacity-60 hover:opacity-100">
          ← Back to log
        </Link>
      </div>
    );
  }

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  // 本文のレンダリング
  const renderBody = (body: string) => {
    const parts = body.split(/(https?:\/\/[^\s]+|#[\w-]+)/g);
    return parts.map((part, i) => {
      if (part.match(/^https?:\/\//)) {
        return (
          <a key={i} href={part} target="_blank" rel="noopener noreferrer" className="underline decoration-[var(--color-border)]">
            {part}
          </a>
        );
      }
      if (part.startsWith('#')) {
        return <span key={i} className="text-[var(--color-text-light)]">{part}</span>;
      }
      return <span key={i}>{part.split('\n').map((line, j, arr) => (
        j < arr.length - 1 ? <span key={j}>{line}<br /></span> : <span key={j}>{line}</span>
      ))}</span>;
    });
  };

  return (
    <div className="px-6 py-10 md:px-10 md:py-14">
      <Link
        to="/log"
        className="font-outfit text-[10px] font-light tracking-wider uppercase opacity-50 hover:opacity-100 transition-opacity duration-200 mb-8 inline-block"
      >
        ← Log
      </Link>

      <article className="max-w-xl">
        <time className="font-outfit text-[10px] font-light text-[var(--color-text-lighter)] block mb-4">
          {formatDate(log.date)}
        </time>
        <div className="font-noto text-[12px] font-light leading-[2] mb-4">
          {renderBody(log.body)}
        </div>
        {/* Images */}
        {log.images.length > 0 && (
          <div className="grid grid-cols-2 gap-3 mt-4">
            {log.images.map((img, i) => (
              <LazyImage key={i} src={img} alt="" aspectRatio="1/1" />
            ))}
          </div>
        )}
        {/* Video */}
        {log.video && (
          <div className="mt-4 aspect-video max-w-md">
            {log.video.type === 'youtube' && (
              <iframe src={log.video.url} className="w-full h-full" allowFullScreen />
            )}
          </div>
        )}
        {/* Tags */}
        {log.tags.length > 0 && (
          <div className="mt-4 flex gap-3">
            {log.tags.map(tag => (
              <span key={tag} className="font-outfit text-[9px] font-light text-[var(--color-text-lighter)]">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </article>
    </div>
  );
}
