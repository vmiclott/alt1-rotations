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
  { name: 'commandVengefulGhost', tick: 0, keybind: 'E' },
  { name: 'commandSkeletonWarrior', tick: 0, keybind: 'S' },
  { name: 'deathSkulls', tick: 3, keybind: '5' },
  { name: 'touchOfDeath', tick: 6, keybind: '2' },
  { name: 'fingerOfDeath', tick: 9, keybind: 'Q' },
  { name: 'weaponSpecialAttack', tick: 12, keybind: 'O' },
  { name: 'fingerOfDeath', tick: 15, keybind: 'Q' },
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
