





function fetchMenu() {
    return fetch("menu.html")
        .then(res => res.text()) //then response in text form
        .then(html => {
            const divMenu = document.getElementById("menu")as HTMLElement;
            if (!divMenu) {
                //throw new Error(" Menu Element not found");
                console.log(" Menu Element not found");
            }
            divMenu.innerHTML = html;
            return divMenu;
        })
}




// Update hash links to point to index.html if on another page
function changeLinkNavigation(divMenu: HTMLElement) {
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    //const currentPage = window.location.pathname.split("/").pop();
        if (!divMenu) {
            throw new Error("Element not founded");
        }
        const links = divMenu.querySelectorAll("a[data-page]")
        links.forEach(link => {
            const hrefLink = link.getAttribute("data-page");
            if (hrefLink !== "universal") {
                if (hrefLink == currentPage){
                    if(link.classList.contains("active")){
                        link.classList.replace("active","disabled")
                        /* link.addEventListener("click", (event: Event) => {
                        //event.preventDefault();  // impedisce la navigazione
                        });*/
                    }
                }
                else {
                    link.classList.replace("disabled","active")
                    // Rimuovi il listener che bloccava il click
                    const handler = (event: Event) => event.preventDefault();
                    link.removeEventListener("click", handler);
                                    }
            }
        })

    return currentPage;
}


function checkMenuSections() {
    const swimSuitBtn = document.querySelector('a[href="#swim_suit"]') as HTMLElement;
    const accessoriesBtn = document.querySelector('a[href="#accessories"]') as HTMLElement;

    const swimSuit = document.getElementById("swim_suit") as HTMLElement;
    const accessories = document.getElementById("accessories") as HTMLElement;

    if (!swimSuit || !accessories || !swimSuitBtn || !accessoriesBtn) return;

    // Funzione generica per aprire/chiudere
    function toggleMenu(menuToOpen: HTMLElement, menuToClose: HTMLElement) {
        const isOpen = menuToOpen.dataset.menu === "open";
        menuToOpen.dataset.menu = isOpen ? "close" : "open";
        menuToClose.dataset.menu = "close";
    }

    // Funzioni specifiche
    function toggleSwimSuit() { toggleMenu(swimSuit, accessories); }
    function toggleAccessories() { toggleMenu(accessories, swimSuit); }

    // Click sui bottoni
    swimSuitBtn.addEventListener("click", (e) => { e.preventDefault(); toggleSwimSuit(); });
    accessoriesBtn.addEventListener("click", (e) => { e.preventDefault(); toggleAccessories(); });

    closeClickOutside(swimSuit,swimSuitBtn,accessories,accessoriesBtn)

}

function closeClickOutside(swimSuit: HTMLElement,swimSuitBtn: HTMLElement,accessories: HTMLElement,accessoriesBtn: HTMLElement){
    document.addEventListener("click", (e) => {
        const target = e.target as HTMLElement;
        if (
            !swimSuit.contains(target) &&
            !swimSuitBtn.contains(target) &&
            !accessories.contains(target) &&
            !accessoriesBtn.contains(target)
        ) {
            swimSuit.dataset.menu = "close";
            accessories.dataset.menu = "close";
        }
    });
}

// Final function to export 
export function setUpMenu(){
    fetchMenu()
    .then((divMenu)=>{
        changeLinkNavigation(divMenu); // upload state link 
        checkMenuSections();
        getTypeandDataFilterMenu();
    })
    .catch(error=>{
        throw new Error("Error upload state menu")
    });
}






//global event listener to get data-type and value
export function getTypeandDataFilterMenu() {
    document.addEventListener("click", (event) => {
        const target = event.target as HTMLElement;

        // risale fino al link con data-type
        const dropdownItem = target.closest("a[data-gender]") as HTMLAnchorElement;
        if (!dropdownItem) return;

        // blocca la navigazione
        event.preventDefault();

        const type = dropdownItem.dataset.type;
        const gender = dropdownItem.dataset.gender;

        //send data 
        window.location.href = `shop.html?type=${type}&gender=${gender}`;

    });
}