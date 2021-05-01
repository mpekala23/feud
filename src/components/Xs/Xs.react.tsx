import React, { useEffect, useState } from "react";
import { X, XBackground } from "./Xs.styles";
import useSound from "use-sound";
import XSound from "../../assets/X.wav";

interface Props {
  numXs: number;
}

const DISPLAY_LENGTH = 961;

function renderXs(num: number) {
  const count = [];
  for (let _ = 0; _ < num; _ += 1) {
    count.push(null);
  }
  return count.map(() => <X />);
}

const Xs: React.FC<Props> = ({ numXs }) => {
  const [shown, setShown] = useState(false);
  const [playXSound] = useSound(XSound);

  useEffect(() => {
    if (numXs) setShown(true);
  }, [numXs]);

  useEffect(() => {
    if (!shown) return;
    setTimeout(() => setShown(false), DISPLAY_LENGTH);
    playXSound();
  }, [shown, playXSound]);

  if (!shown) return null;

  return <XBackground>{renderXs(numXs)}</XBackground>;
};

export default Xs;
