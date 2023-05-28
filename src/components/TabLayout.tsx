import { HomeSvg } from './HomeSvg'
import { LoadSvg } from './LoadSvg'
import { SettingsSvg } from './SettingsSvg'
import { Svg } from './Svg'
import { CreatorSvg } from './CreatorSvg'
import './tabLayout.css'
import { Link, useLocation } from 'react-router-dom'

export const TabLayout = () => {
  const location = useLocation()
  return (
    <div className="tab-layout">
      <Link
        to="/"
        className={`tab-layout__link ${
          location.pathname === '/' ? '--active' : ''
        }`}
      >
        <Svg
          className="tab-layout__svg"
          tooltipText="Home"
          icon={<HomeSvg />}
        ></Svg>
      </Link>
      <Link
        to="/creator"
        className={`tab-layout__link ${
          location.pathname === '/creator' ? '--active' : ''
        }`}
      >
        <Svg
          className="tab-layout__svg"
          tooltipText="Create rotation"
          icon={<CreatorSvg />}
        ></Svg>
      </Link>
      <Link
        to="/loader"
        className={`tab-layout__link ${
          location.pathname === '/loader' ? '--active' : ''
        }`}
      >
        <Svg
          className="tab-layout__svg"
          tooltipText="Load rotation"
          icon={<LoadSvg />}
        ></Svg>
      </Link>
      <Link
        to="/settings"
        className={`tab-layout__link ${
          location.pathname === '/settings' ? '--active' : ''
        }`}
      >
        <Svg
          className="tab-layout__svg"
          tooltipText="Settings"
          icon={<SettingsSvg />}
        ></Svg>
      </Link>
    </div>
  )
}
