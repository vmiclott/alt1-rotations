import { AbilityCarousel } from './components/AbilityCarousel'
import { Ability } from './abilities'
import { AbilityRotationCreator } from './components/AbilityRotationCreator'

const goodRotation: Ability[] = [
  { name: 'blank', tick: -1 },
  { name: 'blank', tick: -1 },
  { name: 'sunshine', tick: 0 },
  { name: 'autoAttack', tick: 3 },
  { name: 'concentratedBlast', tick: 3 },
  { name: 'dragonBreath', tick: 6 },
  { name: 'autoAttack', tick: 10 },
  { name: 'corruptionBlast', tick: 10 },
  { name: 'concentratedBlast', tick: 13 },
  { name: 'wildMagic', tick: 16 },
  { name: 'autoAttack', tick: 19 },
  { name: 'dragonBreath', tick: 19 },
  { name: 'concentratedBlast', tick: 22 },
  { name: 'blank', tick: 25 },
  { name: 'blank', tick: 28 },
  { name: 'blank', tick: 31 },
  { name: 'blank', tick: 34 },
  { name: 'blank', tick: 37 },
]

function App() {
  return (
    <div className="app-container">
      <AbilityRotationCreator />
      <AbilityCarousel size={5}></AbilityCarousel>
    </div>
  )
}

export default App
