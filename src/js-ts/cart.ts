import '../style/index.scss';
import '../style/menu.scss';
import '../style/form.scss';
import '../style/cart.scss';



import { setUpMenu } from './menu'
import { fetchForm } from './form'
import { users } from './interfaces';
import type { CartItem, BaseProduct } from './interfaces';
import { changeTextContent } from './dom';
import { loadTemplates, changeCartTemplate } from "./templates";
import { Cliente, } from './interfaces';
import { ProductsDefault } from './initProducts';



//loader templates to save them in memory
const templates: Record<string, HTMLTemplateElement> = {};





function getAllCartInfo() {
    const loggedUserId = sessionStorage.getItem("userId");
    if (!loggedUserId) return;

    const user = users.find(u => u.id === loggedUserId);
    if (!user) return;
    const nameUser = user.name
    console.log("nome utente loggato:", nameUser)
    changeTextContent("cartTitle", "Buono Shopping " + nameUser)

    const cliente = new Cliente(user);
    console.log(" IL MIO CLIENTE ", cliente);

    const savedCart = sessionStorage.getItem("cart");
    const products: BaseProduct[] = JSON.parse(localStorage.getItem("products") || "[]");
    const allProducts: BaseProduct[] = [...ProductsDefault, ...products];

    if (savedCart) {
        console.log(savedCart)
        //const cartItems: CartItem[] = JSON.parse(savedCart);
       // const parsed = JSON.parse(savedCart);

        //const cartItems: CartItem[] = Array.isArray(parsed) ? parsed : [parsed];
        const cartItems: CartItem[] = JSON.parse(savedCart);
        cliente.loadCart(cartItems);
        
        const detailedCart = cliente.getDetailedCart(allProducts);
        console.log("Carrello dettagliato:", detailedCart);

        changeCartTemplate(detailedCart);

        const allPrices = detailedCart.map(item => item?.price ?? 0) //if it is null -->0 
        .filter(price => price != null);//remuve null
        console.log("TUTTI I PREZZI", allPrices) 

        const totalPrice = allPrices.reduce((sum, price) => sum + price, 0);
        console.log("Totale carrello:", totalPrice);
        changeTextContent("sommaTot",`${totalPrice} €`)
    }
}






///change cart clone 






























document.addEventListener("DOMContentLoaded", async () => {
    await loadTemplates();
    setUpMenu();
    fetchForm();
    getAllCartInfo();
    
});