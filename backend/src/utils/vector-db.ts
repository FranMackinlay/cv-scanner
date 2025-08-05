import { Pinecone } from '@pinecone-database/pinecone';
import { HuggingFaceTransformersEmbeddings } from '@langchain/community/embeddings/hf_transformers';
import * as dotenv from 'dotenv';

dotenv.config();

const indexName = 'cv-index';

const embeddings = new HuggingFaceTransformersEmbeddings({
  modelName: 'Xenova/all-MiniLM-L6-v2',
});

export async function storeInVectorDB(id: string, text: string) {
  const pinecone = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY!,
  });

  try {
    const index = pinecone.Index(indexName);
    const vector = await embeddings.embedQuery(text);

    await index.upsert([
      {
        id,
        values: vector,
        metadata: { text },
      },
    ]);
  } catch (error) {
    console.error('Error storing in vector DB:', error);
  }
}

export async function queryVectorDB(query: string): Promise<string[]> {
  const pinecone = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY!,
  });

  const index = pinecone.Index(indexName);
  const queryVector = await embeddings.embedQuery(query);

  const results = await index.query({
    vector: queryVector,
    topK: 5,
    includeMetadata: true,
  });

  return (
    results.matches?.map((match) => {
      const text = match.metadata?.text;
      return typeof text === 'string' ? text : '';
    }) ?? []
  );
}
