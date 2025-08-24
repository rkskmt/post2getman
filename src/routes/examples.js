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
            <a href="/api/t131083d0000000019-791f4c491fa2d1bded935e66cc1972d2-0/json" class="block glass p-4 rounded-xl hover:bg-white/10 transition-colors">
              <h3 class="text-lg font-semibold text-white">① 公衆トイレ一覧</h3>
              <p class="text-white/80 text-sm mt-1">【江東区】公衆トイレ一覧データを表示</p>
            </a>
            <a href="/api/t000021d0000000025-2805da37dd6afb275db514a2a14b8ba9-0/json" class="block glass p-4 rounded-xl hover:bg-white/10 transition-colors">
              <h3 class="text-lg font-semibold text-white">② 東京都指定史跡データ一覧</h3>
              <p class="text-white/80 text-sm mt-1">東京都の指定史跡データを表示</p>
            </a>
            <a href="/api/t131105d0000000028-2dabf61b5f81d284d8eb355f9e5a41be-0/json" class="block glass p-4 rounded-xl hover:bg-white/10 transition-colors">
              <h3 class="text-lg font-semibold text-white">③ 地域避難所 指定緊急避難所</h3>
              <p class="text-white/80 text-sm mt-1">地震、水害、土砂災害等における目黒区内の避難所の一覧データを表示</p>
            </a>
            <a href="/api/t131148d0000000034-cc58684fcf354afe92b3f649b3378685-0/json" class="block glass p-4 rounded-xl hover:bg-white/10 transition-colors">
              <h3 class="text-lg font-semibold text-white">④ 土砂災害特別警戒区域</h3>
              <p class="text-white/80 text-sm mt-1">中野区内にある土砂災害特別警戒区域の一覧データを表示</p>
            </a>
            <a href="/api/t131059d0206080001-e39f12220d36c14606f2fa95856e4dd5-0/json" class="block glass p-4 rounded-xl hover:bg-white/10 transition-colors">
              <h3 class="text-lg font-semibold text-white">⑤ 保育園</h3>
              <p class="text-white/80 text-sm mt-1">文京区の保育園の一覧データを表示</p>
            </a>
            <a href="/api/t000018d0000000027-e2b7844cb651419203c6d52703530f52-0/json" class="block glass p-4 rounded-xl hover:bg-white/10 transition-colors">
              <h3 class="text-lg font-semibold text-white">⑥ 都営地下鉄　窓口一覧 三田線 > 駅一覧</h3>
              <p class="text-white/80 text-sm mt-1">都営地下鉄　窓口一覧データを表示</p>
            </a>
            <a href="/api/t131083d0000000027-d26151caf1370dd6c31d8931a2d8d189-0/json" class="block glass p-4 rounded-xl hover:bg-white/10 transition-colors">
              <h3 class="text-lg font-semibold text-white">⑦ AED設置箇所一覧</h3>
              <p class="text-white/80 text-sm mt-1">江東区のAED設置箇所一覧データを表示</p>
            </a>
            <a href="/api/t131105d0000000022-a2e9f9de06700f7006d7aaebc9526ed6-0/json" class="block glass p-4 rounded-xl hover:bg-white/10 transition-colors">
              <h3 class="text-lg font-semibold text-white">⑧ 町丁別・年齢別・男女別人口および町丁別世帯数</h3>
              <p class="text-white/80 text-sm mt-1">住民基本台帳データを表示</p>
            </a>
            <a href="/api/t131164d0000000010-b1a0680aebbc5d8b102d9705f880ce7d-0/json" class="block glass p-4 rounded-xl hover:bg-white/10 transition-colors">
              <h3 class="text-lg font-semibold text-white">⑨ 公共施設一覧</h3>
              <p class="text-white/80 text-sm mt-1">豊島区が公開しているデータを表示</p>
            </a>
            <a href="/api/t131202d0000000102-f063bc9113ef741c8a67d23cf13a03ad-0/json" class="block glass p-4 rounded-xl hover:bg-white/10 transition-colors">
              <h3 class="text-lg font-semibold text-white">⑩ 公共駐車場</h3>
              <p class="text-white/80 text-sm mt-1">練馬区が公開しているデータを表示</p>
            </a>
          </div>
        </div>
      </div>
    </body>
    </html>
  `)
}
