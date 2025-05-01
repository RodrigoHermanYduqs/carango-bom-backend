import { IsNotEmpty, MinLength } from 'class-validator';

export class AtualizaMarcaDto {
  @IsNotEmpty({ message: 'Nome da marca não pode ser vazio' })
  @MinLength(3, { message: 'Nome da marca deve ter no mínino 3 caracteres' })
  nome: string;
}
