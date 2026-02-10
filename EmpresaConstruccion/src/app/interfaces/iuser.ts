export interface IUser {
 
    id_users: number;
    name: string;
    surname: string;
    mail: string;
    password_hash: string;
    role: string;
    created_at: Date;
}
