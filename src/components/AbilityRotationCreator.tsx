import { useEffect, useState } from 'react'
import './abilityRotationCreator.css'

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
    <form className="ability-input-form">
      <textarea
        placeholder={`[
          { "name": "blank", "tick": -1 },
          { "name": "blank", "tick": -1 }
]`}
        className="ability-input"
        value={abilityRotationText}
        onChange={(e) => setAbilityRotationText(e.target.value)}
      ></textarea>
      <label>Ability rotation name</label>
      <input
        className="new-ability-rotation-input"
        value={newAbilityRotationName}
        onChange={(e) => setNewAbilityRotationName(e.target.value)}
      ></input>
      <button className="ability-button" onClick={handleAbilityRotationSubmit}>
        Save
      </button>
    </form>
  )
}
