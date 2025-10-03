import { useState } from 'react'
import './DataPreview.css'

function DataPreview({ data, sourceUrl }) {
  const [filename, setFilename] = useState('scraped-data')
  const [viewMode, setViewMode] = useState('formatted')

  const handleDownload = () => {
    const jsonData = {
      source: sourceUrl,
      scrapedAt: new Date().toISOString(),
      itemsCount: data.length,
      items: data,
    }

    const blob = new Blob([JSON.stringify(jsonData, null, 2)], {
      type: 'application/json',
    })

    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${filename}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const getJsonPreview = () => {
    const jsonData = {
      source: sourceUrl,
      scrapedAt: new Date().toISOString(),
      itemsCount: data.length,
      items: data,
    }

    return JSON.stringify(jsonData, null, 2)
  }

  return (
    <div className="data-preview">
      <div className="data-preview-header">
        <h3>Extracted Data</h3>
        <div className="view-toggle">
          <button
            className={`toggle-btn ${viewMode === 'formatted' ? 'active' : ''}`}
            onClick={() => setViewMode('formatted')}
          >
            Formatted
          </button>
          <button
            className={`toggle-btn ${viewMode === 'json' ? 'active' : ''}`}
            onClick={() => setViewMode('json')}
          >
            JSON
          </button>
        </div>
      </div>

      <div className="data-preview-body">
        {viewMode === 'formatted' ? (
          <div className="formatted-view">
            <div className="data-summary">
              <span className="summary-item">
                <strong>{data.length}</strong> items extracted
              </span>
              <span className="summary-item">
                <strong>Source:</strong> {sourceUrl}
              </span>
            </div>

            <div className="data-items">
              {data.map((item) => (
                <div key={item.id} className="data-item">
                  <div className="item-header">
                    <span className="item-tag">{item.tagName}</span>
                    <code className="item-selector">{item.selector}</code>
                  </div>

                  <div className="item-content">
                    {item.text && (
                      <div className="content-section">
                        <label>Text Content:</label>
                        <div className="content-value text-content">{item.text}</div>
                      </div>
                    )}

                    {Object.keys(item.attributes).length > 0 && (
                      <div className="content-section">
                        <label>Attributes:</label>
                        <div className="attributes-list">
                          {Object.entries(item.attributes).map(([key, value]) => (
                            <div key={key} className="attribute-item">
                              <span className="attr-key">{key}:</span>
                              <span className="attr-value">{value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="json-view">
            <pre className="json-content">{getJsonPreview()}</pre>
          </div>
        )}
      </div>

      <div className="data-preview-footer">
        <div className="filename-input-group">
          <label htmlFor="filename">Filename:</label>
          <input
            id="filename"
            type="text"
            value={filename}
            onChange={(e) => setFilename(e.target.value)}
            className="filename-input"
          />
          <span className="file-extension">.json</span>
        </div>
        <button onClick={handleDownload} className="download-btn">
          Download JSON
        </button>
      </div>
    </div>
  )
}

export default DataPreview
