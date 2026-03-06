export function fetchMenu() {
    return fetch("menu.html")
        .then(res => res.text()) //then response in text form
        .then(html => {
            const divMenu = document.getElementById("menu");
            
            if (!divMenu) {
                throw new Error("Element not founded");
            }

            divMenu.innerHTML = html;
            return divMenu;
        })
}