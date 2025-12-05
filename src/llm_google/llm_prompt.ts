import { PromptTemplate } from '@langchain/core/prompts';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import dotenv from 'dotenv';
dotenv.config();

const template1 = PromptTemplate.fromTemplate(
    "수학 문제 풀어줘 : {problem}"
);

const prompt1 = await template1.invoke({problem: "10*11"});

console.log(prompt1);



const llm = new ChatGoogleGenerativeAI({
  model: 'gemini-2.5-flash-lite',
  maxOutputTokens: 2048,
});

// LLM에 prompt 전달하여 응답 받기
const response = await llm.invoke(prompt1.value);
console.log('Response:', response.content);