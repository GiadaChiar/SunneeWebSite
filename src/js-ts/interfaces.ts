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




export class Cliente {
    id: string;
    name: string;
    surname: string;
    email: string;
    preferPayment: string;

    private cart: CartItem[] = [];
    //usare i metodi per modificarlo

    constructor(data: RegisterForm) {
        this.id = data.id || crypto.randomUUID();
        this.name = data.name;
        this.surname = data.surname;
        this.email = data.email;
        this.preferPayment = data.preferPayment;
    }

    // 🛒 aggiungere prodotto al carrello se vi [ un oggetto uguale aggiunge la quantit' ]

    addToCart(item: CartItem, products: BaseProduct[], userId: string) {
        // trova il prodotto reale
        const product = products.find(p => p.id === item.productId); //trovo il prodotto tramite id 
        if (!product) {
            console.log("Prodotto non trovato");
            return;
        }


        // trova la variante scelta
        const variant = product.variants.find(
            v => v.color === item.color && v.size === item.size
        );
        if (!variant) {
            console.log("Variante non disponibile");
            return;
        }
        // controllo disponibilità
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

        // aggiungi al carrello
        if (existingItem) {
            existingItem.quantity += item.quantity;
        } else {
            this.cart.push({ ...item, userId });
        }

        console.log("Carrello aggiornato:", this.cart);
        sessionStorage.setItem("cart", JSON.stringify(this.cart));

    }

    // ❌ rimuovere prodotto
    removeFromCart(productId: string) {
        this.cart = this.cart.filter(p => p.productId !== productId);
    }

    // 📦 vedere carrello contenuto
    getCart() {
        return this.cart;
    }

    // 💳 effettuare ordine vede se il carrello è vuoto e svuota il carrello dopo l'ordine
    checkout() {
        if (this.cart.length === 0) {
            console.log("Carrello vuoto");
            return;
        }

        console.log("Ordine effettuato da:", this.name);
        console.log("Prodotti:", this.cart);

        // svuota carrello dopo ordine
        this.cart = [];
    }
    /*
    getDetailedCart(products: BaseProduct[]) {
        return this.cart.map(item => {
            const product = products.find(p => p.id === item.productId );

            if (!product) return null;

            return {
                ...item,
                description: product.description,
                price: product.prize,
                image: product.image,
            };
        }).filter(Boolean);//rimuove i prodotti non trovati
    }*/

    getDetailedCart(products: BaseProduct[], loggedIdUser: string) {
        const usersJson: RegisterForm[] = JSON.parse(localStorage.getItem("users") || "[]");


        return this.cart.map(item => {
            const product = products.find(p => p.id === item.productId && loggedIdUser === item.userId );
        
        
            if (!product) return null;

            return {
                ...item,
                description: product.description,
                price: product.prize,
                image: product.image,
            };
        }).filter(Boolean);//rimuove i prodotti non trovati
    }

    loadCart(cartItems: CartItem[]) {
        this.cart = cartItems;
    }
}
