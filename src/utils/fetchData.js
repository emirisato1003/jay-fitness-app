
const token = import.meta.env.EXERCISES_DATA_API_KEY;
// const host = 'exercisedb.p.rapidapi.com';
export const exerciseOptions = {
    method: 'GET',
    headers: {
        'x-rapidapi-host': 'exercisedb.p.rapidapi.com',
        'x-rapidapi-key': token,
    }
};


export const fetchData = async (url, options, onStart, onEnd) => {
    try {
        onStart && onStart();
        const res = await fetch(url, options);
        if (!res.ok) {
            throw new Error(res.status);
        }
        const data = await res.json();
        return data;
    } catch (err) {
        return { error: err.message };
    } finally {
        onEnd && onEnd();
    }

};