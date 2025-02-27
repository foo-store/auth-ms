import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { envs } from 'src/config/envs.config';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    JwtModule.register({
      secret: envs.jwtSecret,
      signOptions: { expiresIn: envs.jwtExpirationIn },
    }),
  ],
})
export class AuthModule {}
