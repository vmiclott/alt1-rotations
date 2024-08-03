import React, { useEffect, useState } from 'react'
import './dropdown.css'
import { DropDownIcon } from './DropDownIcon'

type DropdownProps = {
  setSelectedRotations: (newValue: string[]) => void
}

export const MultiSelectDropdown: React.FC<DropdownProps> = ({
  setSelectedRotations,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [abilityRotationNames, setAbilityRotationNames] = useState<string[]>([])
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])

  const handleIsOpen = () => {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    const rotationNames = localStorage.getItem('abilityRotationNames')
    if (rotationNames) {
      setAbilityRotationNames(JSON.parse(rotationNames))
    }
    const storedSelectedOptions = localStorage.getItem('multipleBossRotations')
    if (storedSelectedOptions) {
      const parsedOptions = JSON.parse(storedSelectedOptions)
      setSelectedOptions(parsedOptions)
      setSelectedRotations(parsedOptions)
    }
  }, [])

  const handleOptionClick = (rotationName: string) => {
    let updatedSelectedOptions
    if (selectedOptions.includes(rotationName)) {
      updatedSelectedOptions = selectedOptions.filter(
        (item) => item !== rotationName
      )
    } else {
      updatedSelectedOptions = [...selectedOptions, rotationName]
    }
    setSelectedOptions(updatedSelectedOptions)
    setSelectedRotations(updatedSelectedOptions)
    localStorage.setItem(
      'multipleBossRotations',
      JSON.stringify(updatedSelectedOptions)
    )
    localStorage.setItem(
      'onStartRotation',
      JSON.stringify({
        multiple: true,
        updatedSelectedOptions,
      })
    )
  }

  return (
    <div className="dropdown" onClick={handleIsOpen}>
      <div tabIndex={0} className="dropdown__input-container">
        <span className="dropdown__value">
          {selectedOptions.length > 0
            ? selectedOptions.join(', ')
            : 'Select options'}
        </span>
        <DropDownIcon />
      </div>
      <ul className={`dropdown__options ${isOpen ? '--show' : ''}`}>
        {abilityRotationNames.map((rotationName) => (
          <li
            key={rotationName}
            onClick={(e) => {
              e.stopPropagation()
              handleOptionClick(rotationName)
            }}
            className={`dropdown__option ${
              selectedOptions.includes(rotationName) ? 'selected' : ''
            }`}
          >
            {rotationName}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default MultiSelectDropdown
