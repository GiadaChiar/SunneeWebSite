import '../style/index.scss';
import '../style/menu.scss';
import '../style/form.scss';




import { setUpMenu, checkClickMenu } from './menu'
import { fetchForm } from './form';

import  {ProductService} from "./productInterfaces";
import type  { BaseProduct } from './productInterfaces';
import {ProductsDefault } from "./initProducts"

function shoClass(){
    const products = ProductService.getAll();
    console.log("Prodotti Classe: ",products )
}
/*
function getLocalProducts() :BaseProduct[]{

    return JSON.parse(localStorage.getItem("products") || "[]");
}


function deleteLocalProducts(){

    //const localProducts = JSON.parse(localStorage.getItem("products") || "[]");
    const local = localStorage.removeItem("products")
    console.log("ELEMENTI ELIMINATI :", local)


}



//Default products + local storage products.
function getAllProducts(){
    const localproducts = getLocalProducts();
    //return [...ProductsDefault, ...localproducts];
    const products = [...ProductsDefault, ...localproducts];
    console.log("Prodotti Funzione: ",products )

}
*/




export function getLocalProducts() :BaseProduct[]{

    return JSON.parse(localStorage.getItem("products") || "[]");
}


//Default products + local storage products.
export function getAllProducts(): BaseProduct[]{
    const localproducts = getLocalProducts();
    return [...ProductsDefault, ...localproducts];
}

function showFunction(){
    const all = getAllProducts();
    console.log("ECCOLI QUI ", all)
}

function ClassRight(){
    const products = ProductService.getAllProducts()
    console.log("ECCO QUI I PRODOTTI CLASSE GIUSTA : ", products)
}


//VOglio vedere quanti prodotti vi sono 

document.addEventListener("DOMContentLoaded", () => {
    setUpMenu();
    checkClickMenu();
    fetchForm();

    //deleteLocalProducts();
    shoClass();
    showFunction();
    getAllProducts();
    ClassRight();
});

