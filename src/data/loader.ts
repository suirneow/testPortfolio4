import { Work, LogEntry, WritingMeta, SandboxItem } from '../types';

// Dropbox共有リンクを直接参照用URLに変換
export function convertDropboxUrl(url: string): string {
  if (!url) return '';
  // www.dropbox.com → dl.dropboxusercontent.com
  // dl=0 → raw=1
  return url
    .replace('www.dropbox.com', 'dl.dropboxusercontent.com')
    .replace('dl=0', 'raw=1');
}

// 作品一覧を読み込み
export async function loadWorks(): Promise<Work[]> {
  const indexRes = await fetch('./data/works/index.json');
  const paths: string[] = await indexRes.json();
  
  const works = await Promise.all(
    paths.map(async (path) => {
      const res = await fetch(`./data/works/${path}`);
      return res.json() as Promise<Work>;
    })
  );
  
  return works
    .filter(w => w.published)
    .sort((a, b) => {
      const dateA = a.year * 100 + a.month;
      const dateB = b.year * 100 + b.month;
      return dateB - dateA; // 新しい順
    });
}

// 単一作品を読み込み
export async function loadWork(id: string): Promise<Work | null> {
  const indexRes = await fetch('./data/works/index.json');
  const paths: string[] = await indexRes.json();
  
  for (const path of paths) {
    const res = await fetch(`./data/works/${path}`);
    const work: Work = await res.json();
    if (work.id === id && work.published) {
      return work;
    }
  }
  return null;
}

// ログ一覧を読み込み
export async function loadLogs(): Promise<LogEntry[]> {
  const indexRes = await fetch('./data/logs/index.json');
  const paths: string[] = await indexRes.json();
  
  const logs = await Promise.all(
    paths.map(async (path) => {
      const res = await fetch(`./data/logs/${path}`);
      return res.json() as Promise<LogEntry>;
    })
  );
  
  return logs
    .filter(l => l.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

// 単一ログを読み込み
export async function loadLog(id: string): Promise<LogEntry | null> {
  const indexRes = await fetch('./data/logs/index.json');
  const paths: string[] = await indexRes.json();
  
  for (const path of paths) {
    const res = await fetch(`./data/logs/${path}`);
    const log: LogEntry = await res.json();
    if (log.id === id && log.published) {
      return log;
    }
  }
  return null;
}

// 記事一覧を読み込み
export async function loadWritingList(): Promise<WritingMeta[]> {
  const indexRes = await fetch('./data/writing/index.json');
  const paths: string[] = await indexRes.json();
  
  const articles: WritingMeta[] = [];
  
  for (const path of paths) {
    const res = await fetch(`./data/writing/${path}`);
    const text = await res.text();
    const meta = parseFrontMatter(text);
    if (meta.published) {
      articles.push({ ...meta, slug: path.replace('.md', '') });
    }
  }
  
  return articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

// 記事本文を読み込み
export async function loadWritingArticle(slug: string): Promise<{ meta: WritingMeta; content: string } | null> {
  try {
    const res = await fetch(`./data/writing/${slug}.md`);
    const text = await res.text();
    const meta = parseFrontMatter(text);
    const content = meta.content;
    return { meta: { ...meta, slug }, content };
  } catch {
    return null;
  }
}

// フロントマターをパース
function parseFrontMatter(text: string): any {
  const match = text.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { title: '', date: '', tags: [], thumbnail: '', published: true, lang: 'ja', content: text };
  
  const frontMatter = match[1];
  const content = match[2];
  
  const meta: any = { content };
  
  frontMatter.split('\n').forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex === -1) return;
    const key = line.slice(0, colonIndex).trim();
    let value: any = line.slice(colonIndex + 1).trim();
    
    // 配列の解析
    if (value.startsWith('[') && value.endsWith(']')) {
      value = value.slice(1, -1).split(',').map((s: string) => s.trim().replace(/^["']|["']$/g, ''));
    }
    // 真偽値
    else if (value === 'true') value = true;
    else if (value === 'false') value = false;
    // 文字列のクォートを除去
    else value = value.replace(/^["']|["']$/g, '');
    
    meta[key] = value;
  });
  
  return meta;
}

// サンドボックス一覧を読み込み
export async function loadSandbox(): Promise<SandboxItem[]> {
  const indexRes = await fetch('./data/sandbox/index.json');
  const paths: string[] = await indexRes.json();
  
  const items = await Promise.all(
    paths.map(async (path) => {
      const res = await fetch(`./data/sandbox/${path}`);
      return res.json() as Promise<SandboxItem>;
    })
  );
  
  return items
    .filter(i => i.published)
    .sort((a, b) => {
      const dateA = a.year * 100 + a.month;
      const dateB = b.year * 100 + b.month;
      return dateB - dateA;
    });
}
