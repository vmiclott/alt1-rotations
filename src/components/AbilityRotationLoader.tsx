import { SetStateAction } from 'react'
import './abilityRotationLoader.css'
import { Dropdown } from './Dropdown'
import { Ability } from '../abilities'

type AbilityRotationLoaderProps = {
  setAbilityRotation: (newValue: SetStateAction<Ability[]>) => void
}

export const AbilityRotationLoader = ({
  setAbilityRotation,
}: AbilityRotationLoaderProps) => {
  function handleLoad(newValue: SetStateAction<Ability[]>) {
    setAbilityRotation(newValue)
  }

  return (
    <div className="loader">
      <label>Load rotation</label>
      <Dropdown change={handleLoad} />
    </div>
  )
}
