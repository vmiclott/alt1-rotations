import './abilityRotationVisualizer.css'
import { useEffect, useState, useRef } from 'react'
import { Ability } from '../abilities'
import { AbilityIcon } from './AbilityIcon'
import { Button } from './Button'
import BossTimerReader from '@alt1/bosstimer'

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

const debounce = (func: (...args: any[]) => void, wait: number) => {
  let timeout: ReturnType<typeof setTimeout>
  return (...args: any[]) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
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
  const useBosstimer: boolean = localStorage.getItem('bosstimerChecked')
    ? JSON.parse(localStorage.getItem('bosstimerChecked')!)
    : true

  useEffect(() => {
    const handleResize = debounce(() => {
      if (elementRef.current?.clientWidth) {
        setMiddleOfScreen(elementRef.current.clientWidth / 2)
      }
    }, 200)

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [elementRef])

  const handleStart = () => {
    setStarted(true)
    setMagicState({
      currentIndex: 0,
      currentTick: 0,
    })
  }

  const handleReset = () => {
    setStarted(false)
    setMagicState({
      currentIndex: 0,
      currentTick: 0,
    })
  }

  const bossTimerReader = new BossTimerReader()

  useEffect(() => {
    const interval = setInterval(() => {
      if (useBosstimer) {
        if (!started && bossTimerReader.find() !== null) {
          handleStart()
          return
        } else if (started && bossTimerReader.find() === null) {
          handleReset()
          return
        }
      }
      if (!started) return
      else {
        setMagicState((magicState) => {
          const nextIndex = findNextIndex(
            abilityRotation,
            magicState.currentIndex
          )
          const newTick = magicState.currentTick + 1
          return {
            currentIndex:
              newTick === abilityRotation[nextIndex]?.tick
                ? nextIndex
                : magicState.currentIndex,
            currentTick: newTick,
          }
        })
      }
    }, 600)

    return () => clearInterval(interval)
  }, [started])

  return (
    <div className="visualizer">
      <div className="visualizer__items-outer-container">
        <div ref={elementRef} className="visualizer__items-container">
          {abilityRotation.map(({ name, tick, keybind }, idx) => (
            <AbilityIcon
              key={idx}
              abilityIndex={idx}
              currentIndex={magicState.currentIndex}
              middleOfScreen={middleOfScreen}
              abilityName={name}
              isActive={tick === magicState.currentTick}
              keybind={keybind}
            />
          ))}
        </div>
      </div>
      {!useBosstimer && (
        <div className="visualizer__buttons-container">
          <Button
            className="visualizer__buttons-container__button"
            onClick={handleStart}
          >
            Start
          </Button>
          <Button
            className="visualizer__buttons-container__button"
            onClick={handleReset}
          >
            Reset
          </Button>
        </div>
      )}
      <p>tick:{magicState.currentTick}</p>
    </div>
  )
}
