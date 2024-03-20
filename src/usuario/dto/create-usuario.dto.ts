import { IsNotEmpty } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateUsuarioDto {
  @IsNotEmpty()
  @ApiProperty()
  correo: string;

  @ApiProperty()
  @IsNotEmpty()
  contrasena: string;
}
