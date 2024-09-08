import './abilityRotationVisualizer.css'
import { useEffect, useState, useRef } from 'react'
import { Ability } from '../abilities'
import { AbilityIcon } from './AbilityIcon'
import { Button } from './Button'
import BossTimerReader from '@alt1/bosstimer'
import { ArrowBackSvg } from './ArrowBackSvg'
import { ArrowForwardSvg } from './ArrowForwardSvg'

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
  setAbilityRotation: (rotation: Ability[]) => void
}

export const AbilityRotationVisualizer = ({
  abilityRotation,
  setAbilityRotation,
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
  const showArrows: boolean = localStorage.getItem('showArrowsChecked')
    ? JSON.parse(localStorage.getItem('showArrowsChecked')!)
    : true

  const [storedRotations, setStoredRotations] = useState<string[]>([])
  const [currentRotationIndex, setCurrentRotationIndex] = useState(0)
  const [nextRotation, setNextRotation] = useState<Ability[] | null>(null)

  useEffect(() => {
    const rotations = localStorage.getItem('multipleBossRotations')
    if (rotations) {
      setStoredRotations(JSON.parse(rotations))
    }
  }, [])

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
  }, [])

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

  const switchToNextRotation = () => {
    setCurrentRotationIndex((prevIndex) => {
      const nextIndex = (prevIndex + 1) % storedRotations.length
      const nextRotationName = storedRotations[nextIndex]
      const nextRotationData = localStorage.getItem(nextRotationName)
      if (nextRotationData) {
        setNextRotation(JSON.parse(nextRotationData))
      }
      return nextIndex
    })
  }

  const switchPreviousRotation = () => {
    setCurrentRotationIndex((prevIndex) => {
      const nextIndex =
        (prevIndex - 1 + storedRotations.length) % storedRotations.length
      const nextRotationName = storedRotations[nextIndex]
      const nextRotationData = localStorage.getItem(nextRotationName)
      if (nextRotationData) {
        setNextRotation(JSON.parse(nextRotationData))
      }
      return nextIndex
    })
  }

  useEffect(() => {
    if (nextRotation) {
      setAbilityRotation(nextRotation)
      setNextRotation(null)
    }
  }, [nextRotation, setAbilityRotation])

  useEffect(() => {
    const interval = setInterval(() => {
      if (useBosstimer) {
        if (!started && bossTimerReader.find() !== null) {
          handleStart()
          return
        } else if (started && bossTimerReader.find() === null) {
          handleReset()
          switchToNextRotation()
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
  }, [
    started,
    storedRotations,
    useBosstimer,
    bossTimerReader,
    abilityRotation,
    setAbilityRotation,
  ])

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
      <p>
        tick:{magicState.currentTick}{' '}
        {showArrows && (
          <>
            <Button onClick={switchPreviousRotation}>
              <ArrowBackSvg />
            </Button>
            <span>{storedRotations[currentRotationIndex]}</span>
            <Button onClick={switchToNextRotation}>
              <ArrowForwardSvg />
            </Button>
          </>
        )}
      </p>
    </div>
  )
}
