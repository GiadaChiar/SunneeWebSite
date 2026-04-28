





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

    menuToClose.dataset.menu = "close";

}





export function checkClickMenu() {

    if ((window as any).__menuListenerAdded) return;
    (window as any).__menuListenerAdded = true;

    document.addEventListener("click", (e) => {
        const target = e.target as HTMLElement;

        const swimSuitBtn = target.closest('a[href="#swim_suit"]') as HTMLElement;
        const accessoriesBtn = target.closest('a[href="#accessories"]') as HTMLElement;

        const catIcon = target.closest("#cartIcon")

        const swimSuit = document.getElementById("swim_suit") as HTMLElement;
        const accessories = document.getElementById("accessories") as HTMLElement;

        if (!swimSuit || !accessories) return;

        const dropdownItem = target.closest("a[data-gender]") as HTMLAnchorElement;

        if (swimSuitBtn) {
            e.preventDefault();
            toggleMenu(swimSuit, accessories);
            return;
        }

        else if (accessoriesBtn) {
            e.preventDefault();
            toggleMenu(accessories, swimSuit);
            return;
        }

        else if (dropdownItem) {
            e.preventDefault();
            const type = dropdownItem.dataset.type;
            const gender = dropdownItem.dataset.gender;

            window.location.href = `shop.html?type=${type}&gender=${gender}`;
            return;
        }
        else if (catIcon) {
            window.location.href = "cart.html";
        }

        else {
            swimSuit.dataset.menu = "close";
            accessories.dataset.menu = "close";
        }
    });
}












export function setUpMenu() {

    checkClickMenu();
    fetchMenu()
        .then((divMenu) => {
            checkClickMenu();
            changeLinkNavigation(divMenu as HTMLElement); // upload state link 

        })
        .catch(error => {
            return
        });
}


