import './abilityRotationLoader.css'
import { Dropdown } from './Dropdown'
import { Ability, abilitiesMap } from '../abilities'
import { MultiSelectDropdown } from './MultiSelectDropdown'
import { Button } from './Button'
import { DeleteSvg } from './DeleteSvg'
import { Svg } from './Svg'

type AbilityRotationLoaderProps = {
  setAbilityRotation: (newValue: Ability[]) => void
  abilityRotation: Ability[]
}

export const AbilityRotationLoader = ({
  setAbilityRotation,
  abilityRotation,
}: AbilityRotationLoaderProps) => {
  const handleLoad = (newValue: Ability[]) => {
    setAbilityRotation(newValue)
  }

  const deleteStoredMultipleBossRotations = () => {
    localStorage.removeItem('multipleBossRotations')
    setAbilityRotation([])
  }

  return (
    <div className="loader-container">
      <div className="loader-container__visualizer">
        {abilityRotation.map(({ name, tick, keybind }, idx) => (
          <div key={idx}>
            <img src={abilitiesMap[name]} width={50} height={50} />
            <div>{tick}</div>
            <div>{keybind}</div>
          </div>
        ))}
      </div>
      <div className="loader-container__loader">
        <label>Load rotation</label>
        <Dropdown setAbilityRotation={handleLoad} />
      </div>
      <div className="loader-container__loader">
        <label>Load multiple rotations </label>
        <div className="loader-container__multicontainer">
          <MultiSelectDropdown
            setSelectedRotations={(selectedRotations: string[]) => {
              localStorage.setItem(
                'multipleBossRotations',
                JSON.stringify(selectedRotations)
              )
              if (selectedRotations.length > 0) {
                const rotationData = localStorage.getItem(selectedRotations[0])
                if (rotationData) {
                  handleLoad(JSON.parse(rotationData))
                }
              }
            }}
          />
          <div className="loader-container__buttoncontainer">
            <Button
              className="loader-container__deletemultibutton"
              onClick={deleteStoredMultipleBossRotations}
            >
              <Svg
                tooltipText="Removes stored multipleBossRotations"
                icon={<DeleteSvg />}
              ></Svg>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
