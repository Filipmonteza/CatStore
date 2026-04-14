let navbarPath = "pages/navbar.html";

if (window.location.href.includes("/pages/")) {
  navbarPath = "navbar.html";
}

fetch(navbarPath)
  .then(response => response.text())
  .then(data => {
    document.getElementById("navbar").innerHTML = data;
  })
  .catch(error => {
    console.error("Kunde inte ladda navbar:", error);
  });