export enum Status {
  Pendente = 'Pendente',
  EmAndamento = 'Em Andamento',
  Concluido = 'Concluído',
  Falha = 'Falha / Cancelado',
}

export enum Area {
  Envase = 'Envase',
  Processos = 'Processos',
  Utilidades = 'Utilidades',
}

export const PartOptions = [
  'Faca para Etiquetadora',
  'Sapata',
  'Tampão',
  'Chave para área de Processos',
  'Hélice',
  'Tampa do Lava Olhos',
  'Tampa do Lava Olhos - Linha de Chopp',
  'Pino identificador da abertura da válvula on-off',
  'Outra',
] as const;

export type Part = (typeof PartOptions)[number];

export interface PrintOrder {
  id: string;
  nameAndRegistration: string;
  area: Area;
  email: string;
  part: Part;
  otherPartDescription?: string;
  manufacturerCode: string;
  equipment: string;
  status: Status;
  createdAt: string; // Changed from firebase.firestore.Timestamp to string
  userId: string;
  userEmail: string;
}

// Mock User type for local authentication
export interface MockUser {
    uid: string;
    email: string;
}
