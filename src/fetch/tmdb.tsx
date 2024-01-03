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

export const getSearch = async (
  mediaType: "tv" | "movie" = "movie",
  search: string,
  page: number
) => {
  const apiUrl = `${tmdbBaseUrl}/search/${mediaType}?query=${search}&include_adult=false?language=pt-BR&page=${page}`;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: "Bearer " + apiToken,
    },
  };

  try {
    const response = await axios.get(apiUrl, options);
    const data = await response.data;

    return data.results;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
};
