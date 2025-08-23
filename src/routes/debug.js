// デバッグエンドポイントのハンドラ
export const debugHandler = async (c) => {
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
}
