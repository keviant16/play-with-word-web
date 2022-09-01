
import axios from "axios";

const url = "http://localhost:8080/infoUsers/"
const config = {
    headers: {
        "Access-Control-Allow-Origin": "*",
        'Content-Type': 'application/json;charset=utf-8'
    }
}

export const getInfoUser = async (infoUser: any, userID: string | null) => {
    try {
        const response = await axios.put(url + userID, infoUser, config)
        console.log(response);
    } catch (error) {
        console.error(error);
    }
}

export const updateInfoUser = async (infoUser: any, userID: string | null) => {

    try {
        const response = await axios.put(url + userID, infoUser, config)
        console.log(response);
    } catch (error) {
        console.error(error);
    }
}
