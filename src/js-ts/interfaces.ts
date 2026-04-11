// I want to create an Interface for products standard
import { showPopUp } from "./dom";
//general interface

export interface Variant {
    size: "xs" | "s" | "m" | "l" | "xl" | "2xl";
    color: "green" | "white" | "black" | "blue" | "red" | "pink" | "floral" | "multicolored";
    quantity: number;
    state: "available" | "unavailable";
}

export interface BaseProduct {
    id: string;
    type: "cap" | "sarong" | "swimSuit-relax" | "swimSuit-sport" | "swimSuit-extreme";
    gender: "unisex" | "man" | "woman";
    prize: number;
    image: string;
    description: string;
    variants: Variant[];

}



///CLIENT INTERFACE 
export interface RegisterForm {
    id: string
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



//interface Cart
export interface CartItem {
    userId: string;
    productId: string;
    size: Variant["size"];
    color: Variant["color"];
    quantity: number;
}


//login Admin

export const reservedUsers: RegisterFormReservate[] = [
    {
        email: "admin@site.com",
        password: "admin123"
    },
    {
        email: "manager@site.com",
        password: "manager123"
    }
];

//login default users

export const users: RegisterForm[] = [
    {
        "id": "jugriut",
        "name": "Giovanni",
        "surname": "Francese",
        "email": "jjovany@gmail.com",
        "preferPayment": "card",
        "password": "jjova908@"
    },
    {
        "id": "g3rt1tk",
        "name": "Samanta",
        "surname": "Rosie",
        "email": "rosiesam@gmail.com",
        "preferPayment": "card", "password": "A9b!cD3e"
    },
    {

        "id": "k0xv2oa",
        "name": "Roberto",
        "surname": "Rossi",
        "email": "robertorossi@gmail.com",
        "preferPayment": "paypal",
        "password": "Rob124@ll"
    },
    {
        "id": "m7rj4tz",
        "name": "Luca",
        "surname": "De Martino",
        "email": "demartyluca@gmail.com",
        "preferPayment": "bank",
        "password": "popodim1@"
    },
    {
        "id": "k9xv2qa",
        "name": "Sara",
        "surname": "Virgo",
        "email": "virgosara@gmail.com",
        "preferPayment": "card",
        "password": "sarh888@"
    }

]



//client Class
export class Cliente {
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
        if (!product) {
            console.log("Prodotto non trovato");
            return;
        }


        // find it by his variant
        const variant = product.variants.find(
            v => v.color === item.color && v.size === item.size
        );
        if (!variant) {
            console.log("Variante non disponibile");
            return;
        }
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

        console.log("Carrello aggiornato:", this.cart);
        sessionStorage.setItem("cart", JSON.stringify(this.cart));
    }


    //remove product
    removeFromCart(productId: string, color?: string, size?: string) {
        this.cart = this.cart.filter(p =>
            !(p.productId === productId && (!color || p.color === color) && (!size || p.size === size))
        );
        sessionStorage.setItem("cart", JSON.stringify(this.cart));
    }

    cleanFromCart(UserId: string){
        this.cart = this.cart.filter(p=>
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
        if (this.cart.length === 0) {
            console.log("Carrello vuoto");
            return;
        }

        console.log("Ordine effettuato da:", this.name);
        console.log("Prodotti:", this.cart);

        // clean cart
        this.cart = [];
    }
    

// cart info
    getDetailedCart(products: BaseProduct[], loggedIdUser: string) {
        const usersJson: RegisterForm[] = JSON.parse(localStorage.getItem("users") || "[]");
        const allUsers = [...users, ...usersJson]

        console.log("logged user passato a getDetailcart: ", loggedIdUser)
        console.log("")
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
        if (!item) {
            console.warn("Prodotto non trovato nel carrello");
            return;
        }

        item.quantity = quantity;
        console.log("Carrello aggiornato:", this.cart);
        sessionStorage.setItem("cart", JSON.stringify(this.cart));
    }

    loadCart(cartItems: CartItem[]) {
        this.cart = cartItems;
    }
}



//class to insert product 
export class Product {
    id: string;
    type: BaseProduct["type"];
    gender: BaseProduct["gender"];
    prize: number;
    image: string;
    description: string;
    variants: Variant[];

    constructor(data: BaseProduct) {
        this.id = data.id;
        this.type = data.type;
        this.gender = data.gender;
        this.prize = data.prize;
        this.image = data.image;
        this.description = data.description;
        this.variants = data.variants || [];
    }

    addVariant(variant: Variant) {
        this.variants.push(variant);
    }

    updateVariant(index: number, variant: Variant) {
        this.variants[index] = variant;
    }

    removeVariant(index: number) {
        this.variants.splice(index, 1);
    }

    isAvailable(): boolean {
        return this.variants.some(v => v.state === "available");
    }
}

//add products
export class ProductService {
    private static KEY = "products";

    static getAll(): Product[] {
        const data = JSON.parse(localStorage.getItem(this.KEY) || "[]");
        return data.map((p: any) => new Product(p));
    }

    static saveAll(products: Product[]) {
        localStorage.setItem(this.KEY, JSON.stringify(products));
    }

    static add(product: Product) {
        const products = this.getAll();
        products.push(product);
        this.saveAll(products);
    }

    static delete(id: string) {
        const products = this.getAll().filter(p => p.id !== id);
        this.saveAll(products);
    }

    static findById(id: string): Product | undefined {
        return this.getAll().find(p => p.id === id);
    }
}