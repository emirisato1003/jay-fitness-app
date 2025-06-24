
const token = import.meta.env.VITE_EXERCISES_API_KEY;
const youtubeToken = import.meta.env.VITE_YOUTUBE_API_KEY;

export const exerciseOptions = {
    method: 'GET',
    headers: {
        'x-rapidapi-host': 'exercisedb.p.rapidapi.com',
        'x-rapidapi-key': token,
    }
};

export const youtubeOptions = {
    method: 'GET',
    headers: {
        'x-rapidapi-host': 'youtube-search-and-download.p.rapidapi.com',
        'x-rapidapi-key': youtubeToken
    }
};

export const fetchData = async (url, options) => {
    const res = await fetch(url, options);
    if (!res.ok) {
        throw new Error(`Failed to fetch data: ${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    return { data: data };
};