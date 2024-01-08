import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DbController } from './db.controller';
import { DbService } from './db.service';
import dbConfig from '../../config/db.config';

@Module({
  imports: [ConfigModule.forFeature(dbConfig)],
  controllers: [DbController],
  providers: [DbService],
})
export class DbModule {}
