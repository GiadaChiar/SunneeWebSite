


export function fetchForm() {
    return fetch("form.html")
        .then(res => res.text())
        .then(html => {
            const divForm = document.getElementById("contacts");

            if (!divForm) return;

            divForm.innerHTML = html;
            return divForm;
        })
}