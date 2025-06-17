import React, { useEffect, useState } from 'react';
import { Box, Stack, Button, TextField } from '@mui/material';
import SearchExercises from '../../shared/ExerciseViewForm/SearchExercises';
import FilterExercise from '../../shared/ExerciseViewForm/FilterExercise';
import '../../service/service';
import ExerciseListCard from './ExerciseListCard';
import styles from './Exercise.module.css';
import { fetchData } from '../../utils/fetchData';
const token = import.meta.env.EXERCISE_API_KEY;
const host = 'exercisedb.p.rapidapi.com';
const baseUrl = `https://exercisedb.p.rapidapi.com/exercises`;
const mockBaseUrl = `/api/exercises`;

export default function ExerciseList() {
    // --- useState ---
    const [exercisesList, setExercisesList] = useState([]);
    const name = '';
    const option = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': token,
            'x-rapidapi-host': host
        }
    };

    const exerciseFetchData = async () => {
        const { exercises, error } = await fetchData(mockBaseUrl, null);
        setExercisesList(exercises);
        console.log(error);
    };

    useEffect(() => {
        exerciseFetchData();
    }, []);
    console.log(exercisesList);
    return (
        <main>
            <section className={styles.exerciseSearch}>
                <SearchExercises
                    exercisesList={exercisesList}
                    setExercisesList={setExercisesList}
                />
            </section>
            <section className={styles.exerciseFilter}>
                <FilterExercise />
            </section>
            {exercisesList.length === 0 ?
                <h1>No exercise Found</h1>
                : <section className={styles.exerciseLists}>
                    {exercisesList.map(exercise =>
                        <ExerciseListCard
                            key={exercise.id}
                            exercise={exercise}
                        />)}
                </section>
            }
        </main>
    );
}
