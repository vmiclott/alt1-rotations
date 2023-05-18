import './abilityRotationVisualizer.css'
import { useEffect, useState, useRef } from 'react'
import { Ability } from '../abilities'
import { AbilityIcon } from './AbilityIcon'
import { Button } from './Button'
import {
  ImageDetect,
  captureHold,
  captureHoldFullRs,
  mixColor,
} from '@alt1/base/dist'

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

const base64PhaseImage =
  'iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAC30lEQVRYR+2UX0hTcRTHv3PTa1HmKtGk4YsWlSnON1suayqZ9ZCbisR8sVVIJkQMhJ6CsL9mVlJaIMUm/smIwIdAwXRao0CICMUHUYjSzW3NP1PvbpzfuNeb2Fvgyz0v93d+5/zOOfdzzu+nSk1OEAQuFqrQEgS1Bip+FaKQHl4OISqGY/ukk6z3EW3i/kZx1vuIOVRUQE/ve6RnZEqJXR8GUFluZjrZai5WYWpyUrLLFxsVJf+BjQqW77EC+lxuFBTk4/vYODtbX1+PaLUazQ23IdoW/R62979FKsCUn49QIJJEl5KCF44O6A+nY/TrN3xyu1FijhDpffcWNReq2Jr82pxd7Evy7HET7ty8wdZElOiJQmfoLImt+jKu1V2PtFMkIC+AjLwQxpXaq5iYmMCMxwOjIQfBxRDTjYYjiFXxLMCevTqMfB7FCs/D6/UiOyMd6vAK2tq78KixAc7uN8xPq9WCAw+LxYLyc1acKS6CJzC/VoD4F+RMM1BcdJIdJAI2mw39/X3QJWhZS6jY1d9ziIpSsWCFp07DkGtk/mlpqQgH/TAYjWhsbsGTpka8bnfA7/chHBbwsqMbOUdzJTJ/ERgbj8wAyVYuBsm7dkgJg95fbE8sgNpVXVPLUDfcu4uh4Y8YGHKhtLQU/LyPtXIhtAzr+Uuw2+2sbcODA3j4tBUOZzteOZz/boF80OQJKahcd3T24HlrCzo6O5F56CAG3V9wYP8+0MAaj+UxkiS5pkJUWCthLTPDZDKh1l6HohN52LaFi7SAhqXEbJGGUF7Aeptcz8rSS4NG1zQufgf0+mxGgOiIg0bxCo8bMegaYVTPllXg1v0HawRoNTXrQ5J2u3TV2P3WaNgDRbbExN2IoceIi8X09A8k7Yxjvku8gOmfsywY6bwgQJcQD00MB58/wAZNFJohLlrDHrRAcAEzc36o5H+7GWulAIWAQkAhoBBQCCgEFAIKAYXAphP4Az52Y2lqTMyvAAAAAElFTkSuQmCC'

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
  const [phaseImgPos, setPhaseImgPos] = useState<{ x: number; y: number }>()
  const [currentPhase, setCurrentPhase] = useState(1)
  const [phaseImage, setPhaseImage] = useState<ImageData>()

  useEffect(() => {
    const loadData = async () => {
      const imageData = await ImageDetect.imageDataFromBase64(base64PhaseImage)
      setPhaseImage(imageData)
    }
    loadData()
  }, [])

  useEffect(() => {
    if (phaseImgPos || !phaseImage) return
    const intervalId = setInterval(() => {
      const imgFullRs = captureHoldFullRs()
      const subImg = imgFullRs.findSubimage(phaseImage)
      if (subImg.length > 0) {
        setPhaseImgPos({ x: subImg[0].x, y: subImg[0].y })
        clearInterval(intervalId)
      }
    }, 600)
  }, [phaseImage, phaseImgPos])

  useEffect(() => {
    setInterval(() => {
      if (phaseImgPos) {
        const phase = captureHold(phaseImgPos.x - 5, phaseImgPos.y - 5, 60, 24)
        alt1.overLayRect(
          mixColor(255, 255, 255),
          phaseImgPos.x - 5,
          phaseImgPos.y - 5,
          60,
          24,
          600,
          5
        )
        alt1.overLayRect(
          mixColor(255, 0, 0),
          phaseImgPos.x,
          phaseImgPos.y,
          60,
          24,
          600,
          5
        )
        const text = alt1.bindReadString(phase.handle, 'chat', 10, 12)
        const newPhase = text.match(/Phase: (\d{1})/)
        if (newPhase && newPhase.length > 0) {
          setCurrentPhase(parseInt(newPhase[1]))
        }
      }
    }, 600)
  }, [phaseImgPos])

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
        <p>
          tick:{magicState.currentTick} phase: {currentPhase}
        </p>
      </div>
    </div>
  )
}
