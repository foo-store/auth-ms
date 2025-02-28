import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from './dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('auth.user.register')
  async register(@Payload() createUserDto: CreateUserDto) {
    return await this.authService.register(createUserDto);
  }

  @MessagePattern('auth.user.login')
  async login(@Payload() loginUserDto: LoginUserDto) {
    return await this.authService.login(loginUserDto);
  }

  @MessagePattern('auth.user.validate')
  async validate(@Payload() token: string) {
    return await this.authService.validate(token);
  }
}
