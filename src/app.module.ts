import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DepModule } from './dep/dep.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), DepModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
