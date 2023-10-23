import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import { hash } from 'bcrypt';

export class AuthService {
  constructor(
    @Inject(PrismaService)
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(data: RegisterDto) {
    const checkUser = await this.prisma.user.findFirst({
      where: { email: data.email },
    });

    if (checkUser) {
      throw new HttpException('User already registered', HttpStatus.FOUND);
    }

    data.password = await hash(data.password, 10);
    const createUser = await this.prisma.user.create({ data: data });

    delete createUser.password;

    if (createUser) {
      return {
        statusCode: 200,
        message: 'Success Register',
        data: createUser,
      };
    }
  }
}
