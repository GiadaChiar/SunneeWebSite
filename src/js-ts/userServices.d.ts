import type { RegisterForm } from "./interfaces";
export declare function showUsers(): void;
export declare function cleanOldUsers(): void;
export declare function getRegisteredUsers(): RegisterForm[];
export declare function showUsersAllUsers(): void;
export declare function checkReservedLogin(): void;
export declare function checkUserLogin(): string | undefined;
export declare function saveNewUser(newUser: RegisterForm): boolean;
export declare function checkRegistration(): void;
export declare function checkPassword(user: RegisterForm): false | undefined;
//# sourceMappingURL=userServices.d.ts.map