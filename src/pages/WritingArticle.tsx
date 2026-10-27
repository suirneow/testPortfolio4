import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { WritingMeta } from '../types';
import { loadWritingArticle } from '../data/loader';

export default function WritingArticle() {
  const location = useLocation();
  const slug = location.pathname.replace(/^\/writing\//, '');
  const [meta, setMeta] = useState<WritingMeta | null>(null);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadWritingArticle(slug).then((data) => {
      if (data) {
        setMeta(data.meta);
        setContent(data.content);
      }
      setLoading(false);
    });
  }, [slug]);

  if (loading) {
    return (
      <div className="px-6 py-20 md:px-10">
        <p className="font-outfit text-[10px] font-light tracking-wider text-[var(--color-text-lighter)]">
          loading...
        </p>
      </div>
    );
  }

  if (!meta) {
    return (
      <div className="px-6 py-20 md:px-10">
        <p className="font-noto text-[12px] font-light">記事が見つかりませんでした。</p>
        <Link to="/writing" className="mt-4 inline-block font-outfit text-[10px] font-light tracking-wider uppercase opacity-60 hover:opacity-100">
          ← Back to writing
        </Link>
      </div>
    );
  }

  // カスタムレンダラー（動画埋め込み対応）
  const processedContent = content.replace(
    /\[video:(youtube|vimeo):([^\]]+)\]/g,
    (_, type, videoId) => {
      if (type === 'youtube') {
        return `<div class="aspect-video my-6"><iframe src="https://www.youtube.com/embed/${videoId}" class="w-full h-full" allowfullscreen></iframe></div>`;
      }
      if (type === 'vimeo') {
        return `<div class="aspect-video my-6"><iframe src="https://player.vimeo.com/video/${videoId}" class="w-full h-full" allowfullscreen></iframe></div>`;
      }
      return '';
    }
  );

  return (
    <article className="px-6 py-10 md:px-10 md:py-14">
      {/* Back link */}
      <Link
        to="/writing"
        className="font-outfit text-[10px] font-light tracking-wider uppercase opacity-50 hover:opacity-100 transition-opacity duration-200 mb-8 inline-block"
      >
        ← Writing
      </Link>

      {/* Header */}
      <header className="max-w-2xl mb-12">
        <time className="font-outfit text-[10px] font-light text-[var(--color-text-lighter)] block mb-3">
          {meta.date}
        </time>
        <h1 className="font-noto text-[18px] font-light leading-tight mb-4">
          {meta.title}
        </h1>
        {meta.tags.length > 0 && (
          <div className="flex gap-3">
            {meta.tags.map(tag => (
              <span key={tag} className="font-outfit text-[9px] font-light text-[var(--color-text-lighter)]">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* Content */}
      <div className="max-w-2xl prose-custom">
        <div dangerouslySetInnerHTML={{ __html: renderMarkdown(processedContent) }} />
      </div>
    </article>
  );
}

// シンプルなMarkdownレンダリング（dangerouslySetInnerHTML用）
function renderMarkdown(content: string): string {
  let html = content;
  
  // コードブロック
  html = html.replace(/```(\w*)\n([\s\S]*?)```/g, (_, lang, code) => {
    return `<pre class="my-4 p-4 bg-[var(--color-border-light)] overflow-x-auto"><code class="font-mono text-[11px] font-light">${escapeHtml(code.trim())}</code></pre>`;
  });
  
  // インラインコード
  html = html.replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 bg-[var(--color-border-light)] font-mono text-[11px]">$1</code>');
  
  // 見出し
  html = html.replace(/^### (.+)$/gm, '<h3 class="font-noto text-[13px] font-light mt-8 mb-3">$1</h3>');
  html = html.replace(/^## (.+)$/gm, '<h2 class="font-noto text-[14px] font-light mt-10 mb-4">$1</h2>');
  
  // 引用
  html = html.replace(/^> (.+)$/gm, '<blockquote class="border-l border-[var(--color-border)] pl-4 my-4 font-noto text-[11px] font-light text-[var(--color-text-light)] italic">$1</blockquote>');
  
  // リスト
  html = html.replace(/^- (.+)$/gm, '<li class="ml-4 text-[12px] font-light list-disc list-inside">$1</li>');
  html = html.replace(/(<li.*<\/li>\n?)+/g, '<ul class="my-3 space-y-1">$&</ul>');
  
  // 番号付きリスト
  html = html.replace(/^\d+\. (.+)$/gm, '<li class="ml-4 text-[12px] font-light list-decimal list-inside">$1</li>');
  
  // テーブル
  html = html.replace(/^\|(.+)\|$/gm, (match) => {
    const cells = match.split('|').filter(c => c.trim()).map(c => c.trim());
    if (cells.every(c => /^[-:]+$/.test(c))) return ''; // separator row
    const tag = 'td';
    return `<tr>${cells.map(c => `<${tag} class="px-3 py-1.5 border-b border-[var(--color-border-light)] text-[11px] font-light">${c}</${tag}>`).join('')}</tr>`;
  });
  html = html.replace(/(<tr>.*<\/tr>\n?)+/g, '<table class="my-4 w-full border-collapse">$&</table>');
  
  // 画像
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="my-6 max-w-full" loading="lazy" />');
  
  // リンク
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="underline decoration-[var(--color-border)] hover:decoration-[var(--color-text)] transition-colors duration-200" target="_blank" rel="noopener noreferrer">$1</a>');
  
  // 段落
  html = html.replace(/^(?!<[hulbt]|<pre|<img|<table|<tr|<block)(.+)$/gm, '<p class="my-3 text-[12px] font-light leading-[2]">$1</p>');
  
  // 空行を除去
  html = html.replace(/^\s*$/gm, '');
  
  return html;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
