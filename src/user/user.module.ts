import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { UserController } from './user.controller';

@Module({
  imports: [AuthModule],
  controllers: [UserController],
})
export class UserModule {}
