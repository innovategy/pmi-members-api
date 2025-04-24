import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DepService } from './dep.service';
import { DepController } from './dep.controller';

@Module({
  imports: [ConfigModule],
  controllers: [DepController],
  providers: [DepService],
})
export class DepModule {}
