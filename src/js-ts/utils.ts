



//generate id 
export function generateId(): string  {
    const value = Math.random().toString(32).substring(2, 9);

    return value

}




//----------LOG IN SECTION--------------------------------------------------


// global state page login to admin login and standard user
let isAdminLogin = false;

export function setAdminLogin(value: boolean) {
    isAdminLogin = value;
}

export function getAdminLogin() {
    return isAdminLogin;
}


//---------------ADMIN SECTION--------------------------------------------------
