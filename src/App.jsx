import { useState } from 'react'
import UrlInput from './components/UrlInput'
import SelectorMode from './components/SelectorMode'
import VisualSelector from './components/VisualSelector'
import CssSelector from './components/CssSelector'
import DataPreview from './components/DataPreview'
import './App.css'

function App() {
  const [htmlContent, setHtmlContent] = useState(null)
  const [sourceUrl, setSourceUrl] = useState('')
  const [selectorMode, setSelectorMode] = useState('visual')
  const [selectedElements, setSelectedElements] = useState([])
  const [extractedData, setExtractedData] = useState([])

  const handleHtmlFetched = (html, url) => {
    setHtmlContent(html)
    setSourceUrl(url)
    setSelectedElements([])
    setExtractedData([])
  }

  const handleReset = () => {
    setHtmlContent(null)
    setSourceUrl('')
    setSelectedElements([])
    setExtractedData([])
  }

  const handleElementsSelected = (elements) => {
    setSelectedElements(elements)
    extractDataFromElements(elements)
  }

  const extractDataFromElements = (elements) => {
    const data = elements.map((el, index) => {
      const parser = new DOMParser()
      const doc = parser.parseFromString(htmlContent, 'text/html')

      let element
      if (el.selector) {
        element = doc.querySelector(el.selector)
      } else if (el.xpath) {
        const result = doc.evaluate(el.xpath, doc, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null)
        element = result.singleNodeValue
      }

      if (element) {
        return {
          id: index + 1,
          selector: el.selector || el.xpath,
          tagName: element.tagName.toLowerCase(),
          text: element.textContent?.trim() || '',
          html: element.innerHTML?.trim() || '',
          attributes: Array.from(element.attributes || []).reduce((acc, attr) => {
            acc[attr.name] = attr.value
            return acc
          }, {})
        }
      }
      return null
    }).filter(Boolean)

    setExtractedData(data)
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Web Scraper</h1>
        <p>Extract data from any website</p>
      </header>

      <div className="app-container">
        {!htmlContent ? (
          <UrlInput onHtmlFetched={handleHtmlFetched} />
        ) : (
          <>
            <div className="controls">
              <button onClick={handleReset} className="reset-btn">
                ← New URL
              </button>
              <SelectorMode mode={selectorMode} onModeChange={setSelectorMode} />
            </div>

            <div className="content-area">
              {selectorMode === 'visual' ? (
                <VisualSelector
                  htmlContent={htmlContent}
                  sourceUrl={sourceUrl}
                  onElementsSelected={handleElementsSelected}
                />
              ) : (
                <CssSelector
                  htmlContent={htmlContent}
                  onElementsSelected={handleElementsSelected}
                />
              )}

              {extractedData.length > 0 && (
                <DataPreview data={extractedData} sourceUrl={sourceUrl} />
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default App
