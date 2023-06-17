import { Provide } from '@midwayjs/core';
import type { GenericAbortSignal } from 'axios';
import axios from 'axios';
import * as https from 'https';
// 用axios 创建post 方法
const instance = axios.create({
  timeout: 1000 * 60 * 2,
  headers: {
    Authority: 'api.binjie.fun',
    'Content-Type': 'application/json',
    Accept: 'application/json, text/plain, */*',
    Eagleid: '71d7f68c16869992214507069e',
    Origin: 'https://chat1.aichatos.com',
    // Referer: 'https://chat1.aichatos.com/',
    Via: 'cache28.l2hk3[399,0], cache20.l2in1[471,0], cache38.l2cm9-5[601,0], cache19.cn4686[621,0]'
  },
});

//创建post 方法 
export function request(options: any) {
  return instance({
    method: 'POST',
    headers: {
      Accept: 'application/json',
    },
    httpsAgent: new https.Agent({
      rejectUnauthorized: false,
    }),
    secure: false,
    ...options,
  });
}

// const config = {
//   openai_api_key: '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',
//   api: '',
//   temperature: 1.8,
// };

// const configuration = new Configuration({
//   apiKey: config.openai_api_key,
//   basePath: 'https://cbjtestapi.binjie.site:7777/api/generate',
// });

export function fetchChatAPI(
  prompt: string,
  options?: { conversationId?: string; parentMessageId?: string },
  signal?: GenericAbortSignal,
) {
  return request({
    url: 'https://api.binjie.fun/api/generateStream' || 'https://cbjtestapi.binjie.site:7777/api/generate',
    data: { 
      ...{
        "prompt": "你好",
        "userId": "#/chat/1686999209547",
        "network": true,
        "system": "",
        "withoutContext": false,
        "stream": false
    },
    prompt,
    },
    signal,

  })
}
// const openai_instance = new OpenAIApi(configuration);

@Provide()
export class OpenAIService {
  async open_ai_3_5(prompt: string) {
    console.log('open_ai_3_5 prompts', prompt);
    try {
      // const response = await openai_instance.createChatCompletion({
      //   model: 'gpt-3.5-turbo',
      //   messages: prompts,
      //   temperature: config.temperature,
      
      // });

      const res = await fetchChatAPI(prompt);
      console.log('res', res);

      return { success: true, message: 'OK', data: { gptText:res?.data} };
    } catch (error) {
      console.log('error: ', error.message);
    }
  }
}
