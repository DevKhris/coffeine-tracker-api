import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://root:root@astra.pqefajg.mongodb.net/?retryWrites=true&w=majority',
    ),
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService, UsersService],
})
export class AppModule {}
