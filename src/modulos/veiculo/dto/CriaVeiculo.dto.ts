import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  Min,
  MinLength
} from 'class-validator';

export class CriaVeiculoDTO {
  @IsNotEmpty({ message: 'Modelo não pode ser vazio' })
  @MinLength(2, { message: 'Modelo deve ter no mínino 2 caracteres' })
  modelo: string;

  @IsNotEmpty({ message: 'Valor não pode ser vazio' })
  @IsNumber({ maxDecimalPlaces: 2, allowNaN: false, allowInfinity: false })
  @Min(0.01, { message: 'O valor precisa ser maior que zero' })
  valor: number;

  @IsNotEmpty({ message: 'Ano não pode ser vazio' })
  @IsInt({ message: 'Ano deve ser um número inteiro' })
  @Min(1, { message: 'O ano precisa ser maior que zero' })
  ano: number;

  @IsNotEmpty({ message: 'marcaId não pode ser vazio' })
  marcaId: string;
}
