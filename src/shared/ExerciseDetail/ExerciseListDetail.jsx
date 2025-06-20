import React, { useEffect, useState } from 'react';
import DetailRelatedVideo from '../RelatedExercise/DetailRelatedVideo';
import DetailRelatedList from '../RelatedExercise/RelatedList/DetailRelatedList';
import { Outlet, useParams, Link, NavLink } from 'react-router';
// import muscle from '../../assets/icons/hip_flexors.png';

import styles from './ExerciseListDetail.module.css';
import { style } from '@mui/system';
import { exerciseOptions, fetchData } from '../../utils/fetchData';

export default function ExerciseListDetail() {
    const [exerciseDetail, setExerciseDetail] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { id } = useParams();
    const url = `https://exercisedb.p.rapidapi.com/exercises/exercise/${id}`;

    const singleExerciseFetch = async () => {
        const { data, error } = await fetchData(url, exerciseOptions, () => setIsLoading(true), () => setIsLoading(false));
        setExerciseDetail(data);
        console.log(data);
    };

    useEffect(() => {
        singleExerciseFetch();
    }, []);
    // if no data, return loading...
    if (!exerciseDetail.instructions || !exerciseDetail.secondaryMuscles) return <div>Loading...</div>;

    const instructionElements = Object.keys(exerciseDetail.instructions).map(key => (<li key={key}>
        {exerciseDetail.instructions[key]}
    </li>
    ));

    const mainMuscleElements =
        <div className={styles.muscleBadge}>
            <div className={styles.icon}>
                <img src={`/src/assets/icons/muscles/${exerciseDetail.target || 'muscle'}.png`} alt="" />
            </div>
            <p>{exerciseDetail.target}</p>
        </div>;

    const secondaryMusclesElements = Object.keys(exerciseDetail.secondaryMuscles).map(key => {
        const muscleCleanName = exerciseDetail.secondaryMuscles[key].toLowerCase().replace(/\s+/g, '_');
        return (
            <div key={key} className={styles.muscleBadge}>
                <div className={styles.icon} style={{ backgroundColor: 'var(--secondary-text-color)' }}>
                    <img src={`/src/assets/icons/muscles/${muscleCleanName || 'muscle'}.png `} alt="" />
                </div>
                <p>{exerciseDetail.secondaryMuscles[key]}</p>
            </div>);
    });

    // "feet", --- 'muscle'
    // "grip muscles", -- 'muscle'
    // "hands", -- 'muscle'


    // 14:"serratus anterior" -- 'muscle'
    const activeStyles = { textDecoration: 'underline' };
    return (
        <div>
            {isLoading ? <h1 style={{ textAlign: 'center' }}>Loading...</h1> :
                <>
                    <Link className={styles.backToButton} to='/exercise'>&larr; Go back to Exercise List</Link>
                    <div className={styles.container}>
                        <img className={styles.gif} src={exerciseDetail.gifUrl} alt={exerciseDetail.name} />
                        <div className={styles.contents}>
                            <div className={styles.detail}>
                                <h1>{exerciseDetail.name}</h1>
                            </div>
                            <ol className={styles.steps}>
                                {instructionElements}
                            </ol>
                            <div className={styles.targetMuscles}>
                                <div className={styles.muscles}>
                                    <div className={styles.target}>
                                        <h3>target muscles</h3>
                                        {mainMuscleElements}
                                    </div>
                                    <div>
                                        <h3>secondary target muscle</h3>
                                        <div className={styles.secondaryTarget}>
                                            {secondaryMusclesElements}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <nav className={styles.relatedWorkoutNav}>
                        <NavLink style={({ isActive }) => isActive ? activeStyles : null} to='.' end>Videos</NavLink>
                        <NavLink style={({ isActive }) => isActive ? activeStyles : null} to='relatedLists'>Related Workouts</NavLink>
                        <Outlet context={{ exerciseDetail }} />
                    </nav>
                </>
            }
        </div>
    );
}
