export interface RegisterForm {
    id: string;
    name: string;
    surname: string;
    email: string;
    password?: string;
    preferPayment: string;
}
export interface RegisterFormReservate {
    email: string;
    password: string;
}
export declare const reservedUsers: RegisterFormReservate[];
//# sourceMappingURL=interfaces.d.ts.map