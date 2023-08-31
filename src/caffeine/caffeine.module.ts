import { UsersModule } from './../users/users.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Caffeine, CaffeineSchema } from '../schemas/caffeine.schema';
import { CaffeineService } from './caffeine.service';
import { CaffeineResolver } from './caffeine.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Caffeine.name, schema: CaffeineSchema },
    ]),
    UsersModule,
  ],
  providers: [CaffeineService, CaffeineResolver],
  exports: [CaffeineService],
})
export class CaffeineModule {}
