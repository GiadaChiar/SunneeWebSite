export declare function generateId(): string | null;
export declare function setAdminLogin(value: boolean): void;
export declare function getAdminLogin(): boolean;
export declare let selectedValues: {
    selectedType: string | null;
    selectedSize: string | null;
    selectedColor: string | null;
    selectedGender: string | null;
    selectedState: string | null;
    selectedQuantity: number | null;
    selectedPrize: number | null;
    selectedDescription: string | null;
    selectedImage: string | null;
    selectedId: string | null;
    selectedValue: string | null;
};
export declare const traslate: {
    size: Record<"xs" | "s" | "m" | "l" | "xl" | "2xl", string>;
    color: Record<"green" | "white" | "black" | "blue" | "red" | "pink" | "floral" | "multicolored", string>;
};
//# sourceMappingURL=utils.d.ts.map