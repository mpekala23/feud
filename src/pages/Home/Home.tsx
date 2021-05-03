import React, { useEffect, useState } from "react";
import { useCallback } from "react";
import Board from "../../components/Board/Board.react";
import Xs from "../../components/Xs/Xs.react";
import useShowMe from "../../hooks/useShowMe";
import { Background } from "./Home.styles";
import BooSound from "../../assets/Boo.wav";
import useSound from "use-sound";

const DEFAULT_CORRECT_RATE = 0.5;
const DEFAULT_NUM_OPTIONS = 6;

function getBlankAnswers(numOptions: number) {
  const newAnswers = [];
  for (let ix = 0; ix < 8; ix++) {
    newAnswers.push(ix < numOptions ? null : -1);
  }
  return newAnswers as (string | null | -1)[];
}

function getCorrect(correctRate: number) {
  return Math.random() < correctRate;
}

function getBlankSpots(answers: (string | null | -1)[]) {
  const blankSpots = answers
    .map((answer, index) => (answer === null ? index : -1))
    .filter((index) => index >= 0);
  return blankSpots;
}

type GameState = "reset" | "playing" | "won" | "lost";

const HomePage: React.FC = () => {
  // Voice detection
  const showing = useShowMe();

  // Settings
  const [correctRate, setCorrectRate] = useState(DEFAULT_CORRECT_RATE);
  const [numOptions, setNumOptions] = useState(DEFAULT_NUM_OPTIONS);

  // State
  const [numXs, setNumXs] = useState(0);
  const [answers, setAnswers] = useState<(string | null | -1)[]>(
    getBlankAnswers(numOptions)
  );
  const [gameState, setGameState] = useState<GameState>("reset");
  const [boardVisible, setBoardVisible] = useState(false);

  // Sounds
  const [playBooSound] = useSound(BooSound);

  // Trigger a correct answer
  const triggerCorrectAnswer = useCallback(
    (answer: string) => {
      const blankSpots = getBlankSpots(answers);
      if (!blankSpots.length) return;
      const filling = blankSpots[Math.floor(Math.random() * blankSpots.length)];
      setAnswers((oldAnswers) => {
        const newAnswers = [...oldAnswers];
        newAnswers[filling] = answer;
        return newAnswers;
      });
    },
    [answers, setAnswers]
  );

  // Trigger an incorrect answer
  const triggerIncorrectAnswer = useCallback(() => {
    setNumXs((num) => num + 1);
  }, [setNumXs]);

  const applyGameState = useCallback(
    (state: GameState) => {
      console.log("applying", state);
      if (state === "reset") {
        setNumXs(0);
        setAnswers(getBlankAnswers(numOptions));
        setBoardVisible(true);
        setGameState("playing");
      }
      if (state === "playing") {
      }
      if (state === "won") {
        setBoardVisible(false);
      }
      if (state === "lost") {
        setBoardVisible(false);
        playBooSound();
      }
    },
    [
      setNumXs,
      setAnswers,
      numOptions,
      setBoardVisible,
      setGameState,
      playBooSound,
    ]
  );

  // React to game state
  useEffect(() => {
    applyGameState(gameState);
  }, [gameState, applyGameState]);

  // Check for loss
  useEffect(() => {
    if (numXs >= 3) setGameState("lost");
  }, [numXs, setGameState]);

  // Check for win
  useEffect(() => {
    const blankSpots = getBlankSpots(answers);
    if (blankSpots.length === 0) setGameState("won");
  }, [answers, setGameState]);

  useEffect(() => {
    if (!showing) return;

    const answerAlreadyExists = answers.some((answer) => answer === showing);
    const correct = getCorrect(correctRate);

    if (answerAlreadyExists || !correct) {
      triggerIncorrectAnswer();
    } else {
      triggerCorrectAnswer(showing);
    }
  }, [
    showing,
    correctRate,
    answers,
    triggerCorrectAnswer,
    triggerIncorrectAnswer,
  ]);

  return (
    <Background>
      <Board answers={answers} visible={boardVisible} />
      <Xs numXs={numXs} />
      <button onClick={() => triggerCorrectAnswer("test")}>Correct</button>
      <button onClick={() => triggerIncorrectAnswer()}>Incorrect</button>
    </Background>
  );
};

export default HomePage;
