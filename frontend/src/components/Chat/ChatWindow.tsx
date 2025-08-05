import React from 'react';
import TypingIndicator from './TypingIndicator';
import { ChatWindowProps } from '../../types/chat';

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
