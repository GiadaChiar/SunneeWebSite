import '../style/index.scss';
import '../style/menu.scss';
import '../style/form.scss';



import { setUpMenu } from './menu'
import { fetchForm } from './form'




//general listener to get value anda type to use it in shop page

/*
function getTypeandDataFilter(){
    document.body.addEventListener("click",(event)=>{
        const target = event.target as HTMLAreaElement;

        const dropdownItem = target.closest("a.dropdown-item[data-type]")as HTMLAnchorElement
        if(!dropdownItem)return

        const type = dropdownItem.dataset.type;
        const value = target.dataset.value;

        console.log("tipologia cliccata",type)
        console.log("valore cliccato",value)
        event.preventDefault();
    })
}

*/




document.addEventListener("DOMContentLoaded", () => {
    setUpMenu();
    fetchForm();
    //getTypeandDataFilterMenu();
    //getTypeandDataFilter();
});



