import { useState, useEffect } from 'react'
import './CssSelector.css'

function CssSelector({ htmlContent, onElementsSelected }) {
  const [selectors, setSelectors] = useState([''])
  const [matchCounts, setMatchCounts] = useState([])
  const [parser] = useState(() => new DOMParser())

  useEffect(() => {
    updateMatchCounts()
  }, [htmlContent, selectors])

  const updateMatchCounts = () => {
    if (!htmlContent) return

    const doc = parser.parseFromString(htmlContent, 'text/html')
    const counts = selectors.map((selector) => {
      if (!selector.trim()) return 0
      try {
        return doc.querySelectorAll(selector).length
      } catch {
        return -1
      }
    })
    setMatchCounts(counts)
  }

  const handleSelectorChange = (index, value) => {
    const updated = [...selectors]
    updated[index] = value
    setSelectors(updated)
  }

  const handleAddSelector = () => {
    setSelectors([...selectors, ''])
  }

  const handleRemoveSelector = (index) => {
    const updated = selectors.filter((_, i) => i !== index)
    setSelectors(updated.length === 0 ? [''] : updated)
  }

  const handleApply = () => {
    const validSelectors = selectors
      .filter((s) => s.trim())
      .map((selector) => ({ selector }))

    onElementsSelected(validSelectors)
  }

  const getMatchCountClass = (count) => {
    if (count === -1) return 'error'
    if (count === 0) return 'warning'
    return 'success'
  }

  const getMatchCountText = (count) => {
    if (count === -1) return 'Invalid selector'
    if (count === 0) return 'No matches'
    return `${count} match${count !== 1 ? 'es' : ''}`
  }

  return (
    <div className="css-selector">
      <div className="css-selector-header">
        <h3>CSS Selector</h3>
        <button onClick={handleAddSelector} className="add-selector-btn">
          + Add Selector
        </button>
      </div>

      <div className="css-selector-body">
        <div className="selectors-list">
          {selectors.map((selector, index) => (
            <div key={index} className="selector-item">
              <div className="selector-input-group">
                <input
                  type="text"
                  value={selector}
                  onChange={(e) => handleSelectorChange(index, e.target.value)}
                  placeholder="e.g., .class-name, #id, div > p"
                  className="selector-input"
                />
                {selectors.length > 1 && (
                  <button
                    onClick={() => handleRemoveSelector(index)}
                    className="remove-btn"
                    title="Remove selector"
                  >
                    ×
                  </button>
                )}
              </div>
              {selector.trim() && (
                <div className={`match-count ${getMatchCountClass(matchCounts[index])}`}>
                  {getMatchCountText(matchCounts[index])}
                </div>
              )}
            </div>
          ))}
        </div>

        <button
          onClick={handleApply}
          className="apply-btn"
          disabled={!selectors.some((s) => s.trim())}
        >
          Apply Selectors
        </button>
      </div>

      <div className="css-selector-help">
        <h4>Common CSS Selectors:</h4>
        <ul>
          <li><code>.class-name</code> - Select by class</li>
          <li><code>#id</code> - Select by ID</li>
          <li><code>div</code> - Select by tag name</li>
          <li><code>div &gt; p</code> - Direct child selector</li>
          <li><code>div p</code> - Descendant selector</li>
          <li><code>[href]</code> - Select by attribute</li>
          <li><code>:first-child</code> - Pseudo selector</li>
        </ul>
      </div>
    </div>
  )
}

export default CssSelector
