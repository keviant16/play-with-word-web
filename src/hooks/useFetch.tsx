import { useEffect, useState, } from "react";
import axios from "axios";

const config = {
    headers: {
        "Access-Control-Allow-Origin": "*",
        'Content-Type': 'application/json;charset=utf-8'
    }
}

const useFetch = (url: string) => {
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        let isSubscribed = true;
        axios.get(url, config)
            .then((res: any) => {
                if (isSubscribed) {
                    setData(res.data)
                }
            })
        return (): any => isSubscribed = false;
    }, [url]);
    return data;
}
export default useFetch;