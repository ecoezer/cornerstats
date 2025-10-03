import './SelectorMode.css'

function SelectorMode({ mode, onModeChange }) {
  return (
    <div className="selector-mode">
      <button
        className={`mode-btn ${mode === 'visual' ? 'active' : ''}`}
        onClick={() => onModeChange('visual')}
      >
        Visual Selector
      </button>
      <button
        className={`mode-btn ${mode === 'css' ? 'active' : ''}`}
        onClick={() => onModeChange('css')}
      >
        CSS Selector
      </button>
    </div>
  )
}

export default SelectorMode
