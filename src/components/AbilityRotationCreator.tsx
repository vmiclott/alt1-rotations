import { useState } from 'react'

export const AbilityRotationCreator = () => {
  const [abilityRotationText, setAbilityRotationText] = useState('')

  const handleAbilityRotationSubmit = () => {
    localStorage.setItem('ability-rotation', abilityRotationText)
  }

  return (
    <div className="ability-input-container">
      <textarea
        placeholder={`[
            { "name": "blank", "tick": -1 },
            { "name": "blank", "tick": -1 }
]`}
        className="ability-input"
        value={abilityRotationText}
        onChange={(e) => setAbilityRotationText(e.target.value)}
      ></textarea>
      <button className="ability-button" onClick={handleAbilityRotationSubmit}>
        Send
      </button>
    </div>
  )
}
