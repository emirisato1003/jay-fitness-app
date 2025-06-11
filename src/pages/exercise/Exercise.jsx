import React, { useEffect } from 'react';
import { Box, Stack, Button, TextField } from '@mui/material';
import SearchExercises from './SearchExercises';

const token = import.meta.env.EXERCISE_API_KEY;
const host = 'exercisedb.p.rapidapi.com';
export default function Exercise() {
    // const baseUrl = `https://exercisedb.p.rapidapi.com/exercises?limit=10&offset=0`;
    const name = '';
    const option = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': token,
            'x-rapidapi-host': host
        }
    };

    // const [text, setText] = useState('');

    const exerciseFetchData = async () => {
        try {
            const response = await fetch(baseUrl, option);
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
        <main className='exercise'>
            <SearchExercises />
            <h1>exercise list goes here</h1>
        </main>
    );
}
