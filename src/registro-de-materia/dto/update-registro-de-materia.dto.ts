import { PartialType } from '@nestjs/mapped-types';
import { CreateRegistroDeMateriaDto } from './create-registro-de-materia.dto';

export class UpdateRegistroDeMateriaDto extends PartialType(CreateRegistroDeMateriaDto) {}
