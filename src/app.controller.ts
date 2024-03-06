import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('App')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({ summary: 'Check if the server is running' })
  @ApiResponse({ status: 200, description: 'Server is running' })
  @Get()
  async getHello(): Promise<any> {
    return await this.appService.getHello();
  }
}
