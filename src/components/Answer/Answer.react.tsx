import React from "react";
import {
  AnswerText,
  NumberContainer,
  NumberText,
  OuterBlueBackground,
  OuterWhiteBackground,
  TrueBackground,
} from "./Answer.styles";

interface Props {
  answer: string | null | -1;
  index: number;
}

const Answer: React.FC<Props> = ({ answer, index }) => {
  const getCenter = () => {
    switch (answer) {
      case -1:
        return null;
      case null:
        return (
          <NumberContainer>
            <NumberText>{index}</NumberText>
          </NumberContainer>
        );
      default:
        return <AnswerText>{answer.toUpperCase()}</AnswerText>;
    }
  };

  return (
    <OuterWhiteBackground>
      <OuterBlueBackground>
        <TrueBackground>{getCenter()}</TrueBackground>
      </OuterBlueBackground>
    </OuterWhiteBackground>
  );
};

export default Answer;
