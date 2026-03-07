

export function fetchForm() {
    return fetch("form.html")
        .then(res => res.text()) //then response in text form
        .then(html => {
            const divForm = document.getElementById("contacts")as HTMLElement;
            if (!divForm) {
                //throw new Error("Form Element not found");
                console.log("Form Element not found")
            }
            divForm.innerHTML = html;
            return divForm;
        })
}
