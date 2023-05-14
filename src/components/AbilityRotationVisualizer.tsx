import { useEffect, useRef, useState } from 'react'
import './abilityRotationVisualizer.css'
import { Ability } from '../abilities'
import { AbilityIcon } from './AbilityIcon'

const defaultRotation: Ability[] = [
  { name: 'resonance', tick: 0 },
  { name: 'sever', tick: 3 },
  { name: 'wrack', tick: 3 },
  { name: 'combust', tick: 3 },
  { name: 'resonance', tick: 6 },
  { name: 'sever', tick: 9 },
  { name: 'punish', tick: 12 },
  { name: 'preparation', tick: 12 },
  { name: 'anticipation', tick: 15 },
  { name: 'barricade', tick: 18 },
  { name: 'berserk', tick: 21 },
  { name: 'sever', tick: 24 },
  { name: 'resonance', tick: 27 },
]

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

export const AbilityRotationVisualizer = () => {
  const [abilityRotation, setAbilityRotation] =
    useState<Ability[]>(defaultRotation)

  const [magicState, setMagicState] = useState({
    currentIndex: 0,
    currentTick: 0,
  })
  const [started, setStarted] = useState(false)
  const [abilityRotationName, setAbilityRotationName] = useState('')
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

  const handleLoad = () => {
    const abilityRotationText = localStorage.getItem(abilityRotationName)
    if (abilityRotationText) {
      setAbilityRotation(JSON.parse(abilityRotationText))
      setStarted(false)
      setMagicState({
        currentIndex: 0, // currently highlighted ability index
        currentTick: 0,
      })
    }
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
    <div>
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
      <div>
        <button onClick={handleButtonStart}>Start</button>
        <p>tick:{magicState.currentTick}</p>
      </div>
      <div className="ability-rotation-visualizer-load-rotation-container">
        <input
          className="ability-rotation-loader-input"
          value={abilityRotationName}
          onChange={(e) => setAbilityRotationName(e.target.value)}
        ></input>
        <button onClick={handleLoad}>Load</button>
      </div>
    </div>
  )
}
