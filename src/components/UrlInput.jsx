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
      const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/fetch-html`

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      })

      const data = await response.json()

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
