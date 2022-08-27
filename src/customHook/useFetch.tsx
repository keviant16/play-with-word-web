import { useEffect, useState } from "react";

const dataInit = {
    data: [],
    randomWord: ""
}

const useFetch = (url: RequestInfo | URL) => {
    const [data, setData] = useState(dataInit);

    useEffect(() => {
        fetch(url)
            .then((res) => res.json())
            .then((dataResponse: [] | any) => setData({ data: dataResponse, randomWord: dataResponse[Math.floor(Math.random() * dataResponse.length)] }))
    }, [url]);

    return data;
}
export default useFetch;