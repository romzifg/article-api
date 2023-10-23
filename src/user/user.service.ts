import { PrismaService } from 'src/prisma/prisma.service';
import { User } from './user.model';
import { Inject } from '@nestjs/common';

export class UserService {
  constructor(@Inject(PrismaService) private prisma: PrismaService) {}

  async getAllUser(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async getUserById(id: number): Promise<User | null> {
    return this.prisma.user.findFirst({ where: { id: Number(id) } });
  }

  async createUser(data: User): Promise<User> {
    return this.prisma.user.create({ data: data });
  }

  async updateUser(id: number, data: User): Promise<User> {
    return this.prisma.user.update({
      where: {
        id: Number(id),
      },
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        username: data.username,
        email: data.email,
        bio: data.bio,
      },
    });
  }

  async updatePassword(id: number, data: User): Promise<User> {
    return this.prisma.user.update({
      where: { id: Number(id) },
      data: { password: data.password },
    });
  }

  async deleteUser(id: number): Promise<User> {
    return this.prisma.user.delete({ where: { id: Number(id) } });
  }
}
