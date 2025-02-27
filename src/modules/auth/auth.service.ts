import { HttpStatus, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RpcException } from '@nestjs/microservices';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from './dto';
import { JwtPayload } from './interfaces';

@Injectable()
export class AuthService extends PrismaClient implements OnModuleInit {
  private logger = new Logger('AuthService');

  async onModuleInit() {
    await this.$connect();
    this.logger.log('Connected to the database');
  }
  constructor(private readonly jwtService: JwtService) {
    super();
  }

  async register(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;

    const user = await this.user.findUnique({ where: { email } });

    if (user)
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: 'User already exists',
      });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...newUser } = await this.user.create({
      data: {
        email,
        password: this.hashPassword(password),
        name: createUserDto.name,
        surname: createUserDto.surname,
      },
    });

    const token = this.generateJwt(email);

    return { user: newUser, token };
  }

  async validate(token: string) {
    let payload: JwtPayload;

    try {
      payload = this.jwtService.verify<JwtPayload>(token);
    } catch {
      throw new RpcException({
        status: HttpStatus.UNAUTHORIZED,
        message: 'Invalid token',
      });
    }

    const user = await this.user.findUnique({
      where: { email: payload.email },
      omit: { password: true },
    });

    if (!user)
      throw new RpcException({
        status: HttpStatus.NOT_FOUND,
        message: 'User not found',
      });

    return { user, token };
  }

  private hashPassword(password: string) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  }

  private generateJwt(email: string) {
    const payload = { email };
    return this.jwtService.sign(payload);
  }
}
