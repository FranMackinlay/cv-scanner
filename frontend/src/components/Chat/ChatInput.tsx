import React from 'react';
import { CONSTANTS } from '../../common/constants';

type ChatInputProps = {
  question: string;
  setQuestion: React.Dispatch<React.SetStateAction<string>>;
  handleAskQuestion: () => void;
};

const ChatInput: React.FC<ChatInputProps> = ({ question, setQuestion, handleAskQuestion }) => {
  return (
    <div className='chat-input-container'>
      <input
        type="text"
        id="chat-input"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Ask a question..."
        onKeyDown={(e) => e.key === 'Enter' && handleAskQuestion()}
        className='chat-input'
      />
      <button className='chat-button' onClick={handleAskQuestion}>{CONSTANTS.SEND_BUTTON_TEXT}</button>
    </div>
  );
};

export default ChatInput;
