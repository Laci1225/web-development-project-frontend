import {httpRequest} from "@/api/common";
import {RegisterData} from "@/model/registerData";
import {LoginData} from "@/model/loginData";
import axios from "axios";

export const postRegister = async (data: RegisterData) => {
    let value = await httpRequest.post<RegisterData>("/register", data);
    console.log(value)
    return value.data;
}
export const postLogin = async (data: LoginData) => {
    let value = await httpRequest.post<LoginData>("/authenticate", data)
    console.log(value)
    return value.data;
}