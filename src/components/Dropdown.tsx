import { Ability } from '../abilities'
import { DeleteSvg } from './DeleteSvg'
import { DropDownIcon } from './DropDownIcon'
import { Svg } from './Svg'
import './dropdown.css'
import { useEffect, useState } from 'react'

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
        localStorage.setItem(
          'onStartRotation',
          JSON.stringify({
            multiple: false,
            rotationName,
          })
        )
      } catch (e) {
        console.error('invalid json')
      }
    } else {
      setShownOption('Select...')
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
    setAbilityRotationNames(rotationNames)
  }

  return (
    <div className="dropdown" onClick={handleIsOpen}>
      <div tabIndex={0} className="dropdown__input-container">
        <span className="dropdown__value">{shownOption}</span>
        <DropDownIcon />
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
            <Svg
              className="dropdown__svg"
              tooltipText="Delete rotation"
              icon={
                <div onClick={() => deleteRotation(rotationName)}>
                  <DeleteSvg></DeleteSvg>
                </div>
              }
            ></Svg>
          </li>
        ))}
      </ul>
    </div>
  )
}
