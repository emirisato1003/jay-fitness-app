import { useCallback, useEffect, useRef, useState } from 'react';
import ExerciseListCard from '../shared/Exercise/ExerciseListCard';
import ExerciseViewForm from '../features/ExerciseViewForm/ExerciseViewForm';
import { fetchData, exerciseOptions } from '../utils/fetchData';

import styles from './Exercises.module.css';

import { MdError } from "react-icons/md";
import { useSearchParams } from 'react-router';
import Pagination from '../shared/Pagination/Pagination';

const baseUrl = `https://exercisedb.p.rapidapi.com/exercises`;

export default function Exercises() {

    const [exercisesList, setExercisesList] = useState([]);
    const [originalExerciseList, setOriginalExercisesList] = useState([]);
    const [bodyPart, setBodyPart] = useState('all');
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();
    console.log(searchParams.toString())
    const exerciseSectionRef = useRef(null);

    const exerciseFetchData = async () => {
        let exercisesData = [];
        exercisesData = await fetchData(`${baseUrl}?limit=0`, exerciseOptions, () => setIsLoading(true), () => setIsLoading(false));
        setErrorMessage(exercisesData.error);
        setExercisesList(exercisesData.data);
        setOriginalExercisesList(exercisesData.data);
    };

    useEffect(() => {
        exerciseFetchData();
    }, []);

    const typeFilter = searchParams.get('bodyPart') || 'all';
    const filteredExercise = exercisesList.filter(exercise => typeFilter === 'all' ? exercise : typeFilter === exercise.bodyPart);

    const itemsPerPage = 10;
    const currentPage = parseInt(searchParams.get('page') || '1');
    const indexOfFirstExercise = itemsPerPage * (currentPage - 1);
    const indexOfLastExercise = currentPage * itemsPerPage;
    const totalPages = Math.ceil(filteredExercise.length / itemsPerPage);
    const currentExercises = filteredExercise.slice(indexOfFirstExercise, indexOfLastExercise);

    return (
        <main>
            {!errorMessage ?
                <>
                    <ExerciseViewForm
                        setBodyPart={setBodyPart}
                        filteredExercise={filteredExercise}
                        setExercisesList={setExercisesList}
                        originalExerciseList={originalExerciseList}
                        setSearchParams={setSearchParams}
                        exerciseSectionRef={exerciseSectionRef}
                        searchParams={searchParams} />
                    {isLoading
                        ? <h1>Loading...</h1>
                        : filteredExercise.length === 0
                            ? <h1>No exercise Found</h1>
                            : <>
                                <section ref={exerciseSectionRef} className={styles.exercises}>
                                    <h1 style={{ margin: '0 0 .7em 3em' }}>{bodyPart} Exercises</h1>
                                    <div className={styles.exerciseLists}>
                                        {currentExercises.map(exercise =>
                                            <ExerciseListCard
                                                key={exercise.id}
                                                exercise={exercise}
                                                searchParams={searchParams}
                                            />)}
                                    </div>
                                    <Pagination currentPage={currentPage} page={'page'} totalPages={totalPages} exerciseSectionRef={exerciseSectionRef} setSearchParams={setSearchParams} />
                                </section>
                            </>

                    }
                </>
                : <div style={{ border: '3px dashed var(--accent-color)', padding: '3em' }}>
                    <h1><span style={{ color: 'var(--accent-color)' }}><MdError /> {errorMessage}</span><br /> Something went wrong. Please try again later.</h1>
                </div>
            }
        </main>
    );
}