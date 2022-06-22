import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { Leaflet } from './LeafletMap/Map'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Leaflet />
  </React.StrictMode>
)
