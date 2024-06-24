import {  IsNotEmpty } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';

export enum RoleEnum {
  ESTUDIANTE = 'ESTUDIANTE',
  DOCENTE = 'DOCENTE',
  ADMINISTRADOR = 'ADMINISTRADOR',
}

export class CreateUsuarioDto {
  //@IsNotEmpty()
  id: string;

  @IsNotEmpty()
  @ApiProperty({
    example: 'xadawdawda@example.com',
    description: 'Correo electrónico del usuario',
  })
  correo: string;

  /*   @IsNotEmpty() */
  @ApiProperty({
    example: 'password123',
    description: 'Contraseña del usuario',
  })
  contrasena: string;

  /*   @IsNotEmpty() */
  rol: Role;
}
