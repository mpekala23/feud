import styled from "styled-components";

export const BoardBackground = styled.div<{ visible: boolean }>`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  background-color: black;
  height: calc(60vh + 88px);
  width: calc(80vw + 48px);
  padding: 8px 8px;
  transition: opacity 0.5s;
  opacity: ${({ visible }) => (visible ? "1" : "0")};
`;
