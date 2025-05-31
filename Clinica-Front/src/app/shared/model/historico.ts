import { Consulta } from './consulta';

export interface Historico {
  id: number;
  descricao: string;
  data: string;
  ativo: boolean;
  consulta: Consulta;
}
