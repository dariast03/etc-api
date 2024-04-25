import { IsNotEmpty } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class LoginUsuarioDto {
  @ApiProperty()
  @IsNotEmpty()
  readonly correo: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly contrasena: string;
}
