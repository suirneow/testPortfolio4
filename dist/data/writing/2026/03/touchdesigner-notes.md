---
title: "TouchDesigner メモ"
date: "2026-03-15"
tags: ["TouchDesigner", "technical", "notes"]
thumbnail: ""
published: true
lang: "ja"
---

## CHOPの使い方メモ

TouchDesignerでよく使うCHOPのオペレーターまとめ。

### Math CHOP

値の範囲を変換するときに使う。

```
Range: 0-1 → 0-100
Channel: /project/width
```

### Noise CHOP

ランダムな動きを作るときに便利。

- Type: Perlin
- Frequency: 0.5
- Amplitude: 1.0

## パーティクルのテスト

Particle Emitter SOPを使って、シンプルなパーティクルシステムを組んだ。

1. Noise TOPでフィールドを作る
2. Particle Emit SOPで粒子を生成
3. Geometry COMPで表示

> パーティクルの数を増やしすぎると、逆にパターンが見えてきて面白くない。適切な「曖昧さ」が大事。

## 参考リンク

- [Derivative公式ドキュメント](https://docs.derivative.ca/)
- [TouchDesigner入門](https://example.com/td-tutorial)
