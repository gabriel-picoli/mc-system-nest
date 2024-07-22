// ? define a forma de um objeto TypeScript, sem impor validações
// ? sao uteis para descrever a estrutura dos dados que a aplicaçao manipula internamente.

export interface Event {
  id: string;
  title: string;
  start: Date;
  end: Date;
  backgroundColor: string;
  resourceId: string;
}
