import React, { useEffect, useState } from 'react'
import './dropdown.css'
import { DropDownIcon } from './DropDownIcon'

type DropdownProps = {
  setSelectedRotations: (newValue: string[]) => void
  clearOptionsRef: React.MutableRefObject<(() => void) | undefined>
}

export const MultiSelectDropdown: React.FC<DropdownProps> = ({
  setSelectedRotations,
  clearOptionsRef,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [abilityRotationNames, setAbilityRotationNames] = useState<string[]>([])
  const [rotationOptions, setRotationOptions] = useState<string[]>([])

  const handleIsOpen = () => {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    const rotationNames = localStorage.getItem('abilityRotationNames')
    if (rotationNames) {
      setAbilityRotationNames(JSON.parse(rotationNames))
    }
    const storedMultipleRotations = localStorage.getItem(
      'multipleBossRotations'
    )
    if (storedMultipleRotations) {
      const parsedOptions = JSON.parse(storedMultipleRotations)
      setRotationOptions(parsedOptions)
      setSelectedRotations(parsedOptions)
    }
  }, [])

  useEffect(() => {
    if (clearOptionsRef) {
      clearOptionsRef.current = () => {
        setRotationOptions([])
        setSelectedRotations([])
        localStorage.removeItem('multipleBossRotations')
        setIsOpen(false)
      }
    }
  }, [clearOptionsRef, setSelectedRotations])

  const handleOptionClick = (rotationName: string) => {
    let storedMultipleRotations
    if (rotationOptions.includes(rotationName)) {
      storedMultipleRotations = rotationOptions.filter(
        (item) => item !== rotationName
      )
    } else {
      storedMultipleRotations = [...rotationOptions, rotationName]
    }
    setRotationOptions(storedMultipleRotations)
    setSelectedRotations(storedMultipleRotations)
    localStorage.setItem(
      'multipleBossRotations',
      JSON.stringify(storedMultipleRotations)
    )
    localStorage.setItem(
      'onStartRotation',
      JSON.stringify({
        multiple: true,
        storedMultipleRotations,
      })
    )
  }

  return (
    <div className="dropdown" onClick={handleIsOpen}>
      <div tabIndex={0} className="dropdown__input-container">
        <span className="dropdown__value">
          {rotationOptions.length > 0
            ? rotationOptions.join(', ')
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
              rotationOptions.includes(rotationName) ? 'selected' : ''
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
