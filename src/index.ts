import {llm_msg} from './llm_google/llm_msg';
console.log('Hello, TypeScript!');

const greeting = (name: string): string => {
  return `안녕하세요, ${name}님!`;
};

console.log(greeting('개발자'));

const result = await llm_msg();
console.log('\n=== 최종 결과 ===');
console.log(result.content);