async function fetchCats() {
    
    try{
        const response = await fetch('https://api.thecatapi.com/v1/breeds?limit=30');
        const data = await response.json();
        cats = data;
        filteredCats = data;
        renderCats();
    }catch(error) {
        console.error('Error fetching cats:', error);
    }
}