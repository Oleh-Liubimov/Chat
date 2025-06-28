import { ConfigService } from '@nestjs/config';
import * as mongoose from 'mongoose';

export const dataBaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (configService: ConfigService): Promise<typeof mongoose> =>
      mongoose.connect(configService.get<string>('DATABASE_URL') || ''),
    inject: [ConfigService],
  },
];
