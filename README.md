# suimeow portfolio — 操作マニュアル

## サイト概要

映像作家・デザイナー 高谷隼聖 (suimeow) の個人ポートフォリオサイト。
React + Vite + Tailwind CSSで構築。GitHub Pagesで静的サイトとして動作。

コンテンツ（作品・ブログ・ログ）はJSON/Markdownで管理。コードを触らずデータファイルの追加・編集だけで更新可能。

---

## フォルダ構成

```
public/
  data/
    works/          # 作品データ
      index.json    # 作品ファイル一覧（パスの配列）
      template.json # テンプレート（コピーして使用）
      2026/
        07/         # 年月フォルダ
          work-name.json
    logs/           # マイクロブログ
      index.json
      template.json
      2026/
        07/
          2026-07-15-001.json
    writing/        # ブログ記事
      index.json
      template.md
      2026/
        06/
          article-name.md
    sandbox/        # 実験的制作物
      index.json
      2026/
        04/
          experiment.json
src/                # ソースコード（通常は編集不要）
```

---

## 作品を1件追加する手順

### 1. テンプレートをコピー
`public/data/works/template.json` をコピーし、年月フォルダ内に保存。
例: `public/data/works/2026/07/my-new-work.json`

### 2. 各項目を編集
- `id`: ユニークな識別子（URLに使用される）
- `title`: 作品タイトル
- `year`, `month`: 制作年・月
- `published`: trueで公開、falseで非表示
- `genre`: ジャンル（projection-mapping / video-installation / motion-graphics / 3dcg / graphic / interactive / other）
- `role`: 担当役割
- `caption_en`: 英語キャプション（サイズ・手法・ソフト等）
- `description_ja`: 日本語の説明文
- `spec`: サイズ・手法・使用ソフト
- `thumbnail`: サムネイル画像URL
- `images`: 詳細画像の配列
- `video`: 動画（YouTube/Vimeo/mp4）
- `layout`: "default"（全面写真レイアウト）または "spread"（見開きレイアウト）

### 3. index.jsonにパスを追加
`public/data/works/index.json` の配列に、新しいファイルのパスを追加。
```json
[
  "2026/07/my-new-work.json",
  "2026/06/existing-work.json"
]
```

### 4. ビルド & デプロイ
```bash
npm run build
# dist/ フォルダをGitHub Pagesにデプロイ
```

---

## マイクロブログ(log)を1件投稿する手順

### 最短手順

### 1. テンプレートをコピー
`public/data/logs/template.json` をコピーし、年月フォルダ内に保存。
ファイル名: `YYYY-MM-DD-001.json`（同日2件目は-002）
例: `public/data/logs/2026/07/2026-07-20-001.json`

### 2. 内容を編集
```json
{
  "id": "2026-07-20-001",
  "date": "2026-07-20T10:00:00+09:00",
  "published": true,
  "body": "ここに本文。\n改行は\\nで。\nリンクは https://example.com のまま。\nハッシュタグは #tag",
  "tags": ["tag1", "tag2"],
  "images": [],
  "video": null
}
```

### 3. index.jsonにパスを追加
`public/data/logs/index.json` の先頭に追加（新しい順）。

### 4. ビルド & デプロイ

---

## ブログ記事(writing)を1本書く手順

### 1. テンプレートをコピー
`public/data/writing/template.md` をコピーし、年月フォルダ内に保存。
例: `public/data/writing/2026/07/my-article.md`

### 2. フロントマターを編集
```markdown
---
title: "記事タイトル"
date: "2026-07-20"
tags: ["tag1", "tag2"]
thumbnail: ""
published: true
lang: "ja"
---
```

### 3. 本文をMarkdownで書く
対応記法:
- 見出し: `## 見出し2`, `### 見出し3`
- 段落: 空行で区切る
- リスト: `- 項目`
- 番号付きリスト: `1. 項目`
- リンク: `[テキスト](URL)`
- 画像: `![alt](URL)`
- 引用: `> 引用文`
- コード(インライン): `` `code` ``
- コード(ブロック): ```` ```言語名 ```` で囲む
- 表: `| 列1 | 列2 |` 形式
- 動画埋め込み: `[video:youtube:VIDEO_ID]` または `[video:vimeo:VIDEO_ID]`

### 4. index.jsonにパスを追加
`public/data/writing/index.json` の配列に追加。

### 5. ビルド & デプロイ

---

## Dropboxの画像の貼り方

### 手順

1. Dropboxに画像をアップロード
2. 共有リンクを取得
3. URLを変換:
   - `www.dropbox.com` → `dl.dropboxusercontent.com`
   - `dl=0` → `raw=1`

### 変換例
```
共有リンク:
https://www.dropbox.com/s/abc123/image.jpg?dl=0

変換後:
https://dl.dropboxusercontent.com/s/abc123/image.jpg?raw=1
```

### 注意
- サイト側で自動変換も行うが、最初から正しい形式で書くことを推奨
- Dropboxの直リンクは仕様変更で表示できなくなる可能性あり
- 画像が読み込めない場合は「no image」プレースホルダーが表示される
- 将来的にリポジトリ内の `public/images/` に画像を置く運用に変えても、JSONの書き方は同じ

---

## GitHub Pagesへの公開・更新手順

### 初回公開

1. GitHubリポジトリを作成
2. ローカルでビルド:
   ```bash
   npm run build
   ```
3. `dist/` フォルダの内容を `gh-pages` ブランチにプッシュ:
   ```bash
   git subtree push --prefix dist origin gh-pages
   ```
   または、GitHub Actionsで自動デプロイを設定。

4. リポジトリの Settings > Pages で、Source を `gh-pages` ブランチに設定

### 更新時

1. データファイル（JSON/Markdown）を編集・追加
2. ビルド:
   ```bash
   npm run build
   ```
3. デプロイ:
   ```bash
   git subtree push --prefix dist origin gh-pages
   ```

### GitHubのWeb画面だけで完結する方法
- `public/data/` 内のJSON/MarkdownファイルをWebエディタで直接編集
- ただし、ビルドが必要なので、GitHub Actionsでの自動ビルド設定を推奨

---

## デモデータの削除方法

デモデータは `_demo: true` のマーク付き。

### 削除手順

1. **作品デモの削除**:
   - `public/data/works/2026/` 内の `demo-*.json` ファイルを削除
   - `public/data/works/index.json` から該当パスを除去

2. **ログデモの削除**:
   - `public/data/logs/` 内の各年月フォルダの `*.json` を削除
   - `public/data/logs/index.json` を空の配列 `[]` に

3. **記事デモの削除**:
   - `public/data/writing/2026/` 内の `.md` ファイルを削除
   - `public/data/writing/index.json` を空の配列 `[]` に

4. **サンドボックスデモの削除**:
   - `public/data/sandbox/2026/` 内のファイルを削除
   - `public/data/sandbox/index.json` を空の配列 `[]` に

5. ビルド & デプロイ

---

## デザイン仕様

- **フォント**: Outfit（英数字・ナビゲーション）、Noto Sans JP（日本語本文）、Zalando Sans（メタ情報・フォールバック付き）
- **文字サイズ**: 9px〜18px（小さめ）
- **フォントウェイト**: Light(300)中心、Regular(400)補助
- **色**: モノクロベース（白背景、黒寄りグレー文字、グレー数段階の補助色）
- **動き**: リニア（等速）、短い時間、意味のある箇所のみ
- **グリッド**: PC=3列、タブレット=2列、スマホ=1列

---

## 技術メモ

- HashRouter使用（GitHub Pages対応）
- データファイルはpublic/内に配置（ビルド時にdist/にコピー）
- 画像は遅延読み込み（loading="lazy"）
- Dropbox URLは自動変換（www.dropbox.com → dl.dropboxusercontent.com）
- 画像読み込み失敗時はプレースホルダー表示
