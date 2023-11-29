import { fetchBreeds, fetchCatByBreed } from "./cat-api";
import Notiflix from "notiflix";
import SlimSelect from 'slim-select';

document.addEventListener("DOMContentLoaded", () => {
    const breedSelect = document.querySelector(".breed-select");
    const catInfoDiv = document.querySelector(".cat-info");
    const loader = document.querySelector(".loader");
    const error = document.querySelector(".error");

    fetchBreeds()
        .then(breeds => {
            fillBreedsSelect(breeds);
        })
        .catch(err => {
            showError(err);
        });

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

    function displayCatInfo(catData) {
        catInfoDiv.innerHTML = `
            <img src="${catData.url}" alt="Cat Image" style="max-width: 500px; border-radius: 10px; margin-bottom: 10px;">
            <p style="font-size: 18px; margin-bottom: 8px;">Breed: ${catData.breeds[0].name}</p>
            <p style="font-size: 16px; margin-bottom: 8px;">Description: ${catData.breeds[0].description}</p>
            <p style="font-size: 16px;">Temperament: ${catData.breeds[0].temperament}</p>
        `;
        catInfoDiv.style.display = "block";
    }
    function showLoader() {
        loader.style.display = "block";
    }

    function hideLoader() {
        loader.style.display = "none";
    }

    function showError(err) {
        Notiflix.Notify.Failure('Oops! Something went wrong. Try again later.');
        console.error(err);
    }

    function hideError() {
        error.style.display = "none";
    }

    function fillBreedsSelect(breeds) {
        breeds.forEach(breed => {
            const option = document.createElement("option");
            option.value = breed.id;
            option.text = breed.name;
            breedSelect.add(option);
        });
    }
});
