import { instance } from "./config/Instance";

export const getRandomWord = async (userID: number | null) => {
    try {
        const response = await instance.get(`/words/random?id=${userID}`)
        return response.data
    } catch (error) {
        console.error(error);
    }
}