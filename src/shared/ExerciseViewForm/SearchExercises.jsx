import React, { useState } from 'react';
import { Box, Stack, Button, TextField } from '@mui/material';
// import styles from './Exercise.module.css'

export default function SearchExercises() {
    const [searchText, setSearchText] = useState('')
    console.log(searchText)
    return (
        <form action="">
            <input className="" type="text" placeholder='Search Exercises' onChange={(e) => setSearchText(e.target.value.toLowerCase())} value={searchText} name="" id="" />
            <button>Search</button>
        </form>
    );
}
