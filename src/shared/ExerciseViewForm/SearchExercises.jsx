import React, { useState, useEffect } from 'react';
import { fetchData } from '../../utils/fetchData';
// import styles from './Exercise.module.css'

const token = import.meta.env.EXERCISE_API_KEY
const host = 'exercisedb.p.rapidapi.com'

export default function SearchExercises({ exercises }) {
    const baseUrl = `https://exercisedb.p.rapidapi.com/exercises?limit=10&offset=0`;
    const [searchText, setSearchText] = useState('');
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': token,
            'x-rapidapi-host': host,
        }
    };
    const searchData = async () => {
        try {
            await new Promise(resolve => setTimeout(resolve, 1000))
            const response = await fetch(baseUrl, options);
            console.log(response.status);
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        searchData()
    }, [])

    // const handleSearch = async (e) => {
    //     e.preventDefault();
    //     const searchData = await fetchData(baseUrl, searchOptions);
    //     // setSearchText(e.target.value.toLowerCase())
    //     console.log(searchData);
    // };
    return (
        <form action="">
            <input className="" type="text" placeholder='Search Exercises' onChange={(e) => setSearchText(e.target.value.toLowerCase())} value={searchText} name="" id="" />
            <button>Search</button>
        </form>
    );
}
