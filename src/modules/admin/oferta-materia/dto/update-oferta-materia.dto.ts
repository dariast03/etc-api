import { PartialType } from '@nestjs/mapped-types';
import { CreateOfertaMateriaDto } from './create-oferta-materia.dto';

export class UpdateOfertaMateriaDto extends PartialType(CreateOfertaMateriaDto) {}
