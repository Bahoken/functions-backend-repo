import { Type } from "../enum/operation-type";
import { UserRole } from "../enum/user-role";

export interface UserRequest {
    email: string;
    password: string;
    firstname: string;
    name: string;
    country: string;
    city: string;
    phone: string;
    type?: Type;
    role?: UserRole;
}