export class Paciente {
  id!: number;
  nome!: string;
  dataNascimento!: Date;
  endereco!: string;
  telefone!: string;
  email!: string;
  cpf!: string;
  sexo!: string;
  ativo!: boolean;

  constructor(init?: Partial<Paciente>) {
    Object.assign(this, init);
    if (init?.dataNascimento) {
      this.dataNascimento = new Date(init.dataNascimento);
    }
  }
}
