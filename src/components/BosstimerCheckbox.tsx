import { useEffect, useState } from 'react'
import { Checkbox } from './Checkbox'

export const BosstimerCheckbox = () => {
  const [checked, setChecked] = useState<boolean>(() => {
    const storedValue = localStorage.getItem('bosstimerChecked')
    return storedValue ? JSON.parse(storedValue) : true
  })

  useEffect(() => {
    localStorage.setItem('bosstimerChecked', `${checked}`)
  }, [checked])

  return (
    <Checkbox
      setChecked={setChecked}
      checked={checked}
      labelText={'Use boss timer'}
    />
  )
}
