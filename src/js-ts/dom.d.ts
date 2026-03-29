import type { RegisterForm } from "./interfaces";
export declare let isAdminLogin: boolean;
export declare function setAdminLogin(value: boolean): void;
export declare function cleanSection(sectionId: string): void;
export declare function changeTextContent(elementId: string, text: string): void;
export declare function showPopUp(title: string, message: string): void;
export declare function addCloseButton(containerId: string): void;
export declare function showPopUpSelection(title: string, message: string, checkright: string, checkleft: string): void;
export declare function ValidationNewUser(): boolean;
export declare function checkPassword(user: RegisterForm): false | undefined;
export declare function checkRegistration(): void;
export declare function getRegisteredUsers(): RegisterForm[];
export declare function submitLogIn(): void;
export declare function checkUserLogin(): string | undefined;
export declare function showUsers(): void;
export declare function cleanOldUsers(): void;
//# sourceMappingURL=dom.d.ts.map