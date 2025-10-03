import { useState } from 'react'
import './UrlInput.css'

function UrlInput({ onHtmlFetched }) {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!url.trim()) {
      setError('Please enter a URL')
      return
    }

    setLoading(true)
    setError('')

    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
      const apiUrl = `${supabaseUrl.startsWith('http') ? supabaseUrl : 'https://' + supabaseUrl}/functions/v1/fetch-html`

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({ url }),
      })

      const responseText = await response.text()
      console.log('Response status:', response.status)
      console.log('Response text:', responseText)

      let data
      try {
        data = JSON.parse(responseText)
      } catch (parseError) {
        throw new Error(`Server returned invalid response: ${responseText.substring(0, 100)}`)
      }

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch URL')
      }

      onHtmlFetched(data.html, data.url)
    } catch (err) {
      setError(err.message || 'An error occurred while fetching the URL')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="url-input-container">
      <div className="url-input-card">
        <h2>Enter Website URL</h2>
        <p className="subtitle">Start by entering the URL of the website you want to scrape</p>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              className="url-input"
              disabled={loading}
            />
            <button
              type="submit"
              className="fetch-btn"
              disabled={loading}
            >
              {loading ? 'Fetching...' : 'Fetch Page'}
            </button>
          </div>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}
        </form>

        <div className="info-box">
          <h3>How it works:</h3>
          <ol>
            <li>Enter the URL of any public website</li>
            <li>Choose between visual or CSS selector mode</li>
            <li>Select the elements you want to extract</li>
            <li>Download your data as JSON</li>
          </ol>
        </div>
      </div>
    </div>
  )
}

export default UrlInput
