import styled from "styled-components";
import XPic from "../../assets/X.png";

export const XBackground = styled.div`
  position: absolute;
`;

export const X = styled.img.attrs({
  src: `${XPic}`,
})`
  width: 10vw;
  height: 10vw;
`;
