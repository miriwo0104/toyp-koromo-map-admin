# toyp-koromo-map-admin

トイプードル「ころも」のおでかけスポットを管理する管理サイトです。

## 技術スタック

- **Next.js 16** (App Router)
- **TypeScript**
- **Tailwind CSS v4**
- **Supabase** (DB / Auth)
- **Cloudflare R2** (画像ストレージ)

## 開発環境のセットアップ

```bash
npm install
cp .env.local.example .env.local  # 環境変数を設定
npm run dev
```

<http://localhost:3001> で起動します。

## 環境変数

| 変数名 | 説明 |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase プロジェクト URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon キー |
| `DATABASE_URL` | PostgreSQL 接続文字列（Session Pooler URL） |

## コマンド

```bash
npm run dev          # 開発サーバー起動 (port 3001)
npm run build        # プロダクションビルド
npm run test         # テスト実行
npm run test:watch   # テスト監視モード
npm run lint         # Lint チェック
npm run db:generate  # スキーマ変更からマイグレーション SQL を生成
npm run db:migrate   # マイグレーションを DB に適用
npm run db:seed      # ダミーデータを投入（開発用）
npm run db:studio    # Drizzle Studio でDBを GUI 確認
```

## ログインユーザーの管理

管理サイトは **Supabase Authentication** でログインを管理しています。
ログインできるユーザーは Supabase ダッシュボードから手動で作成・削除します。
公開のサインアップ画面は意図的に設けていません（不正アクセス防止）。

### ユーザーを追加する

1. [Supabase ダッシュボード](https://supabase.com) にログイン
2. **Authentication → Users → Add user → Create new user**
3. メールアドレスとパスワードを入力して作成

### ユーザーを削除する

1. **Authentication → Users** でユーザーを選択
2. **Delete user** をクリック

## スキーマ変更の手順

```bash
# 1. db/schema.ts を編集
# 2. マイグレーションファイルを生成
npm run db:generate

# 3. DB に適用
npm run db:migrate
```

生成されたマイグレーション SQL（`db/migrations/`）は必ず git にコミットしてください。

## 関連リポジトリ

- [toyp-koromo-map-web](https://github.com/miriwo0104/toyp-koromo-map-web) — メインサイト (port 3000)
