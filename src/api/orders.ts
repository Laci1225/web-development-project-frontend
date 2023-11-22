import Cookies from "universal-cookie";
import {httpRequest} from "@/api/common";
import {Order, OrderInput} from "@/model/orderData";

export const getOrders = async () => {
    const cookie = new Cookies();
    return await httpRequest.get<Order[]>("v1/private/getAllOrderByUserId",
        {headers: {Authorization: "Bearer " + cookie.get('jwtToken')}})
        .then(value => value.data);
}
export const createOrder = async (data: OrderInput) => {
    const cookie = new Cookies();
    return await httpRequest.post(`v1/private/create`, data,
        {headers: {Authorization: "Bearer " + cookie.get('jwtToken')}})
        .then(value => value.data)
}
export const updateOrder = async (id: number, data: OrderInput) => {
    const cookie = new Cookies();
    return await httpRequest.patch(`v1/private/update`, data,
        {headers: {Authorization: "Bearer " + cookie.get('jwtToken')}})
        .then(value => value.data)
}