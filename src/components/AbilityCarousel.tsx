import { useEffect, useState } from 'react'
import './abilityCarousel.css'
import { Ability, abilitiesMap } from '../abilities'

type AbilityCarouselProps = {
  size: number
  abilities: Ability[]
}

const findNextIndex = (abilities: Ability[], currentIndex: number): number => {
  let nextIndex = currentIndex + 1
  while (abilities[nextIndex] && abilities[nextIndex].tick === abilities[currentIndex].tick) {
    nextIndex++
  }
  return nextIndex
}

export const AbilityCarousel = ({ abilities, size }: AbilityCarouselProps) => {
  const offSet = Math.floor(size / 2)
  const [magicState, setMagicState] = useState({
    currentIndex: 0,
    currentTick: 0,
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setMagicState(magicState => {
        const nextIndex = findNextIndex(abilities, magicState.currentIndex + offSet)
        const newAbility = abilities[nextIndex]
        const newTick = magicState.currentTick + 1
        let newIndex = magicState.currentIndex + offSet
        if (newAbility) {
          if (newAbility.tick === newTick) {
            newIndex = nextIndex
          }
        }

        return {
          currentIndex: newIndex - offSet,
          currentTick: newTick,
        }
      })
    }, 600)

    return () => clearInterval(interval)
  }, [])

  return (
    <div>
      <p>tick: {magicState.currentTick}</p>
      <div className="carousel-items-outer-container">
        <div className="carousel-items-container">
          {abilities.slice(magicState.currentIndex, magicState.currentIndex + size).map(({ name, tick }, idx) => (
            <div className="carousel-item-outer-container" key={idx}>
              <div draggable="false" className="carousel-item-container">
                <div className={`carousel-item-${idx}`}>
                  <img
                    src={abilitiesMap[name]}
                    width="50"
                    height="50"
                    className={tick === magicState.currentTick ? 'carousel-item-active' : ''}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
