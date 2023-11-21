import Cookies from "universal-cookie";
import {httpRequest} from "@/api/common";
import {Order} from "@/model/userData";

export const getOrders = async () => {
    const cookie = new Cookies();
    return await httpRequest.get<Order[]>("v1/private/getAllOrderByUserId",
        {headers: {Authorization: "Bearer " + cookie.get('jwtToken')}})
        .then(value => value.data);
}