import { AIMessage, HumanMessage } from '@langchain/core/messages';
import { StringOutputParser } from '@langchain/core/output_parsers';
import {FewShotPromptTemplate, PromptTemplate} from '@langchain/core/prompts';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import dotenv from 'dotenv';
dotenv.config();

const llm = new ChatGoogleGenerativeAI({
  model: 'gemini-2.5-flash-lite',
  maxOutputTokens: 2048,
});


console.log(
    await llm.invoke([
        new HumanMessage("안녕하세요 저는 정생강입니다"),
        new AIMessage("안녕하세요, 정생강님! 어떻게 도와드릴까요?"),
        new HumanMessage("제 이름은 뭔가요?")
    ])
)