import './abilityIcon.css'
import { AbilityName, abilitiesMap } from '../abilities'

type AbilityIconProps = {
  abilityName: AbilityName
  isActive: boolean
  abilityIndex: number
  currentIndex: number
  middleOfScreen: number
}

const iconSize = 50
const borderSize = 3

export const AbilityIcon = ({
  abilityName,
  isActive,
  abilityIndex,
  currentIndex,
  middleOfScreen,
}: AbilityIconProps) => {
  const marginLeft = `${
    middleOfScreen + (abilityIndex - currentIndex) * iconSize - iconSize / 2
  }px`
  return (
    <div className="ability-icon__item-outer-container">
      <div draggable="false" className="ability-icon__item-container">
        <div
          style={{
            marginLeft,
          }}
        >
          <img
            src={abilitiesMap[abilityName]}
            width={iconSize - 2 * borderSize}
            height={iconSize - 2 * borderSize}
            className={`ability-icon__item ${
              isActive ? '--active' : '--inactive'
            }`}
          />
        </div>
      </div>
    </div>
  )
}
