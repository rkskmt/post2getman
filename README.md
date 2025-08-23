# post2getman (Tokyo Open Data API Proxy)

Cloudflare Workers + Hono で東京都オープンデータ API を簡単に叩けるプロキシ兼ビューワです。

- ルート `/` で検索フォームと使い方ガイドを表示
- `/api/:apiId/:format?` で東京都 API を POST で呼び出し、
  - ブラウザアクセス時: 視覚化付きのリッチな HTML を返却（表・地図・グラフ）
  - プログラムや `Accept: application/json` 指定時: JSON をそのまま返却
- CORS 有効（任意のオリジンからアクセス可能）

使用技術: Cloudflare Workers, Hono, TailwindCSS, Leaflet, Chart.js


## デモの流れ

1. ルート `GET /` にアクセス
2. API ID（または https://spec.api.metro.tokyo.lg.jp/spec/... の URL）を入力して取得
3. `/api/<apiId>/json?limit=100` に遷移し、表・地図・グラフでデータを可視化

例: 新型コロナ陽性者数データ
```
/api/t000001d0000000011-819fb24a2e74a5f2ea848d548c5cff7d-0/json?limit=100
```


## エンドポイント

- `GET /`
  - フロントページ（`src/routes/root.js`）
- `GET /debug`
  - 接続確認用; 都の API へテストリクエスト（`src/routes/debug.js`）
- `GET /api/:apiId/:format?`
  - メイン API（`src/routes/api.js`）
  - `:format` は `json` または `xml`（省略時 `json`）
  - 都の API へは POST で中継。クエリの一部はそのまま都の API へ、検索条件は POST ボディに組み立てます。


## クエリパラメータ

次は都の API へそのまま中継されます:
- `limit`, `offset`, `encoding`

検索条件は POST ボディに組み立てられます（`buildPostBody()` 参照）。キーは以下の形式:
- `text_<relationship>_<column>=<value>`
- `number_<relationship>_<column>=<value>`
- `date_<relationship>_<column>=<value>`
- `column=a,b,c`（取得列の指定: カンマ区切り）

例:
```
/api/<apiId>/json?limit=100&text_like_名称=中央&number_gte_件数=10
```

関係演算子（relationship）の例は東京都 API 仕様に準拠してください（`like`, `eq`, `gte`, `lte` など）。


## レスポンスと表示

- ブラウザから `json` にアクセスすると、以下のルールで可視化 HTML を返します（`generateHTML()`）。
  - 位置情報列（例: `緯度`/`経度`/`lat`/`lng`/`lon`）があれば地図表示（Leaflet）
  - 数値列（列名が「◯数」で終わり、値が数値に変換可能）を自動検出して折れ線グラフ（Chart.js）
  - データ表（すべての列をテーブル化）
  - メタデータと生 JSON 表示（折りたたみ）
- API クライアント等からのアクセスや `format=xml` では素の結果を返却


## ローカル開発

前提: Node.js と `wrangler`（devDependencies に含まれます）

1. 依存関係のインストール
```
npm install
```

2. 開発サーバ（Cloudflare Workers エミュレータ）
```
npx wrangler dev
```
- 既定では `http://localhost:8787` で起動
- エントリ: `wrangler.toml` の `main = "src/index.js"`

3. デプロイ
```
npx wrangler deploy
```

設定は `wrangler.toml` を参照（`nodejs_compat` 有効）。環境変数やシークレットは現状不要です。


## cURL 例

JSON をそのまま取得:
```
curl -X POST \
  "https://<your-worker-domain>/api/<apiId>/json?limit=100" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d "{}"
```

検索条件つき:
```
curl -X POST \
  "https://<your-worker-domain>/api/<apiId>/json?limit=100&text_like_名称=中央" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d "{}"
```


## ディレクトリ

- `src/index.js` … ルーティング定義（Hono）
- `src/routes/root.js` … トップページ（フォーム UI）
- `src/routes/api.js` … 都 API プロキシと HTML ビュー生成
- `src/routes/debug.js` … 接続確認用エンドポイント


## ライセンス

ISC（`package.json` を参照）


## 補足

- 本プロジェクトは東京都オープンデータカタログサイトの API を利用します。利用規約や制限事項は公式ドキュメントをご確認ください。
  - 仕様: https://spec.api.metro.tokyo.lg.jp/spec/
- 大量データの取得や頻繁なリクエストは控え、`limit` の調整などでご配慮ください。
