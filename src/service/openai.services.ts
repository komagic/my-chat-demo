import { Provide } from '@midwayjs/core';
import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from 'openai';

const config = {
  openai_api_key: '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',
  api: '',
  temperature: 1.8,
};

const configuration = new Configuration({
  apiKey: config.openai_api_key,
});

const openai_instance = new OpenAIApi(configuration);

@Provide()
export class OpenAIService {
  async open_ai_3_5(prompts: ChatCompletionRequestMessage[]) {
    console.log('prompts', prompts);
    try {
      const response = await openai_instance.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: prompts,
        temperature: config.temperature,
      });

      console.log('response: ', response);

      const gptText = response.data.choices[0].message.content;

      return { success: true, message: 'OK', data: { gptText } };
    } catch (error) {
      console.log('error: ', error.message);
    }
  }
}
