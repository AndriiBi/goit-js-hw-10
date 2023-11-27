import { fetchBreeds, fetchCatByBreed } from "./cat-api";

document.addEventListener("DOMContentLoaded", () => {
    const breedSelect = document.querySelector(".breed-select");
    const catInfoDiv = document.querySelector(".cat-info");
    const loader = document.querySelector(".loader");
    const error = document.querySelector(".error");

    // Load breeds on page load
    fetchBreeds()
        .then(breeds => {
            fillBreedsSelect(breeds);
        })
        .catch(err => {
            showError(err);
        });

    // Handle breed selection
    breedSelect.addEventListener('change', () => {
        const selectedBreedId = breedSelect.value;
        if (selectedBreedId) {
            showLoader();
            hideError();
            fetchCatByBreed(selectedBreedId)
                .then(catData => {
                    displayCatInfo(catData[0]);
                })
                .catch(err => {
                    showError(err);
                })
                .finally(() => {
                    hideLoader();
                });
        }
    });

    // Display cat information
    function displayCatInfo(catData) {
        catInfoDiv.innerHTML = `
            <img src="${catData.url}" alt="Cat Image">
            <p>Breed: ${catData.breeds[0].name}</p>
            <p>Description: ${catData.breeds[0].description}</p>
            <p>Temperament: ${catData.breeds[0].temperament}</p>
        `;
        catInfoDiv.style.display = "block";
    }

    // Show/hide loader
    function showLoader() {
        loader.style.display = "block";
    }

    function hideLoader() {
        loader.style.display = "none";
    }

    // Show/hide error
    function showError(err) {
        error.style.display = "block";
        console.error(err);
    }

    function hideError() {
        error.style.display = "none";
    }

    // Helper function to fill the breeds select
    function fillBreedsSelect(breeds) {
        breeds.forEach(breed => {
            const option = document.createElement("option");
            option.value = breed.id;
            option.text = breed.name;
            breedSelect.add(option);
        });
    }
});
