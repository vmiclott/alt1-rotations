import './abilityRotationLoader.css'
import { Dropdown } from './Dropdown'
import { Ability } from '../abilities'

type AbilityRotationLoaderProps = {
  setAbilityRotation: (newValue: Ability[]) => void
}

export const AbilityRotationLoader = ({
  setAbilityRotation,
}: AbilityRotationLoaderProps) => {
  function handleLoad(newValue: Ability[]) {
    setAbilityRotation(newValue)
  }

  return (
    <div className="loader">
      <label>Load rotation</label>
      <Dropdown setAbilityRotation={handleLoad} />
    </div>
  )
}
