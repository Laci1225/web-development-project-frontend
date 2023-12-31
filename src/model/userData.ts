import {Order} from "@/model/orderData";

export interface UserData {
    id: number
    username: string,
    email: string,
    orders: Order[],
    role: string
}


export interface UserDataRegistration {
    username: string,
    email: string,
    password: string
}