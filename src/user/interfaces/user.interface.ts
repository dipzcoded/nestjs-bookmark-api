import { User } from '@prisma/client';
import { EditUserDto } from '../dto';

export interface UserInterface {
  editUser(userId: number, dto: EditUserDto): Promise<{ user: User }>;
}
