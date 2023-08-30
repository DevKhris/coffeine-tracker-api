import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Caffeine, CaffeineSchema } from '../schemas/caffeine.schema';
import { CaffeineService } from './caffeine.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Caffeine.name, schema: CaffeineSchema },
    ]),
  ],
  providers: [CaffeineService],
  exports: [CaffeineService],
})
export class CaffeineModule {}
