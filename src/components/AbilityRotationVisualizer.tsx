import { SetStateAction, useEffect, useState } from 'react'
import './abilityRotationVisualizer.css'
import { Ability, abilitiesMap } from '../abilities'
import { Dropdown } from './Dropdown'
import { AbilityRotationCreator } from './AbilityRotationCreator'

type AbilityRotationVisualizerProps = {
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

export const AbilityRotationVisualizer = ({
  size,
}: AbilityRotationVisualizerProps) => {
  const offSet = Math.floor(size / 2)
  const [abilityRotation, setAbilityRotation] = useState<Ability[]>([])
  const [magicState, setMagicState] = useState({
    currentIndex: 0,
    currentTick: 0,
  })
  const [started, setStarted] = useState(false)

  const handleButtonStart = () => {
    setStarted(true)
    setMagicState({
      currentIndex: 0,
      currentTick: 0,
    })
  }

  function handleStateFromDropdown(newValue: SetStateAction<Ability[]>) {
    setAbilityRotation(newValue)
    setStarted(false)
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
    <>
      <div>
        {<button onClick={handleButtonStart}>Start</button>}
        {<p>tick: {magicState.currentTick}</p>}
        <div className="rotation-visualizer-items-outer-container">
          <div className="rotation-visualizer-items-container">
            {abilityRotation
              .slice(magicState.currentIndex, magicState.currentIndex + size)
              .map(({ name, tick }, idx) => (
                <div
                  className="rotation-visualizer-item-outer-container"
                  key={idx}
                >
                  <div
                    draggable="false"
                    className="rotation-visualizer-item-container"
                  >
                    <div className={`rotation-visualizer-item-${idx}`}>
                      <img
                        src={abilitiesMap[name]}
                        width="50"
                        height="50"
                        className={
                          tick === magicState.currentTick
                            ? 'rotation-visualizer-item-active'
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
      <div className="nisseperator relative"></div>

      <AbilityRotationCreator />
      <div className="nisseperator relative"></div>
      <div className="visualizer-load-container">
        <label>Load rotation</label>
        <Dropdown change={handleStateFromDropdown} />
      </div>
    </>
  )
}
