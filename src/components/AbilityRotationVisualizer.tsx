import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import './abilityRotationVisualizer.css'
import { Ability, abilitiesMap } from '../abilities'

const defaultRotation: Ability[] = [
  { name: 'resonance', tick: -1 },
  { name: 'sever', tick: -1 },
  { name: 'resonance', tick: 0 },
  { name: 'sever', tick: 3 },
  { name: 'wrack', tick: 6 },
  { name: 'combust', tick: 7 },
  { name: 'resonance', tick: 9 },
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
  const [size, setSize] = useState(0)
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleResize() {
      if (elementRef.current?.clientWidth) {
        // Set how many abilities are showing (odd)
        // 80 comes from 50px img width + 30px gap
        setSize(Math.floor(elementRef.current.clientWidth / 80) | 1)
      }
    }

    if (elementRef.current?.clientWidth) {
      setSize(Math.floor(elementRef.current.clientWidth / 80) | 1)
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [elementRef])

  const offSet = Math.floor(size / 2)
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
        currentIndex: 0,
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
      <div ref={elementRef} className="visualizer__items-outer-container">
        <div className="visualizer__items-container">
          {abilityRotation
            .slice(magicState.currentIndex, magicState.currentIndex + size)
            .map(({ name, tick }, idx) => (
              <div className="visualizer__item-outer-container" key={idx}>
                <div draggable="false" className="visualizer__item-container">
                  <div
                    style={{ transform: `translateX(${(100 / size) * idx}%` }}
                  >
                    <img
                      src={abilitiesMap[name]}
                      width="50"
                      height="50"
                      className={
                        tick === magicState.currentTick
                          ? 'visualizer__items --active'
                          : ''
                      }
                    />
                  </div>
                </div>
              </div>
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
