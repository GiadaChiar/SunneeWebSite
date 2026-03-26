

//generate id 
export function generateId(): string | null {
    const value = Math.random().toString(32).substring(2, 9);
    console.log("NUMERO GENERATO", value)
    return value

}
