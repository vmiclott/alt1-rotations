import './abilityRotationVisualizer.css'
import { SetStateAction, useEffect, useState, useRef } from 'react'
import { Ability } from '../abilities'
import { AbilityIcon } from './AbilityIcon'
import { Button } from './Button'

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

type AbilityRotationVisualizerProps = {
  abilityRotation: Ability[]
}

export const AbilityRotationVisualizer = ({
  abilityRotation,
}: AbilityRotationVisualizerProps) => {
  const [magicState, setMagicState] = useState({
    currentIndex: 0,
    currentTick: 0,
  })
  const [started, setStarted] = useState(false)
  const [middleOfScreen, setMiddleOfScreen] = useState(0)
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleResize() {
      if (elementRef.current?.clientWidth) {
        setMiddleOfScreen(elementRef.current.clientWidth / 2)
      }
    }
    handleResize()

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [elementRef])

  const handleButtonStart = () => {
    setStarted(true)
    setMagicState({
      currentIndex: 0,
      currentTick: 0,
    })
  }

  useEffect(() => {
    if (!started) return
    const interval = setInterval(() => {
      setMagicState((magicState) => {
        const nextIndex = findNextIndex(
          abilityRotation,
          magicState.currentIndex
        )
        const newTick = magicState.currentTick + 1
        return {
          currentIndex:
            newTick === abilityRotation[nextIndex].tick
              ? nextIndex
              : magicState.currentIndex,
          currentTick: newTick,
        }
      })
    }, 600)

    return () => clearInterval(interval)
  }, [started])

  return (
    <div className="visualizer">
      <div className="visualizer__items-outer-container">
        <div ref={elementRef} className="visualizer__items-container">
          {abilityRotation.map(({ name, tick }, idx) => (
            <AbilityIcon
              key={idx}
              abilityIndex={idx}
              currentIndex={magicState.currentIndex}
              middleOfScreen={middleOfScreen}
              abilityName={name}
              isActive={tick === magicState.currentTick}
            />
          ))}
        </div>
      </div>
      <div className="visualizer__buttons-container">
        <Button
          className="visualizer__buttons-container__button"
          onClick={handleButtonStart}
        >
          Start
        </Button>
        <p>tick:{magicState.currentTick}</p>
      </div>
    </div>
  )
}
