import { useEffect, useState } from "react";

const dataInit = {
    data: [],
    randomWorld: ""
}

const useFetch = (url: RequestInfo | URL) => {
    const [data, setData] = useState(dataInit);

    useEffect(() => {
        fetch(url)
            .then((res) => res.json())
            .then((dataResposne: [] | any) => setData({ data: dataResposne, randomWorld: dataResposne[Math.floor(Math.random() * dataResposne.length)] }))
    }, [url]);

    return [data];
}
export default useFetch;