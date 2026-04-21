//filter swim-suit subcategory
export function showHidden(subMenuId: string):void {
    const subMenu = document.getElementById(subMenuId)
    if (subMenu) {
        if (subMenu.dataset.show === "none") {
            subMenu.dataset.show = "see"
        } else {
            subMenu.dataset.show = "none"
        }
    }
}