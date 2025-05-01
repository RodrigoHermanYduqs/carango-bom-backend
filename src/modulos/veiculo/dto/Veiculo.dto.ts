export class VeiculoDTO {
  constructor (
    readonly id: string,
    readonly modelo: string,
    readonly ano: number,
    readonly valor: number,
    readonly marcaId: string
  ) {}
}
