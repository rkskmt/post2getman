// ルートページのハンドラ
export const rootHandler = (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="ja">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Tokyo Open Data API Proxy</title>
      <script src="https://cdn.tailwindcss.com"></script>
      <style>
        .glass {
          background: rgba(255, 255, 255, 0.25);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.18);
        }
        .gradient-bg {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        .hover-scale {
          transition: transform 0.2s ease;
        }
        .hover-scale:hover {
          transform: scale(1.02);
        }
        .floating {
          animation: float 6s ease-in-out infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      </style>
    </head>
    <body class="min-h-screen gradient-bg">
      <div class="container mx-auto p-6 max-w-4xl">
        
        <!-- Hero Section -->
        <div class="text-center mb-8 floating">
          <h1 class="text-4xl font-bold text-white mb-4">🗾 Tokyo Open Data Explorer</h1>
          <p class="text-white/80 text-lg">東京都オープンデータを美しく可視化</p>
        </div>
        
        <!-- Main Form -->
        <div class="glass rounded-2xl p-8 mb-6 hover-scale">
          <h2 class="text-xl font-semibold text-white mb-6">📊 データを探索</h2>
          
          <form onsubmit="handleSubmit(event)" class="space-y-6">
            <div>
              <label class="block text-sm font-medium text-white/90 mb-3">API ID または 東京都仕様ページURL</label>
              <input 
                type="text" 
                id="apiInput" 
                placeholder="t000001d0000000011-819fb24a2e74a5f2ea848d548c5cff7d-0 または https://spec.api.metro.tokyo.lg.jp/spec/..."
                value="t000001d0000000011-819fb24a2e74a5f2ea848d548c5cff7d-0"
                class="w-full px-4 py-3 bg-white/20 backdrop-blur text-white placeholder-white/60 border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
              />
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-white/90 mb-3">取得件数</label>
                <input 
                  type="number" 
                  id="limit" 
                  placeholder="100"
                  value="100"
                  min="1"
                  max="1000"
                  class="w-full px-4 py-3 bg-white/20 backdrop-blur text-white placeholder-white/60 border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/50"
                />
              </div>
              <div class="flex items-end">
                <button 
                  type="submit"
                  class="w-full bg-gradient-to-r from-emerald-500 to-blue-500 text-white px-6 py-3 rounded-xl hover:from-emerald-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-200 font-semibold"
                >
                  🚀 データを取得
                </button>
              </div>
            </div>
          </form>
        </div>
        
        <!-- Info Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div class="glass rounded-xl p-6 hover-scale">
            <h3 class="text-lg font-semibold text-white mb-3">🔍 API検索</h3>
            <p class="text-white/80 mb-4">利用可能なAPIを東京都公式サイトで検索</p>
            <a 
              href="https://spec.api.metro.tokyo.lg.jp/spec/search" 
              target="_blank"
              class="inline-block bg-white/20 text-white px-4 py-2 rounded-lg hover:bg-white/30 transition-colors"
            >
              API検索ページ →
            </a>
          </div>
          
          <div class="glass rounded-xl p-6 hover-scale">
            <h3 class="text-lg font-semibold text-white mb-3">📈 機能</h3>
            <div class="text-white/80 space-y-2">
              <p>• 📊 数値データ → グラフ化</p>
              <p>• 🗺️ 位置情報 → マップ表示</p>
              <p>• 📱 レスポンシブ対応</p>
            </div>
          </div>
        </div>
        
        <!-- Usage Examples -->
        <div class="glass rounded-xl p-6">
          <h3 class="text-lg font-semibold text-white mb-4">💡 使用例</h3>
          <div class="space-y-3 text-sm">
            <div class="bg-black/20 rounded-lg p-3">
              <p class="text-white/60 mb-1">新型コロナ陽性者数データ:</p>
              <code class="text-emerald-300">t000001d0000000011-819fb24a2e74a5f2ea848d548c5cff7d-0</code>
            </div>
            <div class="bg-black/20 rounded-lg p-3">
              <p class="text-white/60 mb-1">避難所位置情報:</p>
              <code class="text-emerald-300">t131091d0000000001-3f9091b43cf1caa550e7152b5c2ba34c-0</code>
            </div>
          </div>
        </div>
        
      </div>
      
      <script>
        function extractApiId(input) {
          // URLの場合、API IDを抽出
          const urlMatch = input.match(/spec\\/([^?]+)/);
          if (urlMatch) {
            return urlMatch[1];
          }
          // そのままAPI IDの場合
          return input.trim();
        }
        
        function handleSubmit(event) {
          event.preventDefault();
          const apiInput = document.getElementById('apiInput').value;
          const limit = document.getElementById('limit').value;
          
          const apiId = extractApiId(apiInput);
          
          if (apiId) {
            const url = '/api/' + apiId + '/json?limit=' + (limit || 100);
            window.location.href = url;
          }
        }
      </script>
    </body>
    </html>
  `)
}
