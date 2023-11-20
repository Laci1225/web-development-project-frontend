import {httpRequest} from "@/api/common";
import {RegisterData} from "@/model/registerData";

export const postRegister = async (data: RegisterData) => {
    let value = await httpRequest.post("/register", data);
    return await value.data;
}