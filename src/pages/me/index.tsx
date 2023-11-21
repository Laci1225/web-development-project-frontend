import {getMyData} from "@/api/users";
import {useState} from "react";
import {UserData} from "@/model/userData";

export default function Users() {
    const [data, setData] = useState<UserData>()
    getMyData().then(value => setData(value))
    return (
        <div>{<div>{data?.password}</div>}</div>
    )
}