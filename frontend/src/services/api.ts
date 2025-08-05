import axios from 'axios';

export const fetchAnswer = async (question: string): Promise<string> => {
  const API_URL = process.env.REACT_APP_API_URL;

  if (!API_URL) throw new Error('API_URL is not defined in the environment variables.');

  const response = await axios.post(API_URL, { question });

  return response?.data?.answer || 'No answer found.';
};
