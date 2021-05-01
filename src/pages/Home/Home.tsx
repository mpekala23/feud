import React, { useEffect, useState } from "react";
import Board from "../../components/Board/Board.react";
import Xs from "../../components/Xs/Xs.react";
import useShowMe from "../../hooks/useShowMe";
import { Background } from "./Home.styles";

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

  useEffect(() => {
    if (!showing) return;
    console.log("showing is", showing);

    if (getCorrect(correctRate)) {
      const blankSpots = answers
        .map((answer, index) => (answer === null ? index : -1))
        .filter((index) => index >= 0);
      if (!blankSpots.length) return;
      const filling = blankSpots[Math.floor(Math.random() * blankSpots.length)];
      setAnswers((oldAnswers) => {
        const newAnswers = [...oldAnswers];
        newAnswers[filling] = showing;
        return newAnswers;
      });
    } else {
      setNumXs((num) => num + 1);
    }
  }, [showing, correctRate, answers]);

  return (
    <Background>
      <Board answers={answers} />
      <Xs numXs={numXs} />
    </Background>
  );
};

export default HomePage;
