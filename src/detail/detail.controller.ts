import { Controller, Get, UseGuards, Param } from '@nestjs/common';
import { DetailService } from './detail.service';
import { AuthGuard } from '@nestjs/passport';
import { Detail } from './schema/detail.schema';

@Controller('detail')
export class DetailController {
  constructor(private detailService: DetailService) {}

  @Get(':id')
  @UseGuards(AuthGuard())
  async listDetails(@Param('id') id: string): Promise<Detail[]> {
    try {
      return this.detailService.listDetail(id);
    } catch (error) {
      console.log(error);
    }
  }
}
