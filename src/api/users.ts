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
export const loginUser = async (data: LoginData): Promise<Token> => {
    return await httpRequest.post<Token>("v1/auth/authenticate", data)
        .then(value => value.data)
}
export const getAllUserServer = async (): Promise<UserData[]> => {
    return await httpRequestServer.get<UserData[]>("v1/hello/getAllUser")
        .then(value => value.data)
}
export const getMyData = async (): Promise<UserData> => {
    const cookie = new Cookies();
    return await httpRequest.get<UserData>("v1/private/getMyData",
        {headers: {Authorization: "Bearer " + cookie.get('jwtToken')}})
        .then(value => value.data);
}

export const deleteUser = async (id: number): Promise<UserData> => {
    const cookie = new Cookies();
    return await httpRequest.delete<UserData>(`v1/private/delete/${id}`,
        {headers: {Authorization: "Bearer " + cookie.get('jwtToken')}})
        .then(value => value.data);
}
export const getUserData = async (id: number) => {
    const cookie = new Cookies();
    return await httpRequest.get<UserData>(`v1/private/getUserData/${id}`,
        {headers: {Authorization: "Bearer " + cookie.get('jwtToken')}})
        .then(value => value.data);
}

export const updateUser = async (username: string, data: UserDataRegistration): Promise<UserData> => {
    const cookie = new Cookies();
    return await httpRequest.patch<UserData>(`v1/private/update/${username}`, data,
        {headers: {Authorization: "Bearer " + cookie.get('jwtToken')}})
        .then(value => value.data)
}