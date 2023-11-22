import {httpRequest, httpRequestServer} from "@/api/common";
import {UserData, UserDataRegistration} from "@/model/userData";
import {LoginData} from "@/model/loginData";
import Cookies from 'universal-cookie';

interface Token {
    token: string
}

export const registerUser = async (data: UserDataRegistration) => {
    return await httpRequest.post<UserDataRegistration>("v1/auth/register", data)
        .then(value => value.data)
}
export const loginUser = async (data: LoginData) => {
    return await httpRequest.post<Token>("v1/auth/authenticate", data)
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

export const deleteUser = async (id: number) => {
    const cookie = new Cookies();
    return await httpRequest.delete<UserData>(`v1/private/delete/${id}`,
        {headers: {Authorization: "Bearer " + cookie.get('jwtToken')}})
        .then(value => value.data);
}
/*


export const updateOrder = async (data) => {
    return await httpRequest.patch(`/orders/updateOrder`, data)
        .then(value => value.data)
}

export const deleteOrder = async (id: number) => {
    return await httpRequest.delete(`/orders/deleteOrder/${id}`)
        .then(value => value.data)
}*/