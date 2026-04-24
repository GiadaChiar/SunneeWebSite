
///CLIENT INTERFACE 
export interface RegisterForm {
    id: string
    name: string;
    surname: string;
    email: string;
    password?: string;
    preferPayment: string;
}


export interface RegisterFormReservate {
    email: string;
    password: string;
}



//--------STATIC USERS ----------------------

//login Admin

export const reservedUsers: RegisterFormReservate[] = [
    {
        email: "admin@site.com",
        password: "admin123"
    },
    {
        email: "manager@site.com",
        password: "manager123"
    }
];


//login Users


//login default users

export const users: RegisterForm[] = [
    {
        "id": "jugriut",
        "name": "Giovanni",
        "surname": "Francese",
        "email": "jjovany@gmail.com",
        "preferPayment": "card",
        "password": "jjova908@"
    },
    {
        "id": "g3rt1tk",
        "name": "Samanta",
        "surname": "Rosie",
        "email": "rosiesam@gmail.com",
        "preferPayment": "card", 
        "password": "A9b!cD3e"
    },
    {

        "id": "k0xv2oa",
        "name": "Roberto",
        "surname": "Rossi",
        "email": "robertorossi@gmail.com",
        "preferPayment": "paypal",
        "password": "Rob124@ll"
    }

]




//------END STATIC USERS -----------------------