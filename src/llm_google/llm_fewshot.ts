import { StringOutputParser } from '@langchain/core/output_parsers';
import {FewShotPromptTemplate, PromptTemplate} from '@langchain/core/prompts';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import dotenv from 'dotenv';
dotenv.config();

const llm = new ChatGoogleGenerativeAI({
  model: 'gemini-2.5-flash-lite',
  maxOutputTokens: 2048,
});

const examplePrompt = PromptTemplate.fromTemplate(
    "문장: {sentence}\n평가: {evaluation}"
)

const examples = [
    {
        sentence:"오늘 날씨가 참 좋습니다.",
        evaluation:"좋은 문장입니다. 문법적으로 올바르고 표현이 자연스럽습니다."
    },
    {
        sentence:"날씨 오늘 참 좋다",
        evaluation:"문법적으로 올바르지 않습니다. 조사가 올바르지 않습니다."
    },
   {
    sentence:"친환경, 인체 무해한 소독제는 불법제품! 사용하면 안됩니다!",
    evaluation:"개선이 필요합니다. 앞 뒤의 문맥이 맞지 않습니다."
   }]

   const prompt = new FewShotPromptTemplate({
    examples,
    examplePrompt,
    suffix: "문장: {input}",
    inputVariables: ["input"],
   })

   const formattedPrompt = await prompt.format({
    input: "쾌적한 항구 조성과 소음방지 예방을 위하여 폭죽 사용을 금지 합니다."
   })

   const parser = new StringOutputParser()
//    const result = await llm.invoke(formattedPrompt)
//    const output = await parser.invoke(result)
//    console.log(output)


//chaining
const chain = llm.pipe(parser)
const output2 = await chain.invoke(formattedPrompt)
console.log(output2)