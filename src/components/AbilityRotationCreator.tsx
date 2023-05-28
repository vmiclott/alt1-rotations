import { useEffect, useState } from 'react'
import './abilityRotationCreator.css'
import { Button } from './Button'

export const AbilityRotationCreator = () => {
  const [abilityRotationText, setAbilityRotationText] = useState('')
  const [newAbilityRotationName, setNewAbilityRotationName] = useState('')
  const [abilityRotationNames, setAbilityRotationNames] = useState<Set<string>>(
    new Set()
  )

  useEffect(() => {
    const abilityRotationLocalStorage = localStorage.getItem(
      'abilityRotationNames'
    )

    if (!abilityRotationLocalStorage) return

    setAbilityRotationNames(new Set(JSON.parse(abilityRotationLocalStorage)))
  }, [])

  const handleAbilityRotationSubmit = () => {
    localStorage.setItem(newAbilityRotationName, abilityRotationText)
    const newAbilityRotationNames = new Set([
      ...abilityRotationNames,
      newAbilityRotationName,
    ])
    localStorage.setItem(
      'abilityRotationNames',
      JSON.stringify(Array.from(newAbilityRotationNames))
    )
    setAbilityRotationNames(newAbilityRotationNames)
  }

  return (
    <form className="ability-rotation-creator__form">
      <label>Ability rotation JSON</label>
      <textarea
        placeholder={`[
          { "name": "blank", "tick": -1 },
          { "name": "blank", "tick": -1 }
]`}
        className="ability-rotation-creator__rotation-textarea"
        value={abilityRotationText}
        onChange={(e) => setAbilityRotationText(e.target.value)}
      ></textarea>
      <label>Ability rotation name</label>
      <div className="ability-rotation-creator__save-container">
        <input
          className="ability-rotation-creator__name-input"
          value={newAbilityRotationName}
          onChange={(e) => setNewAbilityRotationName(e.target.value)}
        ></input>
        <Button
          className="ability-rotation-creator__button"
          onClick={handleAbilityRotationSubmit}
        >
          Save
        </Button>
      </div>
    </form>
  )
}
