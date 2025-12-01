import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { HumanMessage, SystemMessage } from '@langchain/core/messages';
import { BaseCallbackHandler } from '@langchain/core/callbacks/base';
import dotenv from 'dotenv';
dotenv.config();

class CustomLogger extends BaseCallbackHandler {
  name = 'CustomLogger';

  async handleLLMStart(llm: any, prompts: string[]) {
    console.log('=== LLM Start ===');
    console.log('Prompts:', prompts);
  }

  async handleChatModelStart(llm: any, messages: any[][]) {
    console.log('=== Chat Model Start ===');
    console.log('Messages:', JSON.stringify(messages, null, 2));
  }
}

export const llm_msg = async () => {
  const llm = new ChatGoogleGenerativeAI({
    // 추후 'gemini-2.5-pro' 'gemini-pro-latest' 'gemini-2.5-flash' gemini-flash-latest 로 변경할것.
    model: 'gemini-2.5-flash-lite',
    maxOutputTokens: 2048,
  });

  const message = [
    new SystemMessage(
      '너는 사내 보안 교육 강사야. 직무별로 구체적인 사례 1개씩 들고, 회사에 피해가 될수 있는 행동을 유념할수 있도록 설명해줘'
    ),
    new HumanMessage('LLM을 활용할때 주의할 점을 알려줘'),
  ];

  console.log(message);

  // prompt => tool | llm | parser
  const answer = await llm.invoke(message, {
    callbacks: [new CustomLogger()],
  });

  return answer;
};