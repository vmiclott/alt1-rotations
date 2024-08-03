import { BosstimerCheckbox } from './BosstimerCheckbox'
import './settings.css'
import { ShowArrowsCheckbox } from './ShowArrowsCheckbox'

export const Settings = ({}) => {
  return (
    <div className="settings">
      <BosstimerCheckbox />
      <ShowArrowsCheckbox />
    </div>
  )
}
