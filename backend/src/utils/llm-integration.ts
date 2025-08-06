export async function askLLM(question: string, context: string): Promise<string> {
  const OPENROUTER_API_URL = process.env.OPENROUTER_API_URL;

  if (!OPENROUTER_API_URL) throw new Error('OPENROUTER_API_URL is not defined in the environment variables.');

  const response = await fetch(`${OPENROUTER_API_URL}/chat/completions`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'mistralai/mistral-7b-instruct',
      messages: [
        {
          role: 'system', content: 'You are a helpful and creative HR assistant. Your task is to answer questions strictly based on the provided CVs' },
        { role: 'user', content: `Context: ${context}\n\nQuestion: ${question}` },
      ],
    }),
  });

  const data = await response.json();

  if (data?.choices?.[0]?.message?.content) {
    return data.choices[0].message.content;
  } else {
    console.error('LLM error:', data);
    return 'No answer found.';
  }
}
