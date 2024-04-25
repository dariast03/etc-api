import { ApiProperty } from '@nestjs/swagger';

export class CreatePersonaDto {
  @ApiProperty({
    example: 'Joeh',
    description: 'Dante de la persona',
  })
  nombre: string;

  @ApiProperty({
    example: 'Doe',
    description: 'Apellido de la persona',
  })
  apellido: string;

  @ApiProperty({
    example: '12644543',
    description: 'Nro Documento de la persona',
  })
  nroDocumento: string;

  @ApiProperty({
    example: new Date().toISOString(),
    description: 'Fecha de nacimiento de la persona en formato ISO 8601',
  })
  fechaNacimiento: Date;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'Correo electrónico de la persona',
  })
  correoPersonal: string;

  @ApiProperty({
    example: '+1234567890',
    description: 'Número de teléfono de la persona',
  })
  telefono: string;
}
