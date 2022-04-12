import { AppUser } from "./User";

export interface Booking {
    id: string;
    user: AppUser | null;
    address: string;
    service: string;
    hour: string;
    date: string;
}

export interface BookingDoc {
    id: string;
    displayName: string; 
    phone: string; 
    email: string; 
    createdAt: Date; 
    address: string; 
    service: string; 
    date: string; 
    hour: string;
    status: string;
}