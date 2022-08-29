import axios from "axios";
import { v4 as uuidv4 } from 'uuid';

const url = "http://localhost:8080/statistics"

const config = {
    headers: {
        "Access-Control-Allow-Origin": "*",
        'Content-Type': 'application/json;charset=utf-8'
    }
}

class StatisticService {

    static add() {
        const code = uuidv4();
        console.log(typeof code);

        axios.post(url, { code: code }, config)
            .then((res: any) => window.localStorage.setItem("code", res?.data.code))
    }

    static update(data: string) {

        axios.put(url, { value: data }, config)
            .then(res => console.log(res))
    }
}
export default StatisticService;