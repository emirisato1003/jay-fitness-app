import React, { useEffect, useState } from 'react';
import { Box, Stack, Button, TextField } from '@mui/material';
import SearchExercises from '../../shared/ExerciseViewForm/SearchExercises';
import FilterExercise from '../../shared/ExerciseViewForm/FilterExercise';
// import '../../service/service';
import ExerciseListCard from './ExerciseListCard';
import styles from './ExerciseList.module.css';
import { fetchData, exerciseOptions } from '../../utils/fetchData';


const baseUrl = `https://exercisedb.p.rapidapi.com/exercises`;
const mockBaseUrl = `/api/exercises`;

export default function ExerciseList() {
    // --- useState ---
    const [exercisesList, setExercisesList] = useState([]);
    const [bodyPart, setBodyPart] = useState('all')
    const exerciseFetchData = async () => {
        const {exercises, error} = await fetchData(baseUrl, exerciseOptions);
        setExercisesList(exercises);
        console.log(error);
    };

    useEffect(() => {
        exerciseFetchData();
    }, []);
    // console.log(exercisesList.map(i => typeof i.id));
    return (
        <main>
            <section className={styles.exerciseSearch}>
                <SearchExercises
                    exercisesList={exercisesList}
                    setExercisesList={setExercisesList}
                />
            </section>
            <section className={styles.exerciseFilter}>
                <FilterExercise setBodyPart={setBodyPart}/>
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
