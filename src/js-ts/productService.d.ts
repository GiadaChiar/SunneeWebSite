import type { BaseProduct } from "./productInterfaces";
export declare function buildProductFromForm(): BaseProduct | null;
export declare function insertProduct(productData: BaseProduct): Promise<void>;
export declare function getSelectedColor(target: HTMLElement, clone: HTMLElement, products: BaseProduct[]): string;
//# sourceMappingURL=productService.d.ts.map