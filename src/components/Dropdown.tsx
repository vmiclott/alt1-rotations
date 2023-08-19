import { Ability } from '../abilities'
import { DeleteSvg } from './DeleteSvg'
import { Svg } from './Svg'
import './dropdown.css'
import { useEffect, useState } from 'react'

const Icon = () => {
  return (
    <svg fill="white" height="24" width="24" viewBox="0 0 20 20">
      <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
    </svg>
  )
}

type DropdownProps = {
  setAbilityRotation: (newValue: Ability[]) => void
}

export const Dropdown = ({ setAbilityRotation }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [abilityRotationNames, setAbilityRotationNames] = useState([])
  const [shownOption, setShownOption] = useState('Select...')
  const handleIsOpen = () => {
    setIsOpen(!isOpen)
  }

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
        setAbilityRotation(JSON.parse(abilityRotationText))
      } catch (e) {
        console.error('invalid json')
      }
    } else {
      console.error('Rotation not found from localStorage')
    }
  }

  const deleteRotation = (rotationName: string) => {
    const abilityRotationLocalStorage = localStorage.getItem(
      'abilityRotationNames'
    )
    if (!abilityRotationLocalStorage) return

    const rotationNames = JSON.parse(abilityRotationLocalStorage)
    const indexToDelete = rotationNames.indexOf(rotationName)

    if (indexToDelete === -1) {
      return
    }

    rotationNames.splice(indexToDelete, 1)
    localStorage.setItem('abilityRotationNames', JSON.stringify(rotationNames))
    localStorage.removeItem(rotationName)
    setAbilityRotation(rotationNames)
  }

  return (
    <div className="dropdown" onClick={handleIsOpen}>
      <div tabIndex={0} className="dropdown__input-container">
        <span className="dropdown__value">{shownOption}</span>
        <Icon />
      </div>
      <ul className={`dropdown__options ${isOpen ? '--show' : ''}`}>
        {abilityRotationNames.map((rotationName) => (
          <li
            key={rotationName}
            onClick={(e) => {
              e.stopPropagation()
              setShownOption(rotationName)
              onClickHandler(rotationName)
              setIsOpen(false)
            }}
            className="dropdown__option"
          >
            {rotationName}
            <div className="dropdown__trashcan-container">
              <Svg
                className="dropdown__svg"
                tooltipText="Delete rotation"
                icon={
                  <div onClick={() => deleteRotation(rotationName)}>
                    <DeleteSvg></DeleteSvg>
                  </div>
                }
              ></Svg>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
