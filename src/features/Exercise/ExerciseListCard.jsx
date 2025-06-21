import React, { useEffect, useState } from 'react';
import { Box, Stack, Button, TextField } from '@mui/material';
import styles from './ExerciseListCard.module.css';
import { Link } from 'react-router';

export default function ExerciseListCard({ exercise }) {
    // console.log(exercise);
    // --- useState ---

    return (
        // <section className={styles.exerciseSearch}>
            <article className={styles.exerciseListCard}>
                <Link to={exercise.id}>
                    <img src={exercise.gifUrl} alt={`${exercise.name}`} />
                    <div className='badges'>
                        <span className='categoryBadge badge'>{exercise.category}</span>
                        <span className='targetBadge badge'>{exercise.target}</span>
                        <span className='bodyPartBadge badge'>{exercise.bodyPart}</span>
                    </div>
                    <h1>{exercise.name}</h1>
                    <p>Level: {exercise.difficulty}</p>
                </Link>
            </article>
        // </section>
    );
}
