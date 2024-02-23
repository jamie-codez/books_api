import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Root')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({
    summary: 'Health route',
    description: 'This endpoint is used to check health of the application',
  })
  @ApiResponse({ status: 200, description: 'Health status of the application' })
  @Get()
  async getHello() {
    return await this.appService.getHello();
  }
}
