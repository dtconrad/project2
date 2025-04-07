document.addEventListener("DOMContentLoaded", function() {
    const button = document.getElementById("button-search");
    const input = document.getElementById("input-search");

    button.addEventListener("click", function() {
        alert('Button clicked!');
        sendApiRequest();
    });

    // Removed duplicate keyup event listener to consolidate functionality
});

function sendApiRequest() {
    const userInput = document.getElementById("input-search").value;
    const giphyApiKey = "8CnSdnrJv7cSbiHlT31qy35OzlmFCouN"; 
    const giphyUrl = `https://api.giphy.com/v1/gifs/search?q=${encodeURIComponent(userInput)}&rating=g&api_key=${giphyApiKey}`;

    fetch(giphyUrl)
        .then(function(response) {
            return response.json();
        })
        .then(function(json) {
            const resultsContainer = document.getElementById("results");
            resultsContainer.innerHTML = ""; // Clear previous results
            const fragment = document.createDocumentFragment();
            json.data.forEach(gif => {
                const img = document.createElement("img");
                img.src = gif.images.fixed_height.url;
                img.alt = gif.title;
                img.className = "m-2";
                fragment.appendChild(img);
            });
            resultsContainer.appendChild(fragment);
        })
        .catch(function(error) {
            console.error("Error fetching GIPHY API:", error);
            const resultsContainer = document.getElementById("results");
            resultsContainer.innerHTML = '<p class="text-danger">Failed to fetch GIFs. Please try again later.</p>';
        });
}
// Removed duplicate DOMContentLoaded listener and merged functionality into the first one