import { GoogleGenerativeAIEmbeddings } from '@langchain/google-genai';
import dotenv from 'dotenv';
dotenv.config();

const embeddingModel = new GoogleGenerativeAIEmbeddings();
const embeddings = await embeddingModel.embedDocuments([
  '안녕하세요',
  '안녕!',
  '반갑습니다',
  '잘 내셨나요? 오랜만에 연락드립니다.',
  '잘가',
  '9시부터 수업 시작하니 zoom에 입장해주세요',
]);

// console.log(embeddings);

// console.log((${embeddings.length}),(${embeddings[0].length}));

function consineSimilarity(vec1: number[], vec2: number[]): number {
  const dotProduct = vec1.reduce((sum, val, i) => sum + val * vec2[i], 0);
  const norm1 = Math.sqrt(vec1.reduce((sum, val) => sum + val * val, 0));
  const norm2 = Math.sqrt(vec2.reduce((sum, val) => sum + val * val, 0));
  return dotProduct / (norm1 * norm2);
}

const similarity = consineSimilarity(embeddings[0], embeddings[1]);
const similarity2 = consineSimilarity(embeddings[3], embeddings[5]);
console.log('Cosine Similarity1: ', similarity);
console.log('Cosine Similarity2: ', similarity2);