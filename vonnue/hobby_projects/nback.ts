import React from "react"
import { Meta, Story } from "@storybook/react"
import defaultNbackData from "../src/attayn-data/n-backtask-game"
import { NbackGameRoundCanvasProps } from "../src/nback-task/pages/NbackGameRoundCanvas"
import NbackGameRoundCanvas from "../src/nback-task/pages/NbackGameRoundCanvas"

const meta: Meta = {
  title: "GameCanvas",
  component: NbackGameRoundCanvas,
  argTypes: {
    data: {
      control: {
        type: "text",
      },
      
    },
  },
  parameters: {
    controls: { expanded: true },
  },
}

export default meta

const Template: Story<NbackGameRoundCanvasProps> = (args) => (
  <NbackGameRoundCanvas {...args} />
)

export const Default = Template.bind({})
Default.args = {
  data: defaultNbackData,
}

import React from "react"
import { Meta, Story } from "@storybook/react"
import defaultNbackData from "../src/attayn-data/n-backtask-game"
import { GameRoundProps } from "../src/nback-task/containers/GameRound"
import GameRound from "../src/nback-task/containers/GameRound"

const meta: Meta = {
  title: "GameRound",
  component: GameRound,
  argTypes: {
    data: {
      control: {
        type: "text",
      },
    },
  },
  parameters: {
    controls: { expanded: true },
  },
}

export default meta

const Template: Story<GameRoundProps> = (args) => <GameRound {...args} />

export const Default = Template.bind({})
Default.args = {
  data: defaultNbackData,
}

import React, { useEffect, useState } from "react"
import ConcludeGame from "../../attayn-ui/containers/ConcludeGame"
import GameCanvas from "../../attayn-ui/containers/GameCanvas"
import { GameClosure, AbortGame, GameIntroduction } from "../../attayn-types"
import GameRound from "../containers/GameRound"
import { GameRoundOption } from "../../attayn-types/n-back-game"
import GameIntroductionCanvas from "../../attayn-ui/components/GameIntroductionCanvas"
import ConfirmExitPullup from "../../attayn-ui/containers/ConfirmExitPullup"

export interface NbackGameRoundCanvasProps {
  abortGame: AbortGame
  finishGame: GameClosure
  gameIntroduction: GameIntroduction
  gameRoundOptions: GameRoundOption[]
  gameTimeout: GameClosure
  handleContinue: () => void
  handleExit: () => void
  timeInSeconds: number
  warningInSeconds: number
  buttonLabel: string
}

function NbackGameRoundCanvas({
  abortGame,
  finishGame,
  gameIntroduction,
  gameRoundOptions,
  gameTimeout,
  handleContinue,
  handleExit,
  timeInSeconds,
  warningInSeconds,
  buttonLabel,
}: NbackGameRoundCanvasProps) {
  const [currentRoundIndex, setCurrentRoundIndex] = useState(0)
  const [shouldShowSuccessPage, setShouldShowSuccessPage] = useState(false)
  const [showGameIntroPage, setIsShowGameIntroPage] = useState(false)
  const [shouldShowConfirmExit, setShouldShowConfirmExit] = useState(false)
  const [currentRound, SetCurrentRound] = useState<GameRoundOption>()

  useEffect(() => {
    const tempOptions = gameRoundOptions[currentRoundIndex]

    SetCurrentRound(tempOptions)
  }, [currentRoundIndex, gameRoundOptions])

  const isLastRound = currentRoundIndex === gameRoundOptions.length - 1

  const handleConfirmButton = () => {
    if (!isLastRound) {
      setCurrentRoundIndex((prev) => prev + 1)
    }
    if (isLastRound) {
      setShouldShowSuccessPage(true)
    }
  }

  const shouldShow = () => {
    setIsShowGameIntroPage(true)
  }

  const onConfirmExitClose = () => {
    setShouldShowConfirmExit(false)
  }
  const handleExitButton = () => {
    setShouldShowConfirmExit(true)
  }

  return (
    <div className="h-screen w-screen relative" data-testid="game-round-canvas">
      {!showGameIntroPage && (
        <div className="absolute inset-0">
          <GameIntroductionCanvas
            buttonLabel={gameIntroduction.buttonLabel}
            handleExitButton={handleExitButton}
            handleNextButton={shouldShow}
            instructionMessage={gameIntroduction.instructionMessage}
            instructionText={gameIntroduction.instructionText}
          >
            <div>
              {gameIntroduction.guideLines.map((guideLine) => (
                <div className="flex py-2" key={gameIntroduction.buttonLabel}>
                  <div className="flex items-center gap-x-3 w-1/2">
                    {gameIntroduction.bulletingIcon}
                    <span className="text-body text-abbey-gray font-regular">
                      {guideLine.steps}
                    </span>
                  </div>
                  <div className="text-left text-body text-abbey-gray font-semibold">
                    {guideLine.description}
                  </div>
                </div>
              ))}
            </div>
          </GameIntroductionCanvas>
        </div>
      )}
      {showGameIntroPage && (
        <GameCanvas
          abortGame={abortGame}
          totalRounds={gameRoundOptions.length}
          selectedRoundIndex={currentRoundIndex}
          isCompleted={shouldShowSuccessPage}
          gameTimeout={gameTimeout}
          handleContinue={handleContinue}
          timeInSeconds={timeInSeconds}
          warningInSeconds={warningInSeconds}
        >
          <GameRound
            gameRoundOption={currentRound}
            handleClick={handleConfirmButton}
            buttonLabel={buttonLabel}
          />
          {shouldShowSuccessPage && (
            <ConcludeGame
              imgSrc={finishGame.imgSrc}
              title={finishGame.title}
              content={finishGame.content}
              navigateNextText={finishGame.navigateNextText}
              handleContinue={handleContinue}
              buttonLabel={finishGame.buttonLabel}
            />
          )}
        </GameCanvas>
      )}
      {shouldShowConfirmExit && (
        <ConfirmExitPullup
          cancelButtonLabel={abortGame.cancelButtonLabel}
          exitButtonLabel={abortGame.exitButtonLabel}
          title={abortGame.title}
          onClose={onConfirmExitClose}
          onProceed={handleExit}
        />
      )}
    </div>
  )
}

export default NbackGameRoundCanvas
