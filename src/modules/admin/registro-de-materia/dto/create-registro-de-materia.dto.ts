import { ApiProperty } from '@nestjs/swagger';

export class CreateRegistroDeMateriaDto {
  @ApiProperty({
    description: 'Información del usuario asociado al estudiante',
  })
  nota: number;

  @ApiProperty({
    description: 'Información del usuario asociado al estudiante',
  })
  estado: string;

  @ApiProperty({
    description: 'Información de la especializacion asociado al estudiante',
    example: 'Idiomas',
  })
  idInscripcion: string;

  @ApiProperty({
    description: 'Información de la especializacion asociado al estudiante',
    example: 'Idiomas',
  })
  idOfertaMateria: string;
}
