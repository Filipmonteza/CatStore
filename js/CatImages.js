async function fetchCats() {
  const res = await fetch("https://api.thecatapi.com/v1/images/search?limit=5");
  const data = await res.json();
  return data.map(cat => cat.url);
}

async function startSlideshow() {
    const images = await fetchCats();
    console.log(images);
  let index = 0;

  const imgElement = document.getElementById("catImage");

  setInterval(() => {
    imgElement.src = images[index];
    index = (index + 1) % images.length;
    console.log(imgElement.src);
  }, 10000); // Byt bild var 10:e sekund
}

startSlideshow();
