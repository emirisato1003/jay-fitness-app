import React, { useEffect } from 'react';

export default function Exercise() {
    const baseUrl = `https://exercisedb.p.rapidapi.com/exercises/name/${name}`;
    const name = '';
    const exerciseOptions = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': import.meta.env.EXERCISE_API_KEY,
            'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
        }
    };

    // const [text, setText] = useState('');

    const exerciseFetchData = async () => {
        try {
            const response = await fetch(exerciseUrl, exerciseOptions);
            console.log(response.status);
            const result = await response.json();
            console.log(result);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        exerciseFetchData();
    }, []);

    return (
        <div>
            <h1>exercise search and list page goes here</h1>
        </div>
    );
}
