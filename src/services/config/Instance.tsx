import axios from "axios";

export const instance = axios.create({
    baseURL: "https://pww-ws-app.herokuapp.com",
    headers: {
        "Access-Control-Allow-Origin": "*",
        'Content-Type': 'application/json;charset=utf-8'
    }
})