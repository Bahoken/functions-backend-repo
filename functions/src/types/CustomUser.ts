import { UserRole } from "../enum/user-role";

export interface CustomUser {
    firstname: string;
    name: string;
    country: string;
    city: string;
    phone: string;
    status: boolean;
    role?: UserRole;
    userId: string;
}