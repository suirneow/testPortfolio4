export interface WorkSpec {
  size?: string;
  method?: string;
  software?: string[];
}

export interface WorkVideo {
  type: 'youtube' | 'vimeo' | 'mp4';
  url: string;
}

export interface Work {
  id: string;
  title: string;
  year: number;
  month: number;
  published: boolean;
  genre: string;
  role: string;
  caption_en: string;
  description_ja: string;
  spec: WorkSpec;
  thumbnail: string;
  images: string[];
  video: WorkVideo | null;
  process_images: string[];
  process_text: string;
  layout: 'default' | 'spread';
  _demo?: boolean;
}

export interface LogEntry {
  id: string;
  date: string;
  published: boolean;
  body: string;
  tags: string[];
  images: string[];
  video: { type: string; url: string } | null;
  _demo?: boolean;
}

export interface WritingMeta {
  title: string;
  date: string;
  tags: string[];
  thumbnail: string;
  published: boolean;
  lang: string;
  slug: string;
  _demo?: boolean;
}

export interface SandboxItem {
  id: string;
  title: string;
  year: number;
  month: number;
  published: boolean;
  description_ja: string;
  tags: string[];
  thumbnail: string;
  images: string[];
  video: { type: string; url: string } | null;
  _demo?: boolean;
}
