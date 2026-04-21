





function fetchMenu() {
    return fetch("menu.html")
        .then(res => res.text()) //then response in text form
        .then(html => {
            const divMenu = document.getElementById("menu") as HTMLElement;
            if (!divMenu) return;
            divMenu.innerHTML = html;
            return divMenu;
        })
}




// Update hash links to point to index.html if on another page
function changeLinkNavigation(divMenu: HTMLElement) {
    const currentPage = window.location.pathname.split("/").pop() || "index.html";

    if (!divMenu) {
        throw new Error("Element not founded");
    }
    const links = divMenu.querySelectorAll("a[data-page]")
    links.forEach(link => {
        const hrefLink = link.getAttribute("data-page");
        if (hrefLink !== "universal") {
            if (hrefLink == currentPage) {
                if (link.classList.contains("active")) {
                    link.classList.replace("active", "disabled")
                }
            }
            else {
                link.classList.replace("disabled", "active")
                // remove listener to prevent click
                const handler = (event: Event) => event.preventDefault();
                link.removeEventListener("click", handler);
            }
        }
    })

    return currentPage;
}


//------------------OLD CODE ---------------------//

/*
function checkMenuSections() {
    const swimSuitBtn = document.querySelector('a[href="#swim_suit"]') as HTMLElement;
    const accessoriesBtn = document.querySelector('a[href="#accessories"]') as HTMLElement;

    const swimSuit = document.getElementById("swim_suit") as HTMLElement;
    const accessories = document.getElementById("accessories") as HTMLElement;

    if (!swimSuit || !accessories || !swimSuitBtn || !accessoriesBtn) return;

    // generic function open/close
    function toggleMenu(menuToOpen: HTMLElement, menuToClose: HTMLElement) {
        const isOpen = menuToOpen.dataset.menu === "open";
        menuToOpen.dataset.menu = isOpen ? "close" : "open";
        menuToClose.dataset.menu = "close";
    }


    function toggleSwimSuit() { toggleMenu(swimSuit, accessories); }
    function toggleAccessories() { toggleMenu(accessories, swimSuit); }

    // buttons clicks
    swimSuitBtn.addEventListener("click", (e) => { e.preventDefault(); toggleSwimSuit(); });
    accessoriesBtn.addEventListener("click", (e) => { e.preventDefault(); toggleAccessories(); });

    closeClickOutside(swimSuit, swimSuitBtn, accessories, accessoriesBtn)

}





//global event listener to get data-type and value
export function getTypeandDataFilterMenu() {
    document.addEventListener("click", (event) => {
        const target = event.target as HTMLElement;

        const dropdownItem = target.closest("a[data-gender]") as HTMLAnchorElement;
        if (!dropdownItem) return;

        event.preventDefault();

        const type = dropdownItem.dataset.type;
        const gender = dropdownItem.dataset.gender;

        //send data 
        window.location.href = `shop.html?type=${type}&gender=${gender}`;

    });
}


function closeClickOutside(swimSuit: HTMLElement, swimSuitBtn: HTMLElement, accessories: HTMLElement, accessoriesBtn: HTMLElement) {
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
export function setUpMenu() {
    fetchMenu()
        .then((divMenu) => {
            changeLinkNavigation(divMenu as HTMLElement); // upload state link 
            checkMenuSections();
            getTypeandDataFilterMenu(); inside checkClick
        })
        .catch(error => {
            console.log("Error upload state menu");
        });
}


*/


//--------------------NEW CODE-------------------------------//

// generic function open/close
function toggleMenu(menuToOpen: HTMLElement, menuToClose: HTMLElement) {
    const isOpen = menuToOpen.dataset.menu === "open";
    
    menuToOpen.dataset.menu = isOpen ? "close" : "open";
    menuToClose.dataset.menu = "close";
}


//global event listener to get data-type and value
export function getTypeandDataFilterMenu(dropdownItem :HTMLAnchorElement) {
    
        const type = dropdownItem.dataset.type;
        const gender = dropdownItem.dataset.gender;

        window.location.href = `shop.html?type=${type}&gender=${gender}`;
}




function checkClickMenu() {
    document.addEventListener("click", (e) => {
        const target = e.target as HTMLElement;

        const swimSuitBtn = target.closest('a[href="#swim_suit"]') as HTMLElement;
        const accessoriesBtn = target.closest('a[href="#accessories"]') as HTMLElement;

        const swimSuit = document.getElementById("swim_suit") as HTMLElement;
        const accessories = document.getElementById("accessories") as HTMLElement;

        const dropdownItem = target.closest("a[data-gender]") as HTMLAnchorElement;

        if(swimSuitBtn){
            e.preventDefault();
            toggleMenu(swimSuit, accessories);
            return;
        }

        else if(accessoriesBtn){
            e.preventDefault(); 
            toggleMenu(accessories, swimSuit);
            return;
        }

        else if(dropdownItem){
            e.preventDefault();
            getTypeandDataFilterMenu(dropdownItem);
        }
        
        else {
            swimSuit.dataset.menu = "close";
            accessories.dataset.menu = "close";
        }
    });
}


// Final function to export 
export function setUpMenu() {
    fetchMenu()
        .then((divMenu) => {
            changeLinkNavigation(divMenu as HTMLElement); // upload state link 
            checkClickMenu()
        })
        .catch(error => {
            console.log("Error upload state menu");
        });
}





