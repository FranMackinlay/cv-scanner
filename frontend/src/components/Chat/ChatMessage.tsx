import React from 'react';
import { ChatMessage as ChatMessageType } from '../../types/chat';

type ChatMessageProps = {
  message: ChatMessageType;
  isNew: boolean;
};

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isNew }) => {
  return (
    <div className={`chat-message ${message.role} ${isNew ? 'new-message' : '' }`}>
      {message.content}
    </div>
  );
};

export default ChatMessage;
