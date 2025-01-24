"use client";
import { useState, useEffect, useRef } from "react";
import { FaMicrophone } from "react-icons/fa";
import { toast } from "react-hot-toast";

const VoiceInput = ({ onText }: { onText: (text: string) => void }) => {
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (!("webkitSpeechRecognition" in window)) {
      toast.error("Speech Recognition not supported in this browser.");
      return;
    }

    const SpeechRecognition =
    (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
  
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.lang = "en-US";
    recognition.interimResults = false;

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      onText(transcript);
      setIsListening(false);
      toast.success("Speech recognized!", { position: "top-center" });
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error", event.error);
      toast.error("Error with speech recognition.");
      setIsListening(false);
    };

    recognitionRef.current = recognition;
  }, [onText]);

  const startListening = () => {
    if (recognitionRef.current) {
      setIsListening(true);
      recognitionRef.current.start();
      toast("Listening... Speak now!", { position: "top-center" });
    }
  };

  return (
    <button
      type="button"
      onClick={startListening}
      className={`p-3 rounded-full text-white ${
        isListening ? "bg-red-500 animate-pulse" : "bg-blue-500"
      }`}
    >
      <FaMicrophone className="text-xl" />
    </button>
  );
};

export default VoiceInput;
