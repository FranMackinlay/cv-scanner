import React from 'react';
import { ChatMessage } from '../../types/chat';
import TypingIndicator from './TypingIndicator';
import styles from './chat.module.css';

type ChatWindowProps = {
  chatHistory: ChatMessage[];
  newMessageIndex: number | null;
  chatEndRef: React.RefObject<HTMLDivElement | null>;
  loading: boolean; // Add loading prop
};

const ChatWindow: React.FC<ChatWindowProps> = ({ chatHistory, newMessageIndex, chatEndRef, loading }) => {
  return (
    <div className='chat-window'>
      {chatHistory.map((msg, index) => (
        <div
          key={index}
          className={`chat-message ${msg.role} ${index === newMessageIndex ? 'new-message' : ''
            }`}
        >
          {msg.content}
        </div>
      ))}
      {loading && <TypingIndicator />}
      <div ref={chatEndRef} />
    </div>
  );
};

export default ChatWindow;
