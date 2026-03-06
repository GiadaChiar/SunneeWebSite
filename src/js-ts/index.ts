import '../style/index.scss';
import '../style/menu.scss';
import '../style/form.scss';



import { setUpMenu } from './menu'
import { fetchForm } from './form'



document.addEventListener("DOMContentLoaded", () => {
    setUpMenu();
    fetchForm();
});

// if l click on ex swim suit selection I what to check if acessories is close 



