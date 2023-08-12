import './abilityRotationLoader.css'
import { Dropdown } from './Dropdown'
import { Ability, abilitiesMap } from '../abilities'

type AbilityRotationLoaderProps = {
  setAbilityRotation: (newValue: Ability[]) => void
  abilityRotation: Ability[]
}

export const AbilityRotationLoader = ({
  setAbilityRotation,
  abilityRotation,
}: AbilityRotationLoaderProps) => {
  function handleLoad(newValue: Ability[]) {
    setAbilityRotation(newValue)
  }

  return (
    <div className="loader-container">
      <div className="loader-container__visualizer">
        {abilityRotation.map(({ name, tick, keybind }, idx) => (
          <div key={idx}>
            <img src={abilitiesMap[name]} width={50} height={50} />
            <div>{tick}</div>
            <div>{keybind}</div>
          </div>
        ))}
      </div>
      <div className="loader-container__loader">
        <label>Load rotation</label>
        <Dropdown setAbilityRotation={handleLoad} />
      </div>
    </div>
  )
}
