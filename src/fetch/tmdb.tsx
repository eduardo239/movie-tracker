import axios, { AxiosResponse } from "axios";

const apiKey = import.meta.env.VITE_TMDB_API_KEY;
const tmdbBaseUrl = import.meta.env.VITE_TMDB_BASE_URL;

export async function fetchData(
  type: "movie" | "tv",
  movieId: string | null
): Promise<AxiosResponse> {
  const response = await axios.get(`${tmdbBaseUrl}/${type}/${movieId}`, {
    params: {
      api_key: apiKey,
    },
  });
  return response;
}

export async function fetchTrailers(
  type: "movie" | "tv",
  movieId: string | null
): Promise<AxiosResponse> {
  const response = await axios.get(`${tmdbBaseUrl}/${type}/${movieId}/videos`, {
    params: {
      api_key: apiKey,
    },
  });
  return response;
}

export async function fetchCast(
  type: "movie" | "tv",
  movieId: string | null
): Promise<AxiosResponse> {
  const response = await axios.get(
    `${tmdbBaseUrl}/${type}/${movieId}/credits`,
    {
      params: {
        api_key: apiKey,
      },
    }
  );
  return response;
}
