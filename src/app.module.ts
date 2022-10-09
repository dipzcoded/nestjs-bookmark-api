import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { BookmarkController } from './bookmark/bookmark.controller';
import { BookmarkService } from './bookmark/bookmark.service';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), AuthModule, PrismaModule, UserModule],
  controllers: [BookmarkController],
  providers: [BookmarkService],
})
export class AppModule {}
