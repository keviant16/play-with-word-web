import { useEffect, useState } from "react";

const useFetch = (url: RequestInfo | URL) => {
    const [data, setData] = useState({});

    useEffect(() => {
        fetch(url)
            .then((res) => res.json())
            .then((repsonse: [] | string) => setData(repsonse))
    }, [url]);

    return data;
}
export default useFetch;