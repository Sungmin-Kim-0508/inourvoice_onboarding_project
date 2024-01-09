import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import dbConfig from 'config/db.config';

@Injectable()
export class AppService {
  constructor(
    @Inject(dbConfig.KEY)
    private config: ConfigType<typeof dbConfig>,
  ) {}
}
