import { useState, useRef, useEffect } from 'react';
import { fetchAnswer } from '../services/api';
import { ChatMessage } from '../types/chat';

export const useChat = () => {
  const [question, setQuestion] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [newMessageIndex, setNewMessageIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  const handleAskQuestion = async () => {
    if (!question.trim()) return;

    const userMessage: ChatMessage = { role: 'user', content: question };
    const newChat = [...chatHistory, userMessage];
    setChatHistory(newChat);
    setNewMessageIndex(newChat.length - 1);
    setQuestion('');
    setLoading(true);

    try {
      const answer = await fetchAnswer(question);
      const assistantMessage: ChatMessage = { role: 'assistant', content: answer };

      setChatHistory((prev) => {
        const updated = [...prev, assistantMessage];
        setNewMessageIndex(updated.length - 1);
        return updated;
      });

    } catch (error) {
      console.error('Error fetching answer:', error);

      const errorMessage: ChatMessage = { role: 'assistant', content: 'An error occurred.' };

      setChatHistory((prev) => {
        const updated = [...prev, errorMessage];
        setNewMessageIndex(updated.length - 1);
        return updated;
      });

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  return {
    question,
    setQuestion,
    chatHistory,
    newMessageIndex,
    chatEndRef,
    handleAskQuestion,
    loading,
  };
};
