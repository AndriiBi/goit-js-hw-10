import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_Ovt6gwWdNBIla6AzMcLrDRtgKoXbkGVUEBuVtcBJT4FE1RIvB1ljaSqMmvocrRF8";

export function fetchBreeds() {
    return axios.get("https://api.thecatapi.com/v1/breeds")
        .then(response => response.data)
        .catch(error => {
            throw error;
        });
}

export function fetchCatByBreed(breedId) {
    const url = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`;
    return axios.get(url)
        .then(response => response.data)
        .catch(error => {
            throw error;
        });
}
