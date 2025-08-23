import { Hono } from 'hono'
import { cors } from 'hono/cors'

import { apiHandler } from './routes/api.js'
import { debugHandler } from './routes/debug.js'
import { rootHandler } from './routes/root.js'
import { examplesHandler } from './routes/examples.js'

const app = new Hono()

// CORS設定
app.use('*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST'],
  allowHeaders: ['Content-Type', 'Accept'],
}))

// ルートページ
app.get('/', rootHandler)

// おすすめ（使用例）ページ
app.get('/examples', examplesHandler)

// デバッグエンドポイント
app.get('/debug', debugHandler)

// メインAPI
app.get('/api/:apiId/:format?', apiHandler)

export default app