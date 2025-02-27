import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('auth.user.register')
  register(@Payload() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @MessagePattern('auth.user.validate')
  validate(@Payload() token: string) {
    return this.authService.validate(token);
  }
}
