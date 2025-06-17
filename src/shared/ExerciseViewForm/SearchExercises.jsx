import React, { useState, useEffect } from 'react';
import { fetchData, exerciseOptions } from '../../utils/fetchData';
// import styles from './Exercise.module.css'

// const baseUrl = 'https://exercisedb.p.rapidapi.com/exercises';
export default function SearchExercises({ setExercisesList }) {
    const [searchText, setSearchText] = useState('');
    // const [filterExercises, setFilterExercises] = useState([]);

    const searchDataFetch = async () => {
        const { exercises } = await fetchData('/api/exercises', null);
        const searchExercises = exercises.filter(({ name, bodyPart, target, equipment }) => name.toLowerCase().includes(searchText)
            || bodyPart.toLowerCase().includes(searchText)
            || target.toLowerCase().includes(searchText)
            || equipment.toLowerCase().includes(searchText));
        setExercisesList(searchExercises);
    };

    useEffect(() => {
        const debounce = setTimeout(() => {
            searchDataFetch();
        }, 500);
        return () => {
            clearTimeout(debounce);
        };
    }, [searchText]);

    const preventRefresh = (e) => [
        e.preventDefault()
    ];
    return (
        <form onSubmit={preventRefresh}>
            <input className="" type="text" placeholder='Search Exercises' onChange={(e) => setSearchText(e.target.value.toLowerCase())} value={searchText} />
            <button onClick={() => setSearchText('')}>Clear</button>
        </form>
    );
};
