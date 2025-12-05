import { AIMessage, HumanMessage, SystemMessage } from '@langchain/core/messages';
import { ChatPromptTemplate, HumanMessagePromptTemplate, PromptTemplate } from '@langchain/core/prompts';
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
// const response = await llm.invoke(prompt1.value);
// console.log('Response:', response.content);

///////// ChatPromptTemplate 사용 /////////
const template2 = ChatPromptTemplate.fromMessages([
    ["system", "너는 초등학교 수학 선생님이야"],
    ["human", "수학 문제를 풀어줘:{problem}"],
]);

const prompt2 = await template2.invoke({problem: "10*11"});

console.log(prompt2);

// const response = await llm.invoke(prompt2);
// console.log('Response:', response.content);



const systemMessage = new SystemMessage("너는 초등학교 수학 선생님이야");
const template3 = HumanMessagePromptTemplate.fromTemplate([
    systemMessage,
    new HumanMessage('수학 공부를 왜 해야해?'),
    new AIMessage("공부하기 싫어?"),
    "{input}"
]);
const prompt3 = await template3.formatMessages({input:"응"})

// const resp = await llm.invoke(prompt3)
console.log(prompt3)