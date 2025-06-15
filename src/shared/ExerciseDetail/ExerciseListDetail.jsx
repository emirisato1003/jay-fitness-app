import React, { useEffect, useState } from 'react';
import DetailRelatedVideo from './DetailRelatedVideo';
import DetailRelatedList from './DetailRelatedList';
import { Outlet, useParams, Link } from 'react-router';
import muscle from '../../assets/icons/hip_flexors.png';

import styles from './ExerciseListDetail.module.css';
import { style } from '@mui/system';


export default function ExerciseListDetail() {
    const [exerciseDetail, setExerciseDetail] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { id } = useParams();

    const singleExerciseFetch = async () => {
        try {
            setIsLoading(true);
            const res = await fetch(`/api/exercises/${id}`);
            if (!res.ok) {
                throw new Error(res.status);
            }
            const { exercises } = await res.json();
            // console.log(exercises);
            setExerciseDetail(exercises);
        } catch (err) {
            console.log(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        singleExerciseFetch();
    }, []);

    const instructions = exerciseDetail?.instructions || exerciseDetail;
    const secondaryMuscles = exerciseDetail?.secondaryMuscles || exerciseDetail;
    // const target = exerciseDetail?.target || exerciseDetail;
    console.log(exerciseDetail);

    const instructionElements = Object.keys(instructions).map(key => (<li key={key}>
        {instructions[key]}
    </li>
    ));

    // const targetCleanName = exerciseDetail.target.replace(/\s+/g, '_');
    const mainMuscleElements =
        <div className={styles.muscleBadge}>
            <div className={styles.icon}>
                <img src={`/src/assets/icons/${exerciseDetail.target}.png`} alt="" />
            </div>
            <p>{exerciseDetail.target}</p>
        </div>;

    const secondaryMusclesElements = Object.keys(secondaryMuscles).map(key => {
        const muscleCleanName = secondaryMuscles[key].toLowerCase().replace(/\s+/g, '_');
        return (
            <div key={key} className={styles.muscleBadge}>
                <div className={styles.icon} style={{ backgroundColor: 'var(--secondary-text-color)' }}>
                    <img src={`/src/assets/icons/${muscleCleanName}.png`} alt="" />
                </div>
                <p>{secondaryMuscles[key]}</p>
            </div>);
    });

    return (
        <div>
            {isLoading ? <h1>Loading...</h1> :
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
                    <div className="relatedList">
                        <Outlet />
                    </div>
                </>
            }
        </div>
    );
}
