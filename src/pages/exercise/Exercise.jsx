import React, { useEffect } from 'react';

export default function Exercise() {
    
    const name = '';
    const exerciseUrl = `https://exercisedb.p.rapidapi.com/exercises/name/${name}`;
    const exerciseOptions = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '8da38a4a0bmsh8786479b1290ccep10d763jsn0dd3c70a2bf8',
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
