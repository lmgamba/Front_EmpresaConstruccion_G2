export interface ILogs {
  id_logs?: number;
  description: string;
  type: string; // 'Alerta', 'Avance', etc.
  date_register?: Date;
  users_id?: number;
  constructionsSites_id: number;

}
