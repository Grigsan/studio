"use client";

import { useState, useEffect, useCallback } from 'react';

export function useSpeech() {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    const handleVoicesChanged = () => {
      setVoices(window.speechSynthesis.getVoices());
    };

    // Get initial voices
    const initialVoices = window.speechSynthesis.getVoices();
    if (initialVoices.length > 0) {
      setVoices(initialVoices);
    }

    // Subscribe to voice changes
    window.speechSynthesis.addEventListener('voiceschanged', handleVoicesChanged);

    return () => {
      window.speechSynthesis.removeEventListener('voiceschanged', handleVoicesChanged);
      window.speechSynthesis.cancel();
    };
  }, []);

  const speak = useCallback((text: string) => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
    }

    const utterance = new SpeechSynthesisUtterance(text);
    // Find the best available Russian voice
    const russianVoice = voices.find(voice => voice.lang === 'ru-RU' && voice.localService) || voices.find(voice => voice.lang === 'ru-RU');
    
    utterance.voice = russianVoice || voices.find(voice => voice.lang.startsWith('ru')) || null;
    utterance.lang = 'ru-RU';
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = (event) => {
      console.error("SpeechSynthesisUtterance.onerror", event);
      setIsSpeaking(false);
    };
    
    window.speechSynthesis.speak(utterance);
  }, [voices, isSpeaking]);

  const cancel = useCallback(() => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  }, []);

  return { speak, cancel, isSpeaking, hasVoices: voices.length > 0 };
}
