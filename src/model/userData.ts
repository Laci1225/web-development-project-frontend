export interface UserData {
    id: number
    username: string,
    email: string,
    orders: Order[]
}

export interface Order {
    id: number
    name: string,
    amount: string,
    weight: string,
}

export interface UserDataRegistration {
    username: string,
    email: string,
    password: string
}