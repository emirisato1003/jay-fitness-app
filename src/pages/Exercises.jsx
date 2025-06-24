import { useCallback, useEffect, useRef, useState } from 'react';
import ExerciseListCard from '../shared/Exercise/ExerciseListCard';
import ExerciseViewForm from '../features/ExerciseViewForm/ExerciseViewForm';
import { fetchData, exerciseOptions } from '../utils/fetchData';

import styles from './Exercises.module.css';

import { MdError } from "react-icons/md";
import { useSearchParams } from 'react-router';
import Pagination from '../shared/Pagination/Pagination';
import ErrorDialog from '../shared/ErrorDialog';

const baseUrl = `https://exercisedb.p.rapidapi.com/exercises`;

export default function Exercises() {

    const [exercisesList, setExercisesList] = useState([]);
    const [originalExerciseList, setOriginalExercisesList] = useState([]);
    const [bodyPart, setBodyPart] = useState('all');
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();
    const exerciseSectionRef = useRef(null);

    const exerciseFetchData = async () => {
        setIsLoading(true);
        try {
            const exercisesData = await fetchData(`${baseUrl}?limit=0`, exerciseOptions);
            setExercisesList(exercisesData.data);
            setOriginalExercisesList(exercisesData.data);
        } catch (err) {
            setErrorMessage(err)
        } finally {
            setIsLoading(false);
        }
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
    console.log(`exercises.jsx isLoading state`, isLoading)
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
                : <ErrorDialog errorMessage={errorMessage.message}/>
            }
        </main>
    );
}