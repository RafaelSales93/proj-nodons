import { Historico } from "./historico";
import { StatusConsulta } from "./statusConsulta.enum";

export class Consulta {
  id!: number;
  data: Date | null = null;
  descricao: string = '';
  medico: string = '';
  status!: StatusConsulta;
  paciente?: {
    id: number;
    nome: string;
  };
  historicos: Historico[] = [];


  constructor(init?: Partial<Consulta>) {
    Object.assign(this, init);
    if (init?.data) {
      this.data = new Date(init.data);
    }
  }
}
