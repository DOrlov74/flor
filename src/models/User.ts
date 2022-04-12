import { User } from "firebase/auth";

export interface AppUser extends User {
    phone: string;
    role: string|null;
}