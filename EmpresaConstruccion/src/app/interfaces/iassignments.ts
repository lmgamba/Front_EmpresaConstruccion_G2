export interface IAssignments {
    id_assignments: number;
    date_start: Date;
    date_finish: Date;
    status: string; //'active' o 'finish'
    user_id: string;
    constructionsSites_id: string;
}
