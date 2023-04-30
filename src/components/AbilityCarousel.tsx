import { useEffect, useState } from 'react'
import './abilityCarousel.css'
import { Ability, abilitiesMap } from '../abilities'

type AbilityCarouselProps = {
  size: number
}

const findNextIndex = (abilities: Ability[], currentIndex: number): number => {
  let nextIndex = currentIndex + 1
  while (
    abilities[nextIndex] &&
    abilities[nextIndex].tick === abilities[currentIndex].tick
  ) {
    nextIndex++
  }
  return nextIndex
}

export const AbilityCarousel = ({ size }: AbilityCarouselProps) => {
  const offSet = Math.floor(size / 2)
  const [abilityRotation, setAbilityRotation] = useState<Ability[]>([])
  const [magicState, setMagicState] = useState({
    currentIndex: 0,
    currentTick: 0,
  })
  const [started, setStarted] = useState(false)
  const [abilityRotationName, setAbilityRotationName] =
    useState('ability-rotation')

  const handleButtonStart = () => {
    setStarted(true)
    setMagicState({
      currentIndex: 0,
      currentTick: 0,
    })
  }

  const handleLoad = () => {
    const abilityRotationText = localStorage.getItem(abilityRotationName)
    if (abilityRotationText) {
      setAbilityRotation(JSON.parse(abilityRotationText))
    }
  }

  useEffect(() => {
    if (!started) return
    const interval = setInterval(() => {
      setMagicState((magicState) => {
        const nextIndex = findNextIndex(
          abilityRotation,
          magicState.currentIndex + offSet
        )
        const newAbility = abilityRotation[nextIndex]
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
  }, [started])

  return (
    <div>
      <button onClick={handleButtonStart}>Start</button>
      <div className="ability-carousel-load-rotation-container">
        <input
          value={abilityRotationName}
          onChange={(e) => setAbilityRotationName(e.target.value)}
        ></input>
        <button onClick={handleLoad}>Load</button>
      </div>
      <p>tick: {magicState.currentTick}</p>
      <div className="carousel-items-outer-container">
        <div className="carousel-items-container">
          {abilityRotation
            .slice(magicState.currentIndex, magicState.currentIndex + size)
            .map(({ name, tick }, idx) => (
              <div className="carousel-item-outer-container" key={idx}>
                <div draggable="false" className="carousel-item-container">
                  <div className={`carousel-item-${idx}`}>
                    <img
                      src={abilitiesMap[name]}
                      width="50"
                      height="50"
                      className={
                        tick === magicState.currentTick
                          ? 'carousel-item-active'
                          : ''
                      }
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
