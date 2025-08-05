import React from 'react';
import { useChat } from '../../hooks/useChat';
import ChatWindow from './ChatWindow';
import ChatInput from './ChatInput';
import { CONSTANTS } from '../../common/constants';

const ChatApp: React.FC = () => {
  const { question, setQuestion, chatHistory, newMessageIndex, chatEndRef, handleAskQuestion, loading } = useChat();

  return (
    <div className='chat-container'>
      <h1 className='title'>{CONSTANTS.TITLE_HEADER}</h1>
      <div className='chat-wrapper'>
        <ChatWindow
          chatHistory={chatHistory}
          newMessageIndex={newMessageIndex}
          chatEndRef={chatEndRef}
          loading={loading}
        />
        <ChatInput
          question={question}
          setQuestion={setQuestion}
          handleAskQuestion={handleAskQuestion}
        />
      </div>
    </div>
  );
};

export default ChatApp;
