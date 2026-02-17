export interface IAssignments {
    id_assignments: number;
    date_start: Date;
    date_finish: Date;
    status: number; //'1 active' o '0 finish'
    users_id: string;
    constructionsSites_id: string;
}
