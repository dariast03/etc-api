import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import { AuthController } from './auth.controller';
import { UsuarioModule } from '../admin/usuario/usuario.module';
import { UsuarioService } from '../admin/usuario/usuario.service';
import { PrismaService } from '@/prisma.service';

@Module({
  imports: [
    UsuarioModule,
    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'user',
      session: false,
    }),
    JwtModule.register({
      secret: process.env.SECRETKEY,
      signOptions: {
        expiresIn: process.env.EXPIRESIN,
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UsuarioService, JwtStrategy, PrismaService],
  exports: [PassportModule, JwtModule],
})
export class AuthModule {}
