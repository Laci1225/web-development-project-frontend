import {httpRequest, httpRequestServer} from "@/api/common";
import {UserData, UserDataRegistration} from "@/model/userData";
import {LoginData} from "@/model/loginData";
import Cookies from 'universal-cookie';


export const registerUser = async (data: UserDataRegistration) => {
    return await httpRequest.post<UserDataRegistration>("v1/auth/register", data)
        .then(value => value.data)
}
export const loginUser = async (data: LoginData) => {
    return await httpRequest.post<Object>("v1/auth/authenticate", data)
        .then(value => value.data)
}
export const getAllUserServer = async () => {
    return await httpRequestServer.get<UserData[]>("v1/hello/getAllUser")
        .then(value => value.data)
}
export const getMyData = async () => {
    const cookie = new Cookies();
    return await httpRequest.get<UserData>("v1/private/getMyData",
        {headers: {Authorization: "Bearer " + cookie.get('jwtToken')}})
        .then(value => value.data);
}

export const createOrder = async (data) => {
    return await httpRequest.post(`/orders/createOrder`, data)
        .then(value => value.data)
}

export const updateOrder = async (data) => {
    return await httpRequest.patch(`/orders/updateOrder`, data)
        .then(value => value.data)
}

export const deleteOrder = async (id: number) => {
    return await httpRequest.delete(`/orders/deleteOrder/${id}`)
        .then(value => value.data)
}