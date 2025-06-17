import React, { useEffect, useState } from 'react';
import { Box, Stack, Button, TextField } from '@mui/material';
import SearchExercises from '../../shared/ExerciseViewForm/SearchExercises';
import FilterExercise from '../../shared/ExerciseViewForm/FilterExercise';
// import Pagination from '@mui/material/Pagination';
// import PaginationItem from '@mui/material/PaginationItem';
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

// import '../../service/service';
import ExerciseListCard from './ExerciseListCard';
import styles from './ExerciseList.module.css';
import { fetchData, exerciseOptions } from '../../utils/fetchData';
import { MdError } from "react-icons/md";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { useSearchParams } from 'react-router';

const baseUrl = `https://exercisedb.p.rapidapi.com/exercises`;
const mockBaseUrl = `/api/exercises`;

export default function ExerciseList({ exercisesList, setExercisesList, bodyPart, setBodyPart, filteredExercises, errorMessage }) {
    const [searchParams, setSearchParams] = useSearchParams();
    const itemsPerPage = 15;
    const currentPage = parseInt(searchParams.get('page') || '1');
    const indexOfFirstExercise = itemsPerPage * (currentPage - 1);
    const indexOfLastExercise = currentPage * itemsPerPage;
    const totalPages = Math.ceil(filteredExercises.length / itemsPerPage);
    const currentExercises = filteredExercises.slice(indexOfFirstExercise, indexOfLastExercise);

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setSearchParams({ page: currentPage - 1 });
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setSearchParams({ page: currentPage + 1 });
        }
    };

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
                                    {currentExercises.map(exercise =>
                                        <ExerciseListCard
                                            key={exercise.id}
                                            exercise={exercise}
                                        />)}
                                </div>
                                <div className="paginationControls">
                                    <button onClick={() => handlePreviousPage()} disabled={currentPage === 1}><IoIosArrowDropleftCircle /></button>
                                    <span>{currentPage} of {totalPages}</span>
                                    <button onClick={() => handleNextPage()} disabled={currentPage === totalPages}><IoIosArrowDroprightCircle /></button>
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
