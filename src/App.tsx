import { useEffect, useState } from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { AbilityRotationVisualizer } from './components/AbilityRotationVisualizer'
import { TabLayout } from './components/TabLayout'
import { AbilityRotationCreator } from './components/AbilityRotationCreator'
import { AbilityRotationLoader } from './components/AbilityRotationLoader'
import { Ability } from './abilities'
import './app.css'
import { Settings } from './components/Settings'

const defaultRotation: Ability[] = [
  { name: 'smokeCloud', tick: 0, keybind: '\\' },
  { name: 'deathSkulls', tick: 0, keybind: 'd' },
  { name: 'soulSap', tick: 3, keybind: 'r' },
  { name: 'touchOfDeath', tick: 6, keybind: 'w' },
  { name: 'necromancy', tick: 9, keybind: 'q' },
  { name: 'soulSap', tick: 12, keybind: 'r' },
  { name: 'livingDeath', tick: 15, keybind: 'f' },
  { name: 'touchOfDeath', tick: 18, keybind: 'w' },
  { name: 'deathSkulls', tick: 21, keybind: 'd' },
  { name: 'fingerOfDeath', tick: 24, keybind: 'e' },
  { name: 'necromancy', tick: 27, keybind: 'q' },
  { name: 'necromancy', tick: 30, keybind: 'q' },
  { name: 'necromancy', tick: 33, keybind: 'q' },
  { name: 'fingerOfDeath', tick: 36, keybind: 'e' },
  { name: 'necromancy', tick: 39, keybind: 'q' },
  { name: 'deathSkulls', tick: 42, keybind: 'd' },
  { name: 'touchOfDeath', tick: 45, keybind: 'w' },
  { name: 'necromancy', tick: 48, keybind: 'q' },
  { name: 'necromancy', tick: 51, keybind: 'q' },
  { name: 'fingerOfDeath', tick: 54, keybind: 'e' },
  { name: 'fingerOfDeath', tick: 57, keybind: 'e' },
  { name: 'necromancy', tick: 60, keybind: 'q' },
  { name: 'lifeTransfer', tick: 63, keybind: '3' },
  { name: 'soulSap', tick: 66, keybind: 'r' },
  { name: 'deathSkulls', tick: 69, keybind: 'd' },
  { name: 'reflect', tick: 72, keybind: '6' },
  { name: 'volleyOfSouls', tick: 75, keybind: 'a' },
  { name: 'touchOfDeath', tick: 78, keybind: 'w' },
  { name: 'weaponSpecialAttack', tick: 81, keybind: 'F4' },
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
      <BrowserRouter basename="alt1-rotations">
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
              <AbilityRotationLoader
                setAbilityRotation={setAbilityRotation}
                abilityRotation={abilityRotation}
              />
            }
          />
          <Route path="/settings" element={<Settings />} />
        </Routes>
        <TabLayout />
      </BrowserRouter>
    </div>
  )
}

export default App
