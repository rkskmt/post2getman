import { Hono } from 'hono'
import { cors } from 'hono/cors'

import { apiHandler } from './routes/api.js'
import { debugHandler } from './routes/debug.js'
import { rootHandler } from './routes/root.js'

const app = new Hono()

// CORS設定
app.use('*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST'],
  allowHeaders: ['Content-Type', 'Accept'],
}))

// ルートページ
app.get('/', rootHandler)

// デバッグエンドポイント
app.get('/debug', debugHandler)

// メインAPI
app.get('/api/:apiId/:format?', apiHandler)

export default app