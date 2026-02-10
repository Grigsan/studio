"use client";

import { useState, useEffect, useCallback } from 'react';

export function useSpeech() {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const handleVoicesChanged = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      if (availableVoices.length > 0) {
          setVoices(availableVoices);
          setIsReady(true);
      }
    };
    
    // Voices might be loaded already.
    handleVoicesChanged();
    
    // Or they might load later.
    window.speechSynthesis.onvoiceschanged = handleVoicesChanged;

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
      window.speechSynthesis.cancel();
    };
  }, []);

  const speak = useCallback((text: string) => {
    if (!isReady || !text) return;
    
    if (isSpeaking) {
      window.speechSynthesis.cancel();
    }

    const utterance = new SpeechSynthesisUtterance(text);
    // Prefer local, high-quality Russian voices
    const russianVoice = voices.find(voice => voice.lang === 'ru-RU' && voice.localService && voice.name.includes('Milena')) 
                        || voices.find(voice => voice.lang === 'ru-RU' && voice.localService)
                        || voices.find(voice => voice.lang === 'ru-RU');
    
    utterance.voice = russianVoice || null;
    utterance.lang = 'ru-RU';
    utterance.rate = 0.9;
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = (event) => {
      console.error("SpeechSynthesisUtterance.onerror", event);
      setIsSpeaking(false);
    };
    
    window.speechSynthesis.speak(utterance);
  }, [voices, isSpeaking, isReady]);

  const cancel = useCallback(() => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  }, []);

  return { speak, cancel, isSpeaking, isReady, hasVoices: voices.length > 0 };
}
