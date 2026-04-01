import '../style/index.scss';
import '../style/menu.scss';
import '../style/form.scss';
import '../style/cart.scss';
import '../style/poUp.scss';



import { setUpMenu } from './menu'
import { fetchForm } from './form'
import { users } from './interfaces';
import type { CartItem, BaseProduct, RegisterForm } from './interfaces';
import { changeTextContent } from './dom';
import { loadTemplates, changeCartTemplate } from "./templates";
import { Cliente, } from './interfaces';
import { ProductsDefault } from './initProducts';
import { cartSetNumberProduct } from './events';



//loader templates to save them in memory
const templates: Record<string, HTMLTemplateElement> = {};




//only itemcart with id user == loggerid






/*


function getAllCartInfo() {
    const loggedUserId = sessionStorage.getItem("userId");//actual login user
    //all locastore users (remove if you recall the site)
    const usersJson : RegisterForm[] = JSON.parse(localStorage.getItem("users") || "[]");
    
    const allUsers = [...users,...usersJson]

    console.log("Users loggato:",loggedUserId)
    if (!loggedUserId) return;

    const user = allUsers.find(u => u.id === loggedUserId);
    console.log("User trovato", user)
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


        
        const detailedCart = cliente.getDetailedCart(allProducts,loggedUserId);
        console.log("Carrello dettagliato:", detailedCart);

        changeCartTemplate(detailedCart);

        const allPrices = detailedCart.map(item => item?.price ?? 0) //if it is null -->0 
        .filter(price => price != null);//remuve null
        console.log("TUTTI I PREZZI", allPrices) 

        const totalPrice = allPrices.reduce((sum, price) => sum + price, 0);
        let result= totalPrice.toFixed(2); //2 number after , ex 2.22
        console.log("Totale carrello:", result);
        changeTextContent("sommaTot",`${result} €`);

        
    }
}
*/






function getAllCartInfo() {
    const loggedUserId = sessionStorage.getItem("userId");//actual login user
    //all locastore users (remove if you recall the site)
    const usersJson : RegisterForm[] = JSON.parse(localStorage.getItem("users") || "[]");
    
    const allUsers = [...users,...usersJson]

    console.log("Users loggato:",loggedUserId)
    if (!loggedUserId) return;

    const user = allUsers.find(u => u.id === loggedUserId);
    console.log("User trovato", user)
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


        
        const detailedCart = cliente.getDetailedCart(allProducts,loggedUserId);
        console.log("Carrello dettagliato:", detailedCart);

        changeCartTemplate(detailedCart);

        const allPrices = detailedCart.map(item => item?.price ?? 0) //if it is null -->0 
        .filter(price => price != null);//remuve null
        console.log("TUTTI I PREZZI", allPrices) 

        const totalPrice = allPrices.reduce((sum, price) => sum + price, 0);
        let result= totalPrice.toFixed(2); //2 number after , ex 2.22
        console.log("Totale carrello:", result);
        changeTextContent("sommaTot",`${result} €`);

        
    }
}



















document.addEventListener("DOMContentLoaded", async () => {
    await loadTemplates();
    setUpMenu();
    fetchForm();
    getAllCartInfo();
    cartSetNumberProduct();


});