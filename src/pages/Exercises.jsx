import { useCallback, useEffect, useState } from 'react';
import ExerciseListCard from '../features/Exercise/ExerciseListCard';
import ExerciseViewForm from '../shared/ExerciseViewForm/ExerciseViewForm';
// import '../../service/service';
import { fetchData, exerciseOptions } from '../utils/fetchData';

import styles from './Exercises.module.css';

// React Icons
import { MdError } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { useSearchParams } from 'react-router';

const baseUrl = `https://exercisedb.p.rapidapi.com/exercises`;
// const mockBaseUrl = `/api/exercises`;

export default function Exercises() {

    /*** useState ***/
    const [exercisesList, setExercisesList] = useState([]);
    const [originalExerciseList, setOriginalExercisesList] = useState([]);
    const [bodyPart, setBodyPart] = useState('all');
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();


    /*** Fetch Data ***/
    const exerciseFetchData =async () => {
        setSearchParams({ page: 1 });
        let exercisesData = [];
        exercisesData = await fetchData(`${baseUrl}?limit=0`, exerciseOptions, () => setIsLoading(true), () => setIsLoading(false));
        setErrorMessage(exercisesData.error);
        setExercisesList(exercisesData.data);
        setOriginalExercisesList(exercisesData.data);
        console.log('refetching...');
    }

    useEffect(() => {
        exerciseFetchData();
    }, []);

    /***Filter Exercise***/
    const filteredExercise = exercisesList.filter(exercise => bodyPart === 'all' ? exercise : bodyPart === exercise.bodyPart);

    /*** Pagination ***/
    const itemsPerPage = 10;
    const currentPage = parseInt(searchParams.get('page') || '1');
    const indexOfFirstExercise = itemsPerPage * (currentPage - 1);
    const indexOfLastExercise = currentPage * itemsPerPage;
    const totalPages = Math.ceil(filteredExercise.length / itemsPerPage);
    const currentExercises = filteredExercise.slice(indexOfFirstExercise, indexOfLastExercise);

    const handleFirstPage = () => {
        if (currentPage > 1) {
            setSearchParams({ page: 1 });
            window.scrollTo({ top: 1800, behavior: 'smooth' });
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setSearchParams({ page: currentPage - 1 });
            window.scrollTo({ top: 1800, behavior: 'smooth' });
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setSearchParams({ page: currentPage + 1 });
            window.scrollTo({ top: 1800, behavior: 'smooth' });
        }
    };

    const handleLastPage = () => {
        if (currentPage < totalPages) {
            setSearchParams({ page: totalPages });
            window.scrollTo({ top: 1800, behavior: 'smooth' });
        }
    };

    return (
        <main>
            {!errorMessage ?
                <>
                    <ExerciseViewForm setBodyPart={setBodyPart} filteredExercise={filteredExercise} setExercisesList={setExercisesList} originalExerciseList={originalExerciseList} setSearchParams={setSearchParams} />
                    {isLoading
                        ? <h1>Loading...</h1>
                        : filteredExercise.length === 0
                            ? <h1>No exercise Found</h1>
                            : <>
                                <section className={styles.exercises}>
                                    <h1 style={{ margin: '0 0 .7em 3em' }}>{bodyPart} Exercises</h1>
                                    <div className={styles.exerciseLists}>
                                        {currentExercises.map(exercise =>
                                            <ExerciseListCard
                                                key={exercise.id}
                                                exercise={exercise}
                                            />)}
                                    </div>
                                    {/*** pagination ***/}
                                    <div className={styles.paginationControls}>
                                        <div>
                                            <button onClick={() => handleFirstPage()} disabled={currentPage === 1}>
                                                <MdKeyboardDoubleArrowLeft className={styles.paginateIcon} />
                                            </button>
                                            <button onClick={() => handlePreviousPage()} disabled={currentPage === 1}>
                                                <MdKeyboardArrowLeft className={styles.paginateIcon} />
                                            </button>
                                        </div>
                                        <span>{currentPage} of {totalPages}</span>
                                        <div>
                                            <button onClick={() => handleNextPage()} disabled={currentPage === totalPages}>
                                                <MdKeyboardArrowRight className={styles.paginateIcon} />
                                            </button>
                                            <button onClick={() => handleLastPage()} disabled={currentPage === totalPages}>
                                                <MdKeyboardDoubleArrowRight className={styles.paginateIcon} />
                                            </button>
                                        </div>
                                    </div>
                                </section>
                            </>

                    }
                </>
                /***Error Message***/
                : <div style={{ border: '3px dashed var(--accent-color)', padding: '3em' }}>
                    <h1><span style={{ color: 'var(--accent-color)' }}><MdError /> {errorMessage}</span><br /> Something went wrong. Please try again later.</h1>
                </div>
            }
        </main>
    );
}