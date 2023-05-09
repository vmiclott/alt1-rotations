import { useEffect, useState } from 'react'

export const Dropdown = ({ change }) => {
  const [open, setOpen] = useState(false)
  const [abilityRotationNames, setAbilityRotationNames] = useState([])
  const handleOpen = () => {
    setOpen(!open)
  }

  useEffect(() => {
    const rotationNames = localStorage.getItem('abilityRotationNames')
    if (rotationNames) {
      setAbilityRotationNames(JSON.parse(rotationNames))
    }
  }, [])

  const handleLoad = () => {
    const abilityRotationText = localStorage.getItem('test')
    if (abilityRotationText) {
      change(JSON.parse(abilityRotationText))
    }
  }

  return (
    <div className="dropdown">
      <button onClick={handleLoad}>Load rotation</button>
      {open && abilityRotationNames.map((names) => <ul>{names}</ul>)}
    </div>
  )
}
