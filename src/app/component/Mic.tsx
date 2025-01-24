"use client";
import { useState, useEffect, useRef } from "react";
import { FaMicrophone } from "react-icons/fa";
import { toast } from "react-hot-toast";

// Define the SpeechRecognition interface
interface SpeechRecognition {
  continuous: boolean;
  lang: string;
  interimResults: boolean;
  start(): void;
  stop(): void;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: SpeechRecognitionErrorEvent) => void;
}

// Define the event interface for SpeechRecognitionEvent
interface SpeechRecognitionEvent {
  results: SpeechRecognitionResultList;
}

// Define the event interface for SpeechRecognitionErrorEvent
interface SpeechRecognitionErrorEvent {
  error: string;
}

// Extend Window interface to include the SpeechRecognition API
declare global {
  interface Window {
    SpeechRecognition: SpeechRecognition;
    webkitSpeechRecognition: SpeechRecognition;
  }
}

const VoiceInput = ({ onText }: { onText: (text: string) => void }) => {
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    if (!("SpeechRecognition" in window || "webkitSpeechRecognition" in window)) {
      toast.error("Speech Recognition not supported in this browser.");
      return;
    }

    const SpeechRecognitionConstructor =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    // Explicitly type the constructor
    const recognition = new (SpeechRecognitionConstructor as unknown as { new (): SpeechRecognition })();

    recognition.continuous = false;
    recognition.lang = "en-US";
    recognition.interimResults = false;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript;
      onText(transcript);
      setIsListening(false);
      toast.success("Speech recognized!", { position: "top-center" });
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error("Speech recognition error:", event.error);
      toast.error(`Error: ${event.error}`);
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
