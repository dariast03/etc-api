import { ApiProperty } from '@nestjs/swagger';
import { CreatePersonaDto } from '../../persona/dto/create-persona.dto';
import { CreateUsuarioDto } from '../../usuario/dto';

export class CreateDocenteDto {
  @ApiProperty({
    description: 'Información del usuario asociado al estudiante',
    type: CreatePersonaDto,
  })
  persona: CreatePersonaDto;
  @ApiProperty({
    description: 'Información del usuario asociado al estudiante',
    type: CreateUsuarioDto,
  })
  usuario: CreateUsuarioDto;

  @ApiProperty({
    description: 'Información de la especializacion asociado al estudiante',
    example: 'Idiomas',
  })
  especializacion: string;
}
