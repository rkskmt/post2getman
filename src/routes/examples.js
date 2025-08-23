import { tailwindCss } from '../styles/tailwind.css.js'

// おすすめ（使用例）ページのハンドラ
export const examplesHandler = (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="ja">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>おすすめ - post2getman</title>
      <style>${tailwindCss}</style>
      <style>
        .glass { background: rgba(255, 255, 255, 0.25); backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.18); }
        .gradient-bg { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
        .hover-scale { transition: transform 0.2s ease; }
        .hover-scale:hover { transform: scale(1.02); }
      </style>
    </head>
    <body class="min-h-screen gradient-bg">
      <div class="container mx-auto p-6 max-w-4xl">
        <!-- Header with Tabs (links) -->
        <header class="sticky top-0 z-10 bg-gradient-to-r from-blue-600/90 to-purple-600/90 backdrop-blur-md rounded-b-2xl shadow-lg mb-8">
          <div class="text-center pt-6">
            <h1 class="text-3xl md:text-4xl font-bold text-white mb-2">
              <span class="mr-2" aria-hidden="true" title="POST to GET transformer">📮→💁</span>post2getman
            </h1>
            <p class="text-white/80 text-base md:text-lg mb-1">東京都オープンデータAPIをget</p>
          </div>
          <nav class="flex justify-center mt-4 pb-4 gap-2">
            <a href="/" class="px-6 py-2 font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-l-lg">ホーム</a>
            <a href="/examples" class="px-6 py-2 font-medium text-white bg-emerald-500 hover:bg-emerald-600 rounded-r-lg">おすすめ</a>
          </nav>
        </header>

        <!-- おすすめリンクのみのシンプルなビュー -->
        <div class="glass rounded-2xl p-8 mb-6">
          <h2 class="text-xl font-semibold text-white mb-6">⭐ おすすめのデータセット（リンク集）</h2>
          <div class="space-y-4">
            <a href="/api/t000001d0000000011-819fb24a2e74a5f2ea848d548c5cff7d-0/json" class="block glass p-4 rounded-xl hover:bg-white/10 transition-colors">
              <h3 class="text-lg font-semibold text-white">① 東京都の人口（総数）</h3>
              <p class="text-white/80 text-sm mt-1">東京都の総人口推移データを表示</p>
            </a>
            <a href="/api/t000001d0000000021-0b7f3e6a5c1d8f9e2a4b6c8d0e5f7a9b3/json" class="block glass p-4 rounded-xl hover:bg-white/10 transition-colors">
              <h3 class="text-lg font-semibold text-white">② 東京都の気象データ</h3>
              <p class="text-white/80 text-sm mt-1">最新の気象観測データを表示</p>
            </a>
            <a href="/api/t000001d0000000031-9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3/json" class="block glass p-4 rounded-xl hover:bg-white/10 transition-colors">
              <h3 class="text-lg font-semibold text-white">③ 東京都の観光スポット</h3>
              <p class="text-white/80 text-sm mt-1">人気の観光地情報を表示</p>
            </a>
          </div>
        </div>
      </div>
    </body>
    </html>
  `)
}
