// ? informaçao que o usuario envia

export interface CreateEventDto {
  title: string;
  start: Date;
  end: Date;
  resourceId: string;
}
