import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

declare global {
  interface Window {
    alt1: any
  }
}

if (window.alt1) {
  const alt1 = window.alt1
  alt1.identifyAppUrl('appconfig.json')
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(<App />)
