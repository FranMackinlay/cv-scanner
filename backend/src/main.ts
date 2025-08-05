import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

dotenv.config();

if (!process.env.OPENAI_API_KEY) {
  console.error('Missing OPENAI_API_KEY environment variable');
  process.exit(1);
}

if (!process.env.PINECONE_API_KEY) {
  console.error('Missing PINECONE_API_KEY environment variable');
  process.exit(1);
}

if (!process.env.OPENROUTER_API_KEY) {
  console.error('Missing OPENROUTER_API_KEY environment variable');
  process.exit(1);
}

if (!process.env.OPENROUTER_API_URL) {
  console.error('Missing OPENROUTER_API_URL environment variable');
  process.exit(1);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  await app.listen(process.env.PORT ?? 4000);
}

bootstrap();
