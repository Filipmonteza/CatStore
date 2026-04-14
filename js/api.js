async function fetchCats() {
    try{
        const response = await fetch('https://api.thecatapi.com/v1/images/search?limit=10');
        const data = await response.json();
        return data;
    }
}