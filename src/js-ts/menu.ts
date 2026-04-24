





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





//--------------------NEW CODE-------------------------------//

// generic function open/close
function toggleMenu(menuToOpen: HTMLElement, menuToClose: HTMLElement) {
    const isOpen = menuToOpen.dataset.menu === "open";
    
    menuToOpen.dataset.menu = isOpen ? "close" : "open";
    console.log("menu APERTO")
    menuToClose.dataset.menu = "close";
    console.log("menu CHIUSO")
}



export function checkClickMenu() {
    document.addEventListener("click", (e) => {
        const target = e.target as HTMLElement;

        const swimSuitBtn = target.closest('a[href="#swim_suit"]') as HTMLElement;
        const accessoriesBtn = target.closest('a[href="#accessories"]') as HTMLElement;

        const swimSuit = document.getElementById("swim_suit") as HTMLElement;
        const accessories = document.getElementById("accessories") as HTMLElement;

        const dropdownItem = target.closest("a[data-gender]") as HTMLAnchorElement;

        if(swimSuitBtn){
            e.preventDefault();
            e.stopPropagation();
            toggleMenu(swimSuit, accessories);
            return;
        }

        else if(accessoriesBtn){
            e.preventDefault(); 
            e.stopPropagation();
            toggleMenu(accessories, swimSuit);
            return;
        }

        else if(dropdownItem){
            e.preventDefault();
            e.stopPropagation();
            const type = dropdownItem.dataset.type;
            const gender = dropdownItem.dataset.gender;

            window.location.href = `shop.html?type=${type}&gender=${gender}`;
            return;
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
            //checkClickMenu();
            changeLinkNavigation(divMenu as HTMLElement); // upload state link 
            
        })
        .catch(error => {
            console.log("Error upload state menu");
        });
}




