import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AbilityRotationVisualizer } from './components/AbilityRotationVisualizer'
import { TabLayout } from './components/TabLayout'
import { AbilityRotationCreator } from './components/AbilityRotationCreator'
import { AbilityRotationLoader } from './components/AbilityRotationLoader'
import { Ability } from './abilities'
import './app.css'
import { Settings } from './components/Settings'

const defaultRotation: Ability[] = [
  { name: 'resonance', tick: 0 },
  { name: 'sever', tick: 3 },
  { name: 'wrack', tick: 3 },
  { name: 'combust', tick: 3 },
  { name: 'resonance', tick: 6 },
  { name: 'sever', tick: 9 },
  { name: 'punish', tick: 12 },
  { name: 'preparation', tick: 12 },
  { name: 'anticipation', tick: 15 },
  { name: 'barricade', tick: 18 },
  { name: 'berserk', tick: 21 },
  { name: 'sever', tick: 24 },
  { name: 'resonance', tick: 27 },
]

function App() {
  const [abilityRotation, setAbilityRotation] =
    useState<Ability[]>(defaultRotation)

  useEffect(() => {
    // redirect magic because we don't know how to set default path to /
    if (location.pathname.includes('index.html')) {
      location.replace('./')
    }
  }, [])

  return (
    <div className="app-container">
      <Router basename="/ability-rotations/">
        <Routes>
          <Route
            path="/"
            element={
              <AbilityRotationVisualizer abilityRotation={abilityRotation} />
            }
          />
          <Route path="/creator" element={<AbilityRotationCreator />} />
          <Route
            path="/loader"
            element={
              <AbilityRotationLoader setAbilityRotation={setAbilityRotation} />
            }
          />
          <Route path="/settings" element={<Settings />} />
        </Routes>
        <TabLayout />
      </Router>
    </div>
  )
}

export default App
