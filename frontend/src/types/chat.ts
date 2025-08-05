export type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};


export type ChatWindowProps = {
  chatHistory: ChatMessage[];
  newMessageIndex: number | null;
  chatEndRef: React.RefObject<HTMLDivElement | null>;
};
