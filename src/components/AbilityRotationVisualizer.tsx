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
import { findReadLine } from '@alt1/ocr'

import { font } from './font'

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
  'iVBORw0KGgoAAAANSUhEUgAAACoAAAAUCAYAAAD7s6+GAAAFDUlEQVRIS71Xb0xVZRj/He653KsiSoCo686RUlqkEz+0FLlRIJOsDwnoXMO1Kf1xEVtrbG59amv0l8jKldbmcsAAozk3P7TpRogW6w/VWtPxwcnWSkEuXuBezj33tOc55zn3Pccb61Pvxu77Pn9/z+953/O+aPdtKrOg63BHIsFTLZWCRfJw2FY5crZNpTJ6cXTkos8EhB2D/MVGXZOh5PflYDn9JRLQ1pdGLAJEwDyDgOblQSNnmofDrg0XQMUkErbc+VWLYAOKqet2wUqBEo9kHF8ZHC8ez+ST3C5Qf1LHmQvwFSHgNDMFK6BzUAEu7GjJBKxQ2Gaf7GgO2KCdIu/yl1xOcWoR2vrIGksN5AHlBE3PzSJn6TI3KScMKNtF1+G3Eb3EJuCmabpx3HY7JJAd6WkEAgGXY/Hh1rvgnIRkSAwwKwEd6YWkxzmbjuyEIWbMYVsyypp+Pa1W8rCctkPS3g5qbm3D2mJLTSyGqkwNLs45uaG7gAkAFbT4imwxG+8hgUsWF06MCnPCBP0Onv8G5Zu3uL4j3w7h4P4GXpOu9YVDuHH9uj+2y4Qay8Ogs2X8xav22QplRrNluzAyil27avHH1Wus7ujoQDAQwPHOtyG6+dgky/6PsSjQmtpaJGdsMJF16/BFdx8qHi7H2G+/4/vRUextsBk+f+4sWp8/xHOyO9UzwL80Pvv4GN558w2eU4eoGzLIh3xptBx5Ga8dfZ3navceeXQHTg8M4j8DpSCmlcYrba9ifHwcNycnEa3cjvh8ktfRyh0Ia/apXXNvBFd+GINhmpiamsK2zeUIpA2c6h3AR12d6DnzNdsVFBQgBBONjY3Y/2wznt5Tj8mZWbS3t2NVURF3j8Z80lgcqLAiVe6p382OxGhLSwsuXryASHEBbwViP3XnNnJyNE5a9+RTqKyKsn1Z2Qak4zFURqPoOn4Cnxzrwle93YjFppFOW/iy7wy276zy7KCxn39C9c5KFOYvYzl/R9VPglhL8qvX7D1KY2koF2sLV7jA4lN/s0xsaZscaW3jFne+9y4uXf4OQ5dG0NTUBHN2mrfQXHIBzYdfZNao9ZeHh/DhpyfR3dOL0909HrChoM5EMFD186Raqcn9B8avU9fd/YP4/OQJ9PX3Y8tDD2J49EdseuB+0MGLPlbN+49GVU0dDjQfRPO+BtTU1KCt/Sjqn6hG3pKQu7/pq+LuUbmZPKU4n6C9DY3uYVL1dCBUnbreurXCPTCUKH/lClRUbGNGiW05MBSv7vEohkeucJee2XcAb73/Aachv5cOP4dffxnjLnj2aLZv141b01hdsNz9BPG16NwcpCspKUKuc49PTPyJ1ffks23CtDDx1y1OSmvTshApXgk9N4Tp2AwfGBnUWmoxxZ6Jz+Hm7Zjtp+soWVWIMNJ26zeWRizDuW+DLNSQMk3ooTBYrusIpgwYepDverIxkJN5mik2FNCAhiCsjL2u23GUQSAMApMyAD3Icx5ipzw7Jbe2sazUvuvlrUjJGJB9D1BiqZCD8/tw3g7M4N00tr0ezNiIPryEQSwozzqO4wB1fxmsTUqQ4+swEgmOlwHqKPxPOg8VspD3ZfyOLclbDtBcgNFaGFJJkAezA8iNTX7+h7cQQjpuvbzwlbegyzBZ0MOWEkhCeeiKzF8J2Qkg1U+1kxaL3tfRTAHOU5LetAzUn1TdKyowYUn2kCT4t4Lk3xi/nepPvn4isqz/AQgLFYzz8wP3AAAAAElFTkSuQmCC'

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
        const phase = captureHold(phaseImgPos.x, phaseImgPos.y, 60, 20)
        const imgFullRs = captureHoldFullRs()
        alt1.overLayRect(
          mixColor(255, 255, 255),
          phaseImgPos.x,
          phaseImgPos.y,
          42,
          20,
          600,
          2
        )
        alt1.overLayRect(
          mixColor(255, 0, 0),
          phaseImgPos.x,
          phaseImgPos.y,
          60,
          20,
          600,
          2
        )
        console.log('phase base64', phase.toData().toPngBase64())
        const {
          debugArea,
          text: myText,
          fragments,
        } = findReadLine(
          imgFullRs.toData(),
          font,
          [[255, 255, 255]],
          phaseImgPos.x,
          phaseImgPos.y,
          60,
          20
        )
        console.log(myText)
        console.log({ debugArea, myText, fragments })
        alt1.overLayRect(
          mixColor(0, 255, 0),
          debugArea.x,
          debugArea.y,
          debugArea.w,
          debugArea.h,
          600,
          2
        )
        const text = alt1.bindReadString(phase.handle, 'chat', 0, 0)
        const newPhase = text.match(/Phase: (\d{1})/)
        if (newPhase && newPhase.length > 0) {
          console.log('set phase', newPhase[1])
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
