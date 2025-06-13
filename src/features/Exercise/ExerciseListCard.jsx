import React, { useEffect, useState } from 'react';
import { Box, Stack, Button, TextField } from '@mui/material';
import styles from './ExerciseListCard.module.css';
import { Link } from 'react-router';

export default function ExerciseListCard({ exercise }) {
    console.log(exercise);
    // --- useState ---

    return (
        <div className={styles.exerciseListCard}>
            <Link to={exercise.id}>
                <img src={exercise.gifUrl} alt={`${exercise.name}`} />
                <div className={styles.badges}>
                    <span className={`${styles.categoryBadge} ${styles.badge}`}>{exercise.category}</span>
                    <span className={`${styles.targetBadge} ${styles.badge}`}>{exercise.target}</span>
                    <span className={`${styles.bodyPartBadge} ${styles.badge}`}>{exercise.bodyPart}</span>
                </div>
                <h1>{exercise.name}</h1>
                <p>Level: {exercise.difficulty}</p>
            </Link>
        </div>
    );
}
