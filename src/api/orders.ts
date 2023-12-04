import Cookies from "universal-cookie";
import {httpRequest} from "@/api/common";
import {Order, OrderInput} from "@/model/orderData";

export const getOrders = async (): Promise<Order[]> => {
    const cookie = new Cookies();
    return await httpRequest.get<Order[]>("v1/private/order/getAllMyOrders",
        {headers: {Authorization: "Bearer " + cookie.get('jwtToken')}})
        .then(value => value.data);
}
export const getUserOrders = async (id: number): Promise<Order[]> => {
    const cookie = new Cookies();
    return await httpRequest.get<Order[]>(`v1/private/order/getAllOrderByUserId/${id}`,
        {headers: {Authorization: "Bearer " + cookie.get('jwtToken')}})
        .then(value => value.data);
}
export const createOrder = async (data: OrderInput, userId: number): Promise<Order> => {
    const cookie = new Cookies();
    return await httpRequest.post<Order>(`v1/private/order/create/${userId}`, data,
        {headers: {Authorization: "Bearer " + cookie.get('jwtToken')}})
        .then(value => value.data)
}
export const updateOrder = async (id: number, data: OrderInput, userId: number): Promise<Order> => {
    const cookie = new Cookies();
    return await httpRequest.patch<Order>(`v1/private/order/update/${id}/${userId}`, data,
        {headers: {Authorization: "Bearer " + cookie.get('jwtToken')}})
        .then(value => value.data)
}
export const deleteOrder = async (id: number): Promise<Order> => {
    const cookie = new Cookies();
    return await httpRequest.delete<Order>(`v1/private/order/delete/${id}`,
        {headers: {Authorization: "Bearer " + cookie.get('jwtToken')}})
        .then(value => value.data)
}