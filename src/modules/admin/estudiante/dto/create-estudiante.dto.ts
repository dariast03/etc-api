import { ApiProperty } from '@nestjs/swagger';
import { CreatePersonaDto } from '../../persona/dto/create-persona.dto';
import { CreateUsuarioDto } from '../../usuario/dto';

export class CreateEstudianteDto {
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
}
