import React from "react";
import Answer from "../Answer/Answer.react";
import { BoardBackground } from "./Board.styles";

interface Props {
  answers: (string | null | -1)[];
  visible: boolean;
}

const Board: React.FC<Props> = ({ answers, visible }) => {
  return (
    <BoardBackground visible={visible}>
      {answers.map((answer, index) => {
        return <Answer answer={answer} index={index + 1} />;
      })}
    </BoardBackground>
  );
};

export default Board;
