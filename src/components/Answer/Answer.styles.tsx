import styled from "styled-components";

const OUTER_BORDER_SIZE = 3;

export const OuterWhiteBackground = styled.div`
  background-color: #dce8f2;
  padding: ${OUTER_BORDER_SIZE}px;
  margin: 8px 8px;
  width: 40vw;
  height: 15vh;
`;

export const OuterBlueBackground = styled.div`
  background-color: #3a5797;
  padding: ${OUTER_BORDER_SIZE}px;
  width: calc(100% - ${OUTER_BORDER_SIZE * 2}px);
  height: calc(100% - ${OUTER_BORDER_SIZE * 2}px);
`;

export const TrueBackground = styled.div`
  background: linear-gradient(#4f7dc8, #254ead);
  padding: ${OUTER_BORDER_SIZE}px;
  width: calc(100% - ${OUTER_BORDER_SIZE * 4}px);
  height: calc(100% - ${OUTER_BORDER_SIZE * 4}px);
  border: ${OUTER_BORDER_SIZE}px solid #dce8f2;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const OVAL_WIDTH = 120;
const OVAL_HEIGHT = 80;

export const NumberContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${OVAL_WIDTH}px;
  height: ${OVAL_HEIGHT}px;
  border-radius: ${OVAL_WIDTH / 2}px / ${OVAL_HEIGHT / 2}px;
  background: #102254;
`;

export const NumberText = styled.h1`
  color: white;
  font-size: 60px;
`;

export const AnswerText = styled.h1`
  color: white;
  text-align: center;
`;
