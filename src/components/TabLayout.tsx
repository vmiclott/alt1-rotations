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
        Home
      </Link>
      <Link
        to="/creator"
        className={`tab-layout__link ${
          location.pathname === '/creator' ? '--active' : ''
        }`}
      >
        Create
      </Link>
      <Link
        to="/loader"
        className={`tab-layout__link ${
          location.pathname === '/loader' ? '--active' : ''
        }`}
      >
        Load
      </Link>
    </div>
  )
}
