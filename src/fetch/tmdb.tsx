import axios, { AxiosResponse } from "axios";

const apiKey = import.meta.env.VITE_TMDB_API_KEY;
const apiToken = import.meta.env.VITE_TMDB_API_TOKEN;
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

export const fetchDataPopular = async (
  mediaType: "tv" | "movie" = "movie",
  page: number
) => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: "Bearer " + apiToken,
    },
  };

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/${mediaType}/popular?language=pt-BR&page=${page}`,
      options
    );
    const json = await response.json();
    return json.results;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
};
