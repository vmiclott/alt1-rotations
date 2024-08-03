import { useEffect, useState } from 'react'
import { Checkbox } from './Checkbox'

export const ShowArrowsCheckbox = () => {
  const [checked, setChecked] = useState<boolean>(() => {
    const storedValue = localStorage.getItem('showArrowsChecked')
    return storedValue ? JSON.parse(storedValue) : true
  })

  useEffect(() => {
    localStorage.setItem('showArrowsChecked', `${checked}`)
  }, [checked])

  return (
    <Checkbox
      setChecked={setChecked}
      checked={checked}
      labelText={'Show arrow buttons in visualizer, good for boss dungeons'}
    />
  )
}
