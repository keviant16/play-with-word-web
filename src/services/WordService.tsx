import axios from "axios";

const url = "http://localhost:8080/lastWords"

const config = {
    headers: {
        "Access-Control-Allow-Origin": "*",
        'Content-Type': 'application/json;charset=utf-8'
    }
}

class WordService {
    static add(data: string) {
        axios.post(url, { value: data }, config)
            .then(res => console.log(res))
    }
}
export default WordService;