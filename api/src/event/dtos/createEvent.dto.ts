// ? usado para definir a estrutura dos dados que serao enviados ou recebidos por um service ou controller
// ? incluem validaçoes e sao usados para assegurar que os dados recebidos estao no formato correto

import { IsString, IsDateString } from 'class-validator';

export class CreateEventDto {
  @IsString()
  title: string;

  @IsDateString()
  start: Date;

  @IsDateString()
  end: Date;

  @IsString()
  resourceId: string;
}
