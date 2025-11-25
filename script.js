const accesskey = "V7_KHSjybxkVri_CjOMC4bTdcBprxrvjR6sH5t9KX9M";

const formel = document.querySelector("form");
const inputel = document.getElementById("Search-input");
const searchresults = document.querySelector(".search-results");
const showmore = document.getElementsByClassName("showmorebtn");

let inputdata = "";
let page = 1;

async function searchimages() {
    inputdata = inputel.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}
    &query=${inputdata}&client_id=${accesskey}`;

    const response = await fetch(url);
    const data = await response.json();
    const results = data.results;

    if (page == 1) {
        searchresults.innerHTML = "";
    }

    results.map((result) => {
        const imagewrapper = document.createElement("div");
        imagewrapper.classList.add("search-result");
        const image = document.createElement("img");
        image.src = result.urls.small;
        image.alt = result.alt_description;
        const imagelink = document.createElement("a");
        imagelink.href = result.links.html;
        imagelink.target = "_blank";
        imagelink.textContent = result.alt_description;

        imagewrapper.appendChild(image);
        imagewrapper.appendChild(imagelink);
        searchresults.appendChild(imagewrapper);

    });

    page++;
    if (page > 1) {
        showmore.style.display = "block";
    }
}

formel.addEventListener("submit", (event) => {
    event.preventDefault()
    page = 1;
    searchimages();
});

showmore.addEventListener("click", () => {
    searchimages();
});