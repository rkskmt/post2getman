import { tailwindCss } from '../styles/tailwind.css.js'

// ルートページのハンドラ
export const rootHandler = (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="ja">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>post2getman</title>
      <style>${tailwindCss}</style>
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
        /* Ensure input text remains visible on paste/autofill */
        input, input:focus, input::placeholder {
          color: #111;
        }
        input::placeholder { color: #6b7280; }
        input::selection { background: rgba(59,130,246,.35); color: #111; }
        /* Safari/Chrome autofill */
        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus {
          -webkit-text-fill-color: #111 !important;
          box-shadow: 0 0 0px 1000px #ffffff inset !important;
          transition: background-color 9999s ease-in-out 0s;
        }
      </style>
    </head>
    <body class="min-h-screen gradient-bg">
      <div class="container mx-auto p-6 max-w-4xl">
        
        <!-- Header with Tabs -->
        <header class="sticky top-0 z-10 bg-gradient-to-r from-blue-600/90 to-purple-600/90 backdrop-blur-md rounded-b-2xl shadow-lg mb-8">
          <div class="text-center pt-6">
            <h1 class="text-4xl font-bold text-white mb-2">
              <span class="mr-2" aria-hidden="true" title="POST to GET transformer">📮→💁</span>post2getman
            </h1>
            <p class="text-white/80 text-lg mb-1">東京都オープンデータAPIをget</p>
          </div>

          <!-- Tab Navigation -->
          <nav class="flex justify-center mt-4 pb-4 gap-2">
            <a href="/" class="px-6 py-2 font-medium text-white bg-emerald-500 hover:bg-emerald-600 rounded-l-lg">ホーム</a>
            <a href="/examples" class="px-6 py-2 font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-r-lg">おすすめ</a>
          </nav>
        </header>
        
        <!-- Home Content (default) -->
        <div id="homeContent">
          <!-- What is this? Section -->
          <div class="glass rounded-2xl p-6 mb-6 hover-scale">
            <h2 class="text-xl font-semibold text-white mb-4">❓ これは何？</h2>
            <p class="text-white/80 mb-4">
              post2getmanは、東京都が提供するオープンデータAPIに簡単にアクセスするためのツールです。
              API IDを入力するだけで、データを簡単に取得・確認できます。
            </p>
            <p class="text-white/80">
              東京都公式サイトでAPIを検索し、見つけたAPIのIDを入力してデータを取得しましょう。
            </p>
          </div>
          
          <!-- Data Input Section (single simple card with 1-2-3) -->
          <div class="mb-6">
            <form id="searchForm" onsubmit="handleSubmit(event)">
              <div class="glass rounded-2xl p-6 space-y-6 hover-scale">
                <!-- 1. Input -->
                <div>
                  <h3 class="text-base font-semibold text-white mb-3">API IDを入力</h3>
                  <label class="block text-sm font-medium text-white/90 mb-2">API ID または 東京都仕様ページURL</label>
                  <input 
                    type="text" 
                    id="apiInput" 
                    placeholder="t000001d0000000011-... または https://spec.api.metro.tokyo.lg.jp/spec/..."
                    value="t000001d0000000011-819fb24a2e74a5f2ea848d548c5cff7d-0"
                    class="w-full px-4 py-3 bg-white text-gray-900 placeholder-gray-500 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                  />
                </div>


                <!-- 2. Options + Submit (compact row) -->
                <div>
                  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                    <div class="md:col-span-2">
                      <label class="block text-sm font-medium text-white/90 mb-2">取得件数</label>
                      <input 
                        type="number" 
                        id="limit" 
                        placeholder="100"
                        value="100"
                        min="1"
                        max="1000"
                        class="w-full px-4 py-3 bg-white text-gray-900 placeholder-gray-500 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                      />
                    </div>
                    <div class="flex md:justify-end">
                      <button 
                        type="submit"
                        class="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-blue-500 text-white hover:from-emerald-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-200 font-semibold w-full sm:w-auto"
                      >
                        JSONを取得する
                      </button>
                    </div>
                  </div>
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
        </div>  <!-- End of homeContent -->
        
        <!-- Footer: License notice -->
        <footer class="mt-10 text-center">
          <p class="text-white/60 text-xs">
            出典: 東京都オープンデータ（API） / ライセンス: 
            <a href="https://creativecommons.org/licenses/by/4.0/deed.ja" target="_blank" class="underline hover:text-white">CC BY 4.0</a>
            （一部データは例外の場合があります。詳細は各データセットの提供条件をご確認ください）
          </p>
        </footer>
        
        
        
      </div>
      
      <script>
        function extractApiId(input) {
          // URL の場合は /spec/ 以降を取り出し、クエリを除去
          try {
            const s = String(input || '').trim();
            const marker = '/spec/';
            const pos = s.indexOf(marker);
            if (pos !== -1) {
              const rest = s.slice(pos + marker.length);
              const q = rest.indexOf('?');
              return q !== -1 ? rest.slice(0, q) : rest;
            }
            return s;
          } catch (_) {
            return (input || '').trim();
          }
        }
        
        function handleSubmit(event) {
          try {
            if (event && typeof event.preventDefault === 'function') event.preventDefault();
            var apiEl = document.getElementById('apiInput');
            var limitEl = document.getElementById('limit');
            const apiInput = (apiEl && apiEl.value) ? apiEl.value : '';
            const limit = (limitEl && limitEl.value) ? limitEl.value : '100';
            console.log('[post2getman] submit', { apiInput, limit });
            
            const apiId = extractApiId(apiInput);
            console.log('[post2getman] extracted apiId', apiId);
            
            if (apiId) {
              const url = '/api/' + apiId + '/json?limit=' + (limit || 100);
              console.log('[post2getman] navigate', url);
              window.location.href = url;
            }
          } catch (e) {
            console.error('[post2getman] submit error', e);
          }
          return false;
        }

        // 念のため、DOM読み込み後にフォームへもイベントをバインド
        document.addEventListener('DOMContentLoaded', function () {
          var form = document.getElementById('searchForm');
          if (form) {
            form.addEventListener('submit', handleSubmit);
          }
        });
      </script>
    </body>
    </html>
  `)
}
