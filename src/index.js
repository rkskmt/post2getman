import { Hono } from 'hono'
import { cors } from 'hono/cors'

const app = new Hono()

// CORS設定
app.use('*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST'],
  allowHeaders: ['Content-Type', 'Accept'],
}))

// ルートページ
app.get('/', (c) => {
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
})

// デバッグエンドポイント
app.get('/debug', async (c) => {
  try {
    const testUrl = 'https://service.api.metro.tokyo.lg.jp/api/t000001d0000000011-819fb24a2e74a5f2ea848d548c5cff7d-0/json?limit=10'
    const response = await fetch(testUrl, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({})
    })
    
    const responseText = await response.text()
    
    return c.json({
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers.entries()),
      body: responseText.substring(0, 1000)
    })
  } catch (error) {
    return c.json({
      error: error.message,
      stack: error.stack
    })
  }
})

// メインAPI
app.get('/api/:apiId/:format?', async (c) => {
  const { apiId, format = 'json' } = c.req.param()
  
  try {
    const postBody = buildPostBody(c.req.query())
    const tokyoApiUrl = new URL(`https://service.api.metro.tokyo.lg.jp/api/${apiId}/${format}`)
    const queryParams = c.req.query()
    
    Object.entries(queryParams).forEach(([key, value]) => {
      if (['limit', 'offset', 'encoding'].includes(key)) {
        tokyoApiUrl.searchParams.set(key, value)
      }
    })
    
    const response = await fetch(tokyoApiUrl.toString(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': format === 'xml' ? 'application/xml' : 'application/json'
      },
      body: JSON.stringify(postBody)
    })
    
    if (!response.ok) {
      const errorText = await response.text()
      return c.json({ 
        error: `Tokyo API error: ${response.status}`,
        details: errorText,
        url: tokyoApiUrl.toString(),
        postBody: postBody
      }, response.status)
    }
    
    const data = await response.json()
    const userAgent = c.req.header('User-Agent') || ''
    const isBrowser = /Mozilla|Chrome|Firefox|Safari|WebKit/.test(userAgent)
    
    if (isBrowser && format === 'json') {
      return c.html(generateHTML(data, apiId, queryParams))
    } else {
      return c.json(data)
    }
    
  } catch (error) {
    return c.json({ 
      error: error.message,
      stack: error.stack,
      type: error.constructor.name
    }, 500)
  }
})

function buildPostBody(queryParams) {
  const postBody = {}
  
  const textAndSearch = []
  const numberAndSearch = []
  const dateAndSearch = []
  let hasSearchConditions = false
  
  Object.entries(queryParams).forEach(([key, value]) => {
    if (['limit', 'offset', 'encoding'].includes(key)) return
    
    if (key === 'column') {
      postBody.column = value.split(',')
    } else if (key.includes('_')) {
      const [type, relationship, ...columnParts] = key.split('_')
      const column = columnParts.join('_')
      const condition = { column, relationship, condition: value }
      
      if (type === 'date') {
        dateAndSearch.push(condition)
        hasSearchConditions = true
      } else if (type === 'number') {
        numberAndSearch.push(condition)
        hasSearchConditions = true
      } else if (type === 'text') {
        textAndSearch.push(condition)
        hasSearchConditions = true
      }
    }
  })
  
  if (hasSearchConditions) {
    postBody.searchCondition = {
      conditionRelationship: "and"
    }
    
    if (textAndSearch.length > 0) postBody.searchCondition.textAndSearch = textAndSearch
    if (numberAndSearch.length > 0) postBody.searchCondition.numberAndSearch = numberAndSearch
    if (dateAndSearch.length > 0) postBody.searchCondition.dateAndSearch = dateAndSearch
  }
  
  return postBody
}

function generateHTML(data, apiId, queryParams = {}) {
  const { metadata = {}, hits = [], total = 0, subtotal = 0, limit = 0 } = data
  
  // データ型分析
  const analysis = analyzeData(hits)
  
  return `<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${metadata.title || 'Tokyo Open Data'}</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.9.1/chart.min.js"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css" />
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
    .glow {
      box-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
    }
    #map {
      height: 400px;
      border-radius: 12px;
    }
    .chart-container {
      background: white;
      border-radius: 12px;
      padding: 20px;
    }
  </style>
</head>
<body class="min-h-screen gradient-bg">
  <div class="container mx-auto p-6 max-w-7xl">
    
    <!-- Back to Home -->
    <div class="mb-4">
      <a href="/" class="inline-flex items-center text-white/80 hover:text-white transition-colors">
        ← ホームに戻る
      </a>
    </div>
    
    <!-- Header -->
    <div class="glass rounded-2xl p-8 mb-6 hover-scale">
      <div class="flex justify-between items-start mb-4">
        <div>
          <h1 class="text-3xl font-bold text-white mb-2">${escapeHtml(metadata.title || 'Tokyo Open Data API')}</h1>
          <p class="text-white/80">${escapeHtml(metadata.datasetDesc || '東京都オープンデータのAPI経由取得結果')}</p>
        </div>
        <a 
          href="https://spec.api.metro.tokyo.lg.jp/spec/${apiId}" 
          target="_blank"
          class="bg-white/20 text-white px-4 py-2 rounded-lg hover:bg-white/30 transition-colors whitespace-nowrap"
        >
          📋 公式仕様
        </a>
      </div>
    </div>
    
    <!-- Stats -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <div class="glass rounded-xl p-6 text-center hover-scale">
        <div class="text-3xl font-bold text-white">${total.toLocaleString()}</div>
        <div class="text-white/70">総件数</div>
      </div>
      <div class="glass rounded-xl p-6 text-center hover-scale">
        <div class="text-3xl font-bold text-emerald-300">${subtotal.toLocaleString()}</div>
        <div class="text-white/70">取得件数</div>
      </div>
      <div class="glass rounded-xl p-6 text-center hover-scale">
        <div class="text-3xl font-bold text-blue-300">${limit || '無制限'}</div>
        <div class="text-white/70">リミット</div>
      </div>
    </div>
    
    <!-- Visualization Buttons -->
    ${analysis.hasCoordinates || analysis.hasNumericData ? `
    <div class="glass rounded-xl p-6 mb-6">
      <h3 class="text-lg font-semibold text-white mb-4">📊 データ可視化</h3>
      <div class="flex flex-wrap gap-3">
        ${analysis.hasCoordinates ? `
        <button 
          onclick="showMap()" 
          class="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-200 font-semibold"
        >
          🗺️ マップ表示
        </button>
        ` : ''}
        ${analysis.hasNumericData ? `
        <button 
          onclick="showChart()" 
          class="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 font-semibold"
        >
          📈 グラフ表示
        </button>
        ` : ''}
      </div>
    </div>
    ` : ''}
    
    <!-- Map Container -->
    <div id="mapContainer" class="hidden glass rounded-xl p-6 mb-6">
      <h3 class="text-lg font-semibold text-white mb-4">🗺️ マップビュー</h3>
      <div id="map"></div>
    </div>
    
    <!-- Chart Container -->
    <div id="chartContainer" class="hidden glass rounded-xl p-6 mb-6">
      <h3 class="text-lg font-semibold text-white mb-4">📈 チャートビュー</h3>
      <div id="chart" class="chart-container"></div>
    </div>
    
    <!-- Data Table -->
    ${hits.length > 0 ? `
    <div class="glass rounded-xl mb-6 hover-scale">
      <div class="p-6 border-b border-white/20">
        <h2 class="text-xl font-semibold text-white">📋 データテーブル (${hits.length.toLocaleString()}件)</h2>
      </div>
      <div class="overflow-x-auto">
        ${generateTable(hits)}
      </div>
    </div>
    ` : ''}
    
    <!-- Collapsibles -->
    <div class="space-y-4">
      <details class="glass rounded-xl hover-scale">
        <summary class="p-6 cursor-pointer font-semibold text-white hover:bg-white/10 rounded-xl">💻 API使用方法</summary>
        <div class="p-6 border-t border-white/20">
          <div class="space-y-4 text-white/90">
            <div>
              <p class="font-medium mb-2">ブラウザ: 表形式で表示</p>
              <p class="font-medium mb-2">プログラム: JSON形式でデータ取得</p>
            </div>
            <div>
              <p class="text-sm font-medium mb-2">現在のURL:</p>
              <div class="bg-black/20 p-3 rounded-lg">
                <code class="text-emerald-300 text-sm break-all">
                  ${escapeHtml(getCurrentUrl(queryParams, apiId))}
                </code>
              </div>
            </div>
            <div>
              <p class="text-sm font-medium mb-2">Python例:</p>
              <pre class="bg-black/20 p-3 rounded-lg text-emerald-300 text-sm overflow-x-auto">import requests
response = requests.post("${escapeHtml(getCurrentUrl(queryParams, apiId))}", json={})
data = response.json()</pre>
            </div>
          </div>
        </div>
      </details>
      
      <details class="glass rounded-xl hover-scale">
        <summary class="p-6 cursor-pointer font-semibold text-white hover:bg-white/10 rounded-xl">📊 メタデータ</summary>
        <div class="p-6 border-t border-white/20">
          <pre class="bg-black/20 p-4 rounded-lg text-emerald-300 text-sm overflow-x-auto">${escapeHtml(JSON.stringify(metadata, null, 2))}</pre>
        </div>
      </details>
      
      <details class="glass rounded-xl hover-scale">
        <summary class="p-6 cursor-pointer font-semibold text-white hover:bg-white/10 rounded-xl">🔧 完全なJSONレスポンス</summary>
        <div class="p-6 border-t border-white/20">
          <pre class="bg-black/20 p-4 rounded-lg text-emerald-300 text-sm overflow-x-auto">${escapeHtml(JSON.stringify(data, null, 2))}</pre>
        </div>
      </details>
    </div>
    
  </div>
  
  <script>
    const rawData = ${JSON.stringify(hits)};
    const analysis = ${JSON.stringify(analysis)};
    
    function showMap() {
      const container = document.getElementById('mapContainer');
      container.classList.remove('hidden');
      
      if (!window.mapInitialized) {
        initializeMap();
        window.mapInitialized = true;
      }
      
      container.scrollIntoView({ behavior: 'smooth' });
    }
    
    function showChart() {
      const container = document.getElementById('chartContainer');
      container.classList.remove('hidden');
      
      if (!window.chartInitialized) {
        initializeChart();
        window.chartInitialized = true;
      }
      
      container.scrollIntoView({ behavior: 'smooth' });
    }
    
    function initializeMap() {
      if (!analysis.hasCoordinates) return;
      
      const map = L.map('map').setView([35.6762, 139.6503], 11);
      
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(map);
      
      const markers = [];
      
      rawData.forEach(item => {
        const lat = parseFloat(item[analysis.latColumn]);
        const lng = parseFloat(item[analysis.lngColumn]);
        const name = item[analysis.nameColumn] || \`Point \${item.row || ''}\`;
        
        if (!isNaN(lat) && !isNaN(lng)) {
          const marker = L.marker([lat, lng]).addTo(map);
          marker.bindPopup(\`<strong>\${name}</strong><br>緯度: \${lat}<br>経度: \${lng}\`);
          markers.push([lat, lng]);
        }
      });
      
      if (markers.length > 0) {
        const group = new L.featureGroup(markers.map(m => L.marker(m)));
        map.fitBounds(group.getBounds().pad(0.1));
      }
    }
    
    function showChart() {
      const container = document.getElementById('chartContainer');
      container.classList.remove('hidden');
      
      if (!window.chartInitialized) {
        initializeChart();
        window.chartInitialized = true;
      }
      
      container.scrollIntoView({ behavior: 'smooth' });
    }
    
    function initializeChart() {
      if (!analysis.hasNumericData) return;
      
      // データを準備（全ての数値列を含む）
      const chartData = rawData.map(item => {
        const result = {};
        
        if (analysis.dateColumn) {
          result.date = item[analysis.dateColumn];
        }
        
        analysis.numericColumns.forEach(col => {
          const value = parseFloat(item[col]);
          if (!isNaN(value)) {
            result[col] = value;
          }
        });
        
        return result;
      }).filter(item => Object.keys(item).length > 1);
      
      if (chartData.length === 0) return;
      
      const chartContainer = document.getElementById('chart');
      chartContainer.innerHTML = '<canvas id="chartCanvas" style="width: 100%; height: 400px;"></canvas>';
      
      const canvas = document.getElementById('chartCanvas');
      const ctx = canvas.getContext('2d');
      
      // Chart.js用のデータセット準備（全ての数値列）
      const datasets = analysis.numericColumns.map((col, index) => {
        const colors = [
          'rgb(59, 130, 246)',   // blue
          'rgb(239, 68, 68)',    // red  
          'rgb(16, 185, 129)',   // green
          'rgb(245, 158, 11)',   // yellow
          'rgb(139, 92, 246)'    // purple
        ];
        
        return {
          label: col,
          data: chartData.map(d => d[col]),
          borderColor: colors[index % colors.length],
          backgroundColor: colors[index % colors.length] + '20',
          borderWidth: 2,
          fill: false,
          tension: 0.1,
          pointRadius: 3,
          pointHoverRadius: 6
        };
      });
      
      // Chart.js設定
      const config = {
        type: 'line',
        data: {
          labels: chartData.map(d => d.date || 'Point ' + (chartData.indexOf(d) + 1)),
          datasets: datasets
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                color: 'rgba(0, 0, 0, 0.1)'
              },
              ticks: {
                display: false
              }
            },
            x: {
              grid: {
                color: 'rgba(0, 0, 0, 0.1)'
              },
              ticks: {
                display: false,
                maxTicksLimit: 10
              }
            }
          },
          plugins: {
            legend: {
              position: 'top',
              labels: {
                usePointStyle: true,
                padding: 20
              }
            },
            tooltip: {
              mode: 'index',
              intersect: false,
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              titleColor: 'white',
              bodyColor: 'white',
              borderColor: 'rgba(255, 255, 255, 0.2)',
              borderWidth: 1,
              callbacks: {
                title: function(context) {
                  return context[0].label;
                },
                label: function(context) {
                  return context.dataset.label + ': ' + context.parsed.y.toLocaleString();
                }
              }
            }
          },
          interaction: {
            mode: 'index',
            intersect: false
          }
        }
      };
      
      // Chart.jsインスタンス作成
      window.currentChart = new Chart(ctx, config);
    }
    
    function drawAdvancedChart(ctx, config) {
      const canvas = ctx.canvas;
      
      // DOM上の見た目サイズを取得
      const rect = canvas.getBoundingClientRect();
      const scale = window.devicePixelRatio || 1;
      
      // 高解像度対応
      canvas.width = rect.width * scale;
      canvas.height = rect.height * scale;
      ctx.setTransform(scale, 0, 0, scale, 0, 0);
      
      // 描画に使用するサイズ（CSS表示サイズ）
      const width = rect.width;
      const height = rect.height;
      const padding = 60;
      const chartWidth = width - padding * 2;
      const chartHeight = height - padding * 2;
      
      // 背景
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, width, height);
      
      const datasets = config.datasets;
      const labels = config.labels;
      
      if (datasets.length === 0 || labels.length === 0) return;
      
      // データの範囲を計算（下限を0に固定）
      const allValues = datasets.flatMap(d => d.data).filter(v => v != null);
      const maxValue = Math.max(...allValues);
      const minValue = 0; // 強制的に0を下限に
      const range = maxValue - minValue || 1;
      
      // グリッド描画
      ctx.strokeStyle = '#e5e7eb';
      ctx.lineWidth = 1;
      
      // 横線（Y軸グリッド）
      for (let i = 0; i <= 5; i++) {
        const y = padding + (chartHeight / 5) * i;
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(width - padding, y);
        ctx.stroke();
        
        // Y軸ラベル（最小値から最大値の範囲で計算）
        const value = minValue + (range / 5) * (5 - i);
        ctx.fillStyle = '#6b7280';
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText(Math.round(value).toLocaleString(), padding - 10, y + 4);
      }
      
      // 縦線（X軸グリッド）
      const step = Math.max(1, Math.floor(labels.length / 10));
      for (let i = 0; i < labels.length; i += step) {
        const x = padding + (chartWidth / (labels.length - 1)) * i;
        ctx.beginPath();
        ctx.moveTo(x, padding);
        ctx.lineTo(x, height - padding);
        ctx.stroke();
        
        // X軸ラベル
        ctx.fillStyle = '#6b7280';
        ctx.font = '10px sans-serif';
        ctx.textAlign = 'center';
        ctx.save();
        ctx.translate(x, height - padding + 15);
        ctx.rotate(-Math.PI / 4);
        ctx.fillText(labels[i], 0, 0);
        ctx.restore();
      }
      
      // データ線を描画
      datasets.forEach((dataset, datasetIndex) => {
        ctx.strokeStyle = dataset.borderColor;
        ctx.lineWidth = dataset.borderWidth;
        ctx.beginPath();
        
        let firstPoint = true;
        dataset.data.forEach((value, index) => {
          if (value == null) return;
          
          const x = padding + (chartWidth / (labels.length - 1)) * index;
          const y = padding + chartHeight - ((value - minValue) / range) * chartHeight;
          
          if (firstPoint) {
            ctx.moveTo(x, y);
            firstPoint = false;
          } else {
            ctx.lineTo(x, y);
          }
        });
        
        ctx.stroke();
        
        // データポイント
        ctx.fillStyle = dataset.borderColor;
        dataset.data.forEach((value, index) => {
          if (value == null) return;
          
          const x = padding + (chartWidth / (labels.length - 1)) * index;
          const y = padding + chartHeight - ((value - minValue) / range) * chartHeight;
          
          ctx.beginPath();
          ctx.arc(x, y, 3, 0, 2 * Math.PI);
          ctx.fill();
        });
      });
      
      // 凡例
      let legendY = 20;
      datasets.forEach((dataset, index) => {
        const legendX = width - 200;
        
        // 色のボックス
        ctx.fillStyle = dataset.borderColor;
        ctx.fillRect(legendX, legendY, 15, 15);
        
        // ラベル
        ctx.fillStyle = '#374151';
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(dataset.label, legendX + 20, legendY + 12);
        
        legendY += 25;
      });
      
      // マウスイベントの設定
      canvas.addEventListener('mousemove', function(e) {
        const rect = canvas.getBoundingClientRect();
        const x = (e.clientX - rect.left) * 2; // スケール調整
        const y = (e.clientY - rect.top) * 2;
        
        // 最も近いデータポイントを見つける
        let closestIndex = -1;
        let closestDistance = Infinity;
        
        for (let i = 0; i < labels.length; i++) {
          const pointX = padding + (chartWidth / (labels.length - 1)) * i;
          const distance = Math.abs(x - pointX);
          
          if (distance < closestDistance && distance < 20) {
            closestDistance = distance;
            closestIndex = i;
          }
        }
        
        // ツールチップ表示
        if (closestIndex >= 0) {
          showTooltip(e.clientX, e.clientY, closestIndex, datasets, labels);
        } else {
          hideTooltip();
        }
      });
      
      canvas.addEventListener('mouseleave', hideTooltip);
    }
    
    function showTooltip(x, y, index, datasets, labels) {
      let tooltip = document.getElementById('chartTooltip');
      if (!tooltip) {
        tooltip = document.createElement('div');
        tooltip.id = 'chartTooltip';
        tooltip.style.cssText = \`
          position: absolute;
          background: rgba(0, 0, 0, 0.8);
          color: white;
          padding: 8px 12px;
          border-radius: 6px;
          font-size: 12px;
          pointer-events: none;
          z-index: 1000;
          transition: opacity 0.2s;
        \`;
        document.body.appendChild(tooltip);
      }
      
      let content = \`<div style="font-weight: bold; margin-bottom: 4px;">\${labels[index]}</div>\`;
      datasets.forEach(dataset => {
        const value = dataset.data[index];
        if (value != null) {
          content += \`<div style="color: \${dataset.borderColor};">\${dataset.label}: \${value.toLocaleString()}</div>\`;
        }
      });
      
      tooltip.innerHTML = content;
      tooltip.style.left = x + 10 + 'px';
      tooltip.style.top = y - 10 + 'px';
      tooltip.style.opacity = '1';
    }
    
    function hideTooltip() {
      const tooltip = document.getElementById('chartTooltip');
      if (tooltip) {
        tooltip.style.opacity = '0';
      }
    }
  </script>
</body>
</html>`
}

function analyzeData(hits) {
  if (!hits || hits.length === 0) {
    return { hasCoordinates: false, hasNumericData: false }
  }
  
  const sample = hits[0]
  const columns = Object.keys(sample).filter(key => key !== 'row')
  
  // 位置情報の検出
  const latColumns = columns.filter(col => 
    col.includes('緯度') || col.toLowerCase().includes('lat')
  )
  const lngColumns = columns.filter(col => 
    col.includes('経度') || col.toLowerCase().includes('lng') || col.toLowerCase().includes('lon')
  )
  const nameColumns = columns.filter(col => 
    col.includes('名称') || col.includes('名前') || col.toLowerCase().includes('name')
  )
  
  // 数値データの検出（改善版）
  const excludePatterns = ['コード', 'ID', '番号', '管理', '識別']
  const numericColumns = columns.filter(col => {
    // 除外パターンをチェック
    if (excludePatterns.some(pattern => col.includes(pattern))) {
      return false
    }
    
    // 「◯数」パターンをチェック
    if (!/.*数$/.test(col)) {
      return false
    }
    
    // 全レコードで数値変換可能性をチェック
    const validCount = hits.filter(hit => {
      const value = hit[col]
      const numericValue = parseFloat(value)
      return !isNaN(numericValue) && value !== ''
    }).length
    
    return validCount > 0 // 1つでも有効な数値があれば数値列として扱う
  })
  
  // 日付データの検出（改善版）
  const dateColumns = columns.filter(col => {
    const colName = col.toLowerCase()
    const hasDateInName = col.includes('日') || col.includes('年月日') || colName.includes('date')
    
    if (!hasDateInName) return false
    
    const sampleValue = sample[col]
    // 日付っぽいパターンをチェック
    const datePatterns = [
      /^\d{4}-\d{1,2}-\d{1,2}$/,  // YYYY-MM-DD
      /^\d{4}\/\d{1,2}\/\d{1,2}$/, // YYYY/MM/DD
      /^\d{4}\.\d{1,2}\.\d{1,2}$/  // YYYY.MM.DD
    ]
    
    return datePatterns.some(pattern => pattern.test(sampleValue))
  })
  
  return {
    hasCoordinates: latColumns.length > 0 && lngColumns.length > 0,
    latColumn: latColumns[0],
    lngColumn: lngColumns[0],
    nameColumn: nameColumns[0],
    hasNumericData: numericColumns.length > 0,
    numericColumns: numericColumns, // 全ての数値列を返す
    dateColumn: dateColumns[0],
    hasDateData: dateColumns.length > 0
  }
}

function getCurrentUrl(params, apiId) {
  const url = new URL(`https://your-worker.domain/api/${apiId}/json`)
  Object.entries(params).forEach(([key, value]) => {
    if (value) url.searchParams.set(key, value)
  })
  return url.toString()
}

function generateTable(hits) {
  if (!hits || hits.length === 0) return '<p class="p-6 text-white">データがありません</p>'
  
  const columns = [...new Set(hits.flatMap(hit => Object.keys(hit).filter(key => key !== 'row')))]
  
  return `
    <table class="w-full">
      <thead class="bg-white/20">
        <tr>
          ${columns.map(col => `<th class="px-6 py-4 text-left font-semibold text-white">${escapeHtml(col)}</th>`).join('')}
        </tr>
      </thead>
      <tbody>
        ${hits.map((hit, index) => `
          <tr class="border-t border-white/10 hover:bg-white/10 transition-colors ${index % 2 === 0 ? 'bg-white/5' : ''}">
            ${columns.map(col => {
              const value = hit[col];
              const displayValue = (value === null || value === undefined) ? '' : String(value);
              return `<td class="px-6 py-4 text-white/90">${escapeHtml(displayValue)}</td>`;
            }).join('')}
          </tr>
        `).join('')}
      </tbody>
    </table>
  `
}

function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  }
  return text.replace(/[&<>"']/g, m => map[m])
}

export default app