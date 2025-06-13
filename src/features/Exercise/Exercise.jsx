import React, { useEffect, useState } from 'react';
import { Box, Stack, Button, TextField } from '@mui/material';
import SearchExercises from '../../shared/ExerciseViewForm/SearchExercises';
import '../../service/service';
import ExerciseListCard from './ExerciseListCard';
import styles from './Exercise.module.css';

const token = import.meta.env.EXERCISE_API_KEY;
const host = 'exercisedb.p.rapidapi.com';
// const baseUrl = `https://exercisedb.p.rapidapi.com/exercises?limit=10&offset=0`;
const mockBaseUrl = `/api/exercises`;

export default function ExerciseList() {
    // --- useState ---
    const [exerciseList, setExerciseList] = useState([]);

    const name = '';
    const option = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': token,
            'x-rapidapi-host': host
        }
    };

    const exerciseFetchData = async () => {
        try {
            const response = await fetch(mockBaseUrl);
            console.log(response.status);
            const { exercises } = await response.json();
            setExerciseList(exercises);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        exerciseFetchData();
    }, []);

    return (
        <main>
            <section className={styles.exerciseSearchBar}>
                <SearchExercises />
            </section>
            <section className={styles.exerciseFilter}>

            </section>
            <section className={styles.exerciseLists}>
                {exerciseList.map(exercise => <ExerciseListCard key={exercise.id} exercise={exercise} />)}
            </section>
        </main>
    );
}
