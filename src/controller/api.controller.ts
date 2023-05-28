import { Body, Controller, Get, Inject, Post, Query } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { OpenAIService } from '../service/openai.services';
import { UserService } from '../service/user.service';

@Controller('/api')
export class APIController {
  @Inject()
  ctx: Context;

  @Inject()
  openaiService: OpenAIService;

  @Inject()
  userService: UserService;

  @Get('/get_user')
  async getUser(@Query('uid') uid) {
    const user = await this.userService.getUser({ uid });
    return { success: true, message: 'OK', data: user };
  }

  // post openai 3.5 and get response
  @Post('/openai')
  async openai(@Body() body) {
    console.log('openai: ', body);
    const gptText = await this.openaiService.open_ai_3_5(body.prompt);
    console.log('gptText: ', gptText);
    return { success: true, message: 'OK', data: { gptText } };
  }
}
