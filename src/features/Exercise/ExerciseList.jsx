import React, { useEffect, useState } from 'react';
import { Box, Stack, Button, TextField } from '@mui/material';
import SearchExercises from '../../shared/ExerciseViewForm/SearchExercises';
import FilterExercise from '../../shared/ExerciseViewForm/FilterExercise';
// import '../../service/service';
import ExerciseListCard from './ExerciseListCard';
import styles from './ExerciseList.module.css';
import { fetchData, exerciseOptions } from '../../utils/fetchData';
import { MdError } from "react-icons/md";

const baseUrl = `https://exercisedb.p.rapidapi.com/exercises`;
const mockBaseUrl = `/api/exercises`;

export default function ExerciseList({ exercisesList, setExercisesList, bodyPart, setBodyPart, filteredExercises, errorMessage }) {
    console.log(exercisesList.map(item => {
        // const allItems = item.flat()
        return [...new Set(item.secondaryMuscles)];
    }));
    return (
        <main>
            {errorMessage ?
                <div style={{ border: '3px dashed var(--accent-color)', padding: '3em' }}>
                    <h1><span style={{ color: 'var(--accent-color)' }}><MdError /> {errorMessage}</span><br /> Something went wrong. Please try again later.</h1>
                </div>
                : <>
                    <section className={styles.exerciseSearch}>
                        <SearchExercises
                            exercisesList={exercisesList}
                            setExercisesList={setExercisesList}
                        />
                    </section>
                    <section className={styles.exerciseFilterCards}>
                        <FilterExercise setBodyPart={setBodyPart} />
                        <hr />
                    </section>
                    {filteredExercises.length === 0 ?
                        <h1>No exercise Found</h1>
                        :
                        <>
                            <section className={styles.exercises}>
                                <h1 style={{ margin: '0 0 .7em 3em' }}>{bodyPart} Exercises</h1>
                                <div className={styles.exerciseLists}>
                                    {filteredExercises.map(exercise =>
                                        <ExerciseListCard
                                            key={exercise.id}
                                            exercise={exercise}
                                        />)}
                                </div>
                            </section>
                        </>
                    }
                </>
            }
        </main>
    );
}



// "feet", --- 'muscle'
// "grip muscles", -- 'muscle'
// "hands", -- 'muscle'


// 14:"serratus anterior" -- 'muscle'
