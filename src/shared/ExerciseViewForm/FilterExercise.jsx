import React, { useEffect, useState } from 'react';
import { exerciseOptions, fetchData } from '../../utils/fetchData';
import styles from './FilterExercise.module.css'

export default function FilterExercise({ bodyPart, setBodyPart }) {
    const [bodyParts, setBodyParts] = useState([]);
    useEffect(() => {
        const fetchExerciseData = async () => {
            const { exercises } = await fetchData('https://exercisedb.p.rapidapi.com/exercises/bodyPartList', exerciseOptions);
            setBodyParts(['all', ...exercises]);
        };

        fetchExerciseData();
    }, []);
    return (
        <div className={styles.bodyParts}>
            {bodyParts.map(item =>
                <button>
                    <img src={`/src/assets/icons/bodyParts/${item.replace(/\s+/g, '_')}.png`} alt="" />
                    <h3>{item}</h3>
                </button>)}
        </div>
    );
}
