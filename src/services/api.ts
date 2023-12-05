import axios from "axios";

// Instância do Axios para o TMDB
const tmdbToken = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMTI5NGFiMmExYTA5ZjdhNjViNGI5OGQwMTQ4ZDE2MyIsInN1YiI6IjYyMTUzMmY5OWY1ZGZiMDA0MTRkNmI1NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4YOwyMCRKRKM5TnGSAWV0MNZfs8FuKdjGA4sDxanzCw"
const tmdbClient = axios.create({
 baseURL: "https://api.themoviedb.org/3",
 headers: {
   Authorization: `Bearer ${tmdbToken}`,
 },
});

const backendClient = axios.create({
 baseURL: "http://localhost:3002",
  headers: {
    "Content-type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
  },
});

export { tmdbClient, backendClient };
