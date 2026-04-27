import type { BaseProduct, Variant } from "./productInterfaces";
import type { RegisterForm } from "./userInterfaces";
import { showPopUp } from "./dom";
import { getRegisteredUsers } from "./userServices";

//Cart interface
export interface CartItem {
    userId: string;
    productId: string;
    size: Variant["size"];
    color: Variant["color"];
    quantity: number;
}



//Shop Client 


//client Class
export class ShopClient {
    id: string;
    name: string;
    surname: string;
    email: string;
    preferPayment: string;

    private cart: CartItem[] = [];

    //metods to changed it
    constructor(data: RegisterForm) {
        this.id = data.id || crypto.randomUUID();
        this.name = data.name;
        this.surname = data.surname;
        this.email = data.email;
        this.preferPayment = data.preferPayment;
    }

    //find product and add to Cart

    addToCart(item: CartItem, products: BaseProduct[], userId: string) {
        //find it by id
        const product = products.find(p => p.id === item.productId);
        if (!product) return;

        // find it by his variant
        const variant = product.variants.find(
            v => v.color === item.color && v.size === item.size
        );

        if (!variant) return;
        // check if it already exists
        const existingItem = this.cart.find(
            p =>
                p.productId === item.productId &&
                p.size === item.size &&
                p.color === item.color
        );

        const currentQuantityInCart = existingItem ? existingItem.quantity : 0;

        if (item.quantity + currentQuantityInCart > variant.quantity) {
            showPopUp("Errore", `Non puoi ordinare più di ${variant.quantity} pezzi disponibili`);
            return;
        }

        // add to cart
        if (existingItem) {
            existingItem.quantity += item.quantity;
        } else {
            this.cart.push({ ...item, userId });
        }

        sessionStorage.setItem("cart", JSON.stringify(this.cart));
    }


    //remove product
    removeFromCart(productId: string, color?: string, size?: string) {
        this.cart = this.cart.filter(p =>
            !(p.productId === productId && (!color || p.color === color) && (!size || p.size === size))
        );
        sessionStorage.setItem("cart", JSON.stringify(this.cart));
    }

    cleanFromCart(UserId: string) {
        this.cart = this.cart.filter(p =>
            p.userId !== UserId
        );
        sessionStorage.setItem("cart", JSON.stringify(this.cart));
    }

    //show cart
    getCart() {
        return this.cart;
    }

    // make order
    checkout() {
        if (this.cart.length === 0) return

        // clean cart
        this.cart = [];
    }


    // cart info
    getDetailedCart(products: BaseProduct[], loggedIdUser: string) {

        const allUsers = getRegisteredUsers();

        return this.cart.map(item => {
            const product = products.find(p => p.id === item.productId);

            const user = allUsers.find(u => loggedIdUser === u.id)

            //check if already existed a cart 

            if (!product || !user) return null;
            return {
                ...item,
                description: product.description,
                price: product.prize,
                image: product.image,
            };
        }).filter(Boolean);//rimuove i prodotti non trovati
    }

    updateCartItem(productId: string, color: string, size: string, quantity: number) {
        const item = this.cart.find(p => p.productId === productId && p.color === color && p.size === size);
        if (!item) return

        item.quantity = quantity;
        sessionStorage.setItem("cart", JSON.stringify(this.cart));
    }

    loadCart(cartItems: CartItem[]) {
        this.cart = cartItems;
    }
}


