import { useEffect, useRef, useState } from 'react'
import './VisualSelector.css'

function VisualSelector({ htmlContent, sourceUrl, onElementsSelected }) {
  const iframeRef = useRef(null)
  const [selectedElements, setSelectedElements] = useState([])
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    if (!htmlContent || !iframeRef.current) return

    const iframe = iframeRef.current
    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document

    iframeDoc.open()
    iframeDoc.write(htmlContent)
    iframeDoc.close()

    const style = iframeDoc.createElement('style')
    style.textContent = `
      * {
        cursor: pointer !important;
      }
      .scraper-highlight {
        outline: 2px dashed #667eea !important;
        outline-offset: 2px !important;
        background: rgba(102, 126, 234, 0.1) !important;
      }
      .scraper-selected {
        outline: 3px solid #10b981 !important;
        outline-offset: 2px !important;
        background: rgba(16, 185, 129, 0.15) !important;
      }
    `
    iframeDoc.head.appendChild(style)

    const handleClick = (e) => {
      e.preventDefault()
      e.stopPropagation()

      const target = e.target

      const selector = generateSelector(target)

      const isSelected = target.classList.contains('scraper-selected')

      if (isSelected) {
        target.classList.remove('scraper-selected')
        setSelectedElements((prev) => {
          const updated = prev.filter((s) => s.selector !== selector)
          onElementsSelected(updated)
          return updated
        })
      } else {
        target.classList.add('scraper-selected')
        setSelectedElements((prev) => {
          const updated = [...prev, { selector, element: target }]
          onElementsSelected(updated)
          return updated
        })
      }
    }

    const handleMouseOver = (e) => {
      e.preventDefault()
      e.stopPropagation()

      if (!e.target.classList.contains('scraper-selected')) {
        e.target.classList.add('scraper-highlight')
      }
    }

    const handleMouseOut = (e) => {
      e.preventDefault()
      e.stopPropagation()

      e.target.classList.remove('scraper-highlight')
    }

    iframeDoc.addEventListener('click', handleClick, true)
    iframeDoc.addEventListener('mouseover', handleMouseOver, true)
    iframeDoc.addEventListener('mouseout', handleMouseOut, true)

    setIsReady(true)

    return () => {
      if (iframeDoc) {
        iframeDoc.removeEventListener('click', handleClick, true)
        iframeDoc.removeEventListener('mouseover', handleMouseOver, true)
        iframeDoc.removeEventListener('mouseout', handleMouseOut, true)
      }
    }
  }, [htmlContent])

  const generateSelector = (element) => {
    if (element.id) {
      return `#${element.id}`
    }

    if (element.className && typeof element.className === 'string') {
      const classes = element.className.trim().split(/\s+/).filter(c => !c.startsWith('scraper-'))
      if (classes.length > 0) {
        return `${element.tagName.toLowerCase()}.${classes.join('.')}`
      }
    }

    let path = []
    let current = element

    while (current && current.tagName) {
      let selector = current.tagName.toLowerCase()

      if (current.parentElement) {
        const siblings = Array.from(current.parentElement.children).filter(
          (e) => e.tagName === current.tagName
        )

        if (siblings.length > 1) {
          const index = siblings.indexOf(current) + 1
          selector += `:nth-of-type(${index})`
        }
      }

      path.unshift(selector)
      current = current.parentElement

      if (path.length > 3) break
    }

    return path.join(' > ')
  }

  const handleClear = () => {
    setSelectedElements([])
    onElementsSelected([])

    if (iframeRef.current) {
      const iframeDoc = iframeRef.current.contentDocument || iframeRef.current.contentWindow.document
      const selected = iframeDoc.querySelectorAll('.scraper-selected')
      selected.forEach((el) => el.classList.remove('scraper-selected'))
    }
  }

  return (
    <div className="visual-selector">
      <div className="visual-selector-header">
        <h3>Visual Selector</h3>
        <div className="header-actions">
          <span className="selected-count">
            {selectedElements.length} element{selectedElements.length !== 1 ? 's' : ''} selected
          </span>
          {selectedElements.length > 0 && (
            <button onClick={handleClear} className="clear-btn">
              Clear All
            </button>
          )}
        </div>
      </div>

      <div className="visual-selector-body">
        {!isReady && <div className="loading">Loading page...</div>}
        <iframe
          ref={iframeRef}
          title="Page Preview"
          className="preview-iframe"
          sandbox="allow-same-origin"
        />
      </div>

      <div className="visual-selector-info">
        <p>Click on any element to select it. Selected elements will be highlighted in green.</p>
      </div>
    </div>
  )
}

export default VisualSelector
