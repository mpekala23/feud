import { useEffect, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

export default function useShowMe() {
  const { finalTranscript, resetTranscript } = useSpeechRecognition();
  const [showing, setShowing] = useState<string | null>(null);

  useEffect(() => {
    SpeechRecognition.startListening({ continuous: true });
    return () => {
      SpeechRecognition.stopListening();
    };
  }, []);

  useEffect(() => {
    if (!finalTranscript.length) return;
    if (finalTranscript.toLowerCase().slice(0, 7) === "show me")
      setShowing(finalTranscript.slice(8));
    else setShowing(null);
    resetTranscript();
  }, [finalTranscript, resetTranscript]);

  useEffect(() => {
    if (showing) setShowing(null);
  }, [showing]);

  return showing;
}
