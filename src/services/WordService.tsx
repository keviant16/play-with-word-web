class WordService {

    static add(data: string) {
        fetch('http://localhost:3000/lastWords', {
            method: "POST",
            body: JSON.stringify(data),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        })
            .then(response => response.json())
            .then(json => console.log(json))
            .catch(err => console.log(err));
    }
}

export default WordService