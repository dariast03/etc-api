import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';
export class UpdateNotaDto {
  @ApiProperty({
    description: 'Nota del estudiante en la materia',
    type: 'number',
    example: 100,
  })
  @IsNumber()
  @Max(100)
  @Min(0)
  nota: number;

  @ApiProperty({
    description: 'Id del registro de la materia del estudiante',
    type: 'number',
    example: 'cjj394fkkciqjjejrejfj',
  })
  @IsString()
  @IsNotEmpty()
  id: string;
}
