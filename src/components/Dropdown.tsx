import './dropdown.css'
import { useEffect, useState } from 'react'

const Icon = () => {
  return (
    <svg fill="white" height="24" width="24" viewBox="0 0 20 20">
      <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
    </svg>
  )
}

export const Dropdown = ({ change }) => {
  const [open, setOpen] = useState(false)
  const [abilityRotationNames, setAbilityRotationNames] = useState([])
  const handleOpen = () => {
    setOpen(!open)
  }
  useEffect(() => {
    setOpen(open)
  }, [open])

  useEffect(() => {
    const rotationNames = localStorage.getItem('abilityRotationNames')
    if (rotationNames) {
      setAbilityRotationNames(JSON.parse(rotationNames))
    }
  }, [])

  const onClickHandler = (rotationName: string): void => {
    const abilityRotationText = localStorage.getItem(rotationName)
    if (abilityRotationText) {
      try {
        change(JSON.parse(abilityRotationText))
      } catch (e) {
        console.error('invalid json')
      }
    } else {
      console.error('Rotation not found from localStorage')
    }
    setOpen(false)
  }

  return (
    <div className="dropdown">
      <div className="dropdown__opener" onClick={(): void => handleOpen()}>
        Select...
        <Icon />
      </div>
      {open && (
        <div className="dropdown__content">
          {abilityRotationNames.map((rotationName) => (
            <p
              key={rotationName}
              onClick={(): void => onClickHandler(rotationName)}
            >
              {rotationName}
            </p>
          ))}
        </div>
      )}
    </div>
  )
}
