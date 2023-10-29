import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import { hash, compare } from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { jwt_config } from 'src/config/jwt';
import { TokenDto } from './dto/token.dto';

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

    if (data.password !== data.confirmPassword) {
      throw new HttpException('Password is not match', HttpStatus.BAD_REQUEST);
    }

    data.password = await hash(data.password, 10);
    // Delete confirm password dto before save database
    delete data.confirmPassword;
    const createUser = await this.prisma.user.create({ data: data });

    // Delete password when pass payload to return
    delete createUser.password;

    if (createUser) {
      return {
        statusCode: 200,
        message: 'Success Register',
        data: createUser,
      };
    }
  }

  async login(data: LoginDto) {
    const checkUser = await this.prisma.user.findFirst({
      where: { email: data.email },
    });

    if (!checkUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const checkPassword = await compare(data.password, checkUser.password);
    if (checkPassword) {
      const accessToken = this.generateJWT({
        id: checkUser.id,
        firstName: checkUser.firstName,
        lastName: checkUser.lastName,
        email: checkUser.email,
      });

      return {
        statusCode: 200,
        message: 'Success Login',
        accessToken: accessToken,
      };
    } else {
      throw new HttpException('Password is not match', HttpStatus.BAD_REQUEST);
    }
  }

  generateJWT(payload: TokenDto) {
    return this.jwtService.sign(payload, {
      secret: jwt_config.secret,
      expiresIn: jwt_config.expired,
    });
  }
}
