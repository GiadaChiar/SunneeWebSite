import type { RegisterForm } from "./userInterfaces";
export declare function showUsers(): void;
export declare function showUsersAllUsers(): void;
export declare function getRegisteredUsers(): RegisterForm[];
export declare function checkReservedLogin(): void;
export declare function checkUserLogin(): string | undefined;
export declare function saveNewUser(newUser: RegisterForm): boolean;
export declare function checkPassword(user: RegisterForm): false | undefined;
export declare function checkRegistration(): void;
//# sourceMappingURL=userServices.d.ts.map