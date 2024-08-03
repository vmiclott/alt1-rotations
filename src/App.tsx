import { useEffect, useState } from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { AbilityRotationVisualizer } from './components/AbilityRotationVisualizer'
import { TabLayout } from './components/TabLayout'
import { AbilityRotationCreator } from './components/AbilityRotationCreator'
import { AbilityRotationLoader } from './components/AbilityRotationLoader'
import { Ability } from './abilities'
import './app.css'
import { Settings } from './components/Settings'
import { defaultRotation } from './defaultRotation'

function App() {
  const [abilityRotation, setAbilityRotation] =
    useState<Ability[]>(defaultRotation)
  const [selectedRotations, setSelectedRotations] = useState<string[]>([])
  const currentRotationIndex = 0

  useEffect(() => {
    // redirect magic because we don't know how to set default path to /
    if (location.pathname.includes('index.html')) {
      location.replace('./')
    }

    // Load last used rotation(s) on app start
    const onStartData = localStorage.getItem('onStartRotation')
    if (onStartData) {
      const onStart = JSON.parse(onStartData)
      if (onStart.multiple) {
        const rotations = onStart.updatedSelectedOptions
        setSelectedRotations(rotations)
        if (rotations.length > 0) {
          const rotationData = localStorage.getItem(rotations[0])
          if (rotationData) {
            setAbilityRotation(JSON.parse(rotationData))
          }
        }
      } else {
        const rotation = localStorage.getItem(onStart.rotationName)
        if (rotation) {
          setAbilityRotation(JSON.parse(rotation))
        }
      }
    }
  }, [])

  useEffect(() => {
    if (selectedRotations.length > 0) {
      const rotationName = selectedRotations[currentRotationIndex]
      const rotationData = localStorage.getItem(rotationName)
      if (rotationData) {
        setAbilityRotation(JSON.parse(rotationData))
      }
    }
  }, [selectedRotations])

  return (
    <div className="app-container">
      <BrowserRouter basename="alt1-rotations">
        <Routes>
          <Route
            path="/"
            element={
              <AbilityRotationVisualizer
                abilityRotation={abilityRotation}
                setAbilityRotation={setAbilityRotation}
              />
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
