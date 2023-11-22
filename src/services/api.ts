import axios from "axios";
const token = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMTI5NGFiMmExYTA5ZjdhNjViNGI5OGQwMTQ4ZDE2MyIsInN1YiI6IjYyMTUzMmY5OWY1ZGZiMDA0MTRkNmI1NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4YOwyMCRKRKM5TnGSAWV0MNZfs8FuKdjGA4sDxanzCw"
export default axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
