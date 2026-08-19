# 一歩ログ（プロトタイプ）

信仰実践の学習・振り返りを記録するための、Vite + React製プロトタイプです。

公開URL: https://mshoichi47-sys.github.io/ippo-log/

## 開発

```bash
npm install
npm run dev      # ローカル開発サーバー
npm run build    # dist/ にビルド
```

## デプロイ

`main` にはソースのみを置いています。`npm run build` で `dist/` を作り、その中身を `gh-pages` ブランチのルートにpushするとGitHub Pagesに反映されます。

## 注意

- ローカルストレージ等へのデータ保存は行っていないプロトタイプです（ページを閉じると入力内容は失われます）
- サンプル・プロトタイプ用途のため、`robots: noindex, nofollow` を設定しています
