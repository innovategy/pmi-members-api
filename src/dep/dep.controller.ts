import { Controller, Get } from '@nestjs/common';
import { DepService } from './dep.service';

@Controller('members')
export class DepController {
  constructor(private readonly depService: DepService) {}

  @Get('extract')
  async getMemberExtract() {
    return this.depService.getMemberExtractReport();
  }

  @Get('last-run')
  async getLastRunMetadata() {
    return this.depService.getMemberExtractReportLastRun();
  }
}
