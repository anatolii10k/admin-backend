import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AdminsModule } from './admins/admins.module';
import { AuthModule } from './auth/auth.module';
import { NewsModule } from './news/news.module';
import { EventsModule } from './events/events.module';
import { VideoModule } from './video/video.module';
import * as ormconfig from './ormconfig';
console.log(ormconfig);

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(
      Object.assign(ormconfig, {
        autoLoadEntities: true,
      }),
    ),
    UsersModule,
    AdminsModule,
    AuthModule,
    NewsModule,
    EventsModule,
    VideoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
