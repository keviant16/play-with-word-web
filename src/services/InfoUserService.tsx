
import { instance } from "./config/Instance";

export const updateInfoUser = async (infoUser: any, userID: number | null) => {
    try {
        const response = await instance.put(`/infoUsers/${userID}`, infoUser)
        return response
    } catch (error) {
        console.error(error);
    }
}

export const getInfoUser = async (userID: number | null) => {
    try {
        const response = await instance.get(`/infoUsers/${userID}`)
        return response.data
    } catch (error) {
        console.error(error);
    }
}



export const getInfoUserWords = async (userID: number | null) => {
    try {
        const response = await instance.get(`/infoUsers/${userID}`)
        return response.data.words
    } catch (error) {
        console.error(error);
    }
}


export const addInfoUser = async (infoUser: any) => {
    try {
        const response = await instance.post(`/infoUsers`, infoUser)
        return response
    } catch (error) {
        console.error(error);
    }
}




