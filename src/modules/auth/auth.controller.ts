import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Put,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from './jwt-auth.guard';
import { AuthService, RegistrationStatus } from './auth.service';
import { UsuarioService } from '../admin/usuario/usuario.service';
import {
  CreateUsuarioDto,
  LoginUsuarioDto,
  UpdatePasswordDto,
} from '../admin/usuario/dto';

@ApiTags('Auth')
@Controller('auth')
@ApiBearerAuth('access-token')
export class AuthController {
  constructor(
    private readonly usersService: UsuarioService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(JwtAuthGuard) // RoleGuard
  //@Roles('DOCENTE')
  @ApiSecurity('access-key')
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('me')
  public async me(@Request() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('refresh')
  public async refresh(@Request() req) {
    return await this.authService.refreshToken(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @ApiSecurity('access-key')
  @UseInterceptors(ClassSerializerInterceptor)
  @Put('update/password')
  public async updatePassword(
    @Request() req,
    @Body()
    updatePasswordDto: UpdatePasswordDto,
  ) {
    await this.usersService.updatePassword(updatePasswordDto, req.user.id);
    return {
      message: 'password_update_success',
    };
  }

  @Post('register')
  public async register(
    @Body() createUserDto: CreateUsuarioDto,
  ): Promise<RegistrationStatus> {
    const result: any = await this.authService.register(createUserDto);
    if (!result?.success) {
      throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
    }
    return result;
  }

  @Post('login')
  public async login(@Body() loginUserDto: LoginUsuarioDto): Promise<any> {
    return await this.authService.login(loginUserDto);
  }
}
