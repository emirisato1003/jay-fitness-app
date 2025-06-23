import React, { useEffect, useState } from 'react';
import DetailRelatedVideo from '../RelatedExercise/DetailRelatedVideo';
import DetailRelatedList from '../RelatedExercise/DetailRelatedList';
import { Outlet, useParams, Link, NavLink } from 'react-router';
// import muscle from '../../assets/icons/hip_flexors.png';

import styles from './ExerciseListDetail.module.css';
import { style } from '@mui/system';
import { exerciseOptions, fetchData } from '../../utils/fetchData';

export default function ExerciseListDetail() {
    const [exerciseDetail, setExerciseDetail] = useState([]);
    const [targetMuscles, setTargetMuscles] = useState([]);
    const [equipExercisesData, setEquipExercisesData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const { id } = useParams();
    const baseUrl = `https://exercisedb.p.rapidapi.com/exercises`;

    const fetchExerciseData = async () => {
        const { data, error } = await fetchData(`${baseUrl}/exercise/${id}`, exerciseOptions, () => setIsLoading(true), () => setIsLoading(false));
        setExerciseDetail(data);
        errorMessage && setErrorMessage(error);

        const targetMusclesExercisesData = await fetchData(`${baseUrl}/target/${data.target}?limit=0`, exerciseOptions, () => setIsLoading(true), () => setIsLoading(false));
        setTargetMuscles(targetMusclesExercisesData.data);

        const equipExercisesData = await fetchData(`${baseUrl}/equipment/${data.equipment}?limit=0`, exerciseOptions, () => setIsLoading(true), () => setIsLoading(false));
        setEquipExercisesData(equipExercisesData.data);
    };

    useEffect(() => {
        fetchExerciseData();
    }, []);

    const cleanName = (muscle) => {
        return muscle.toLowerCase().replace(/\s+/g, '_');
    };

    if (!exerciseDetail.instructions || !exerciseDetail.secondaryMuscles) return <h1 style={{ textAlign: 'center' }}>Loading...</h1>;

    const instructionElements = Object.keys(exerciseDetail.instructions).map(key => (<li key={key}>
        {exerciseDetail.instructions[key]}
    </li>
    ));

    const mainMuscleElements =
        <div className={styles.muscleBadge}>
            <div className={styles.icon}>
                <img src={`/src/assets/icons/muscles/${cleanName(exerciseDetail.target)}.png`} alt="" />
            </div>
            <p>{exerciseDetail.target}</p>
        </div>;

    const secondaryMusclesElements = Object.keys(exerciseDetail.secondaryMuscles).map(key => {
        return (
            <div key={key} className={styles.muscleBadge}>
                <div className={styles.icon} style={{ backgroundColor: 'var(--secondary-text-color)' }}>
                    <img src={`/src/assets/icons/muscles/${cleanName(exerciseDetail.secondaryMuscles[key])}.png `} alt="" />
                </div>
                <p>{exerciseDetail.secondaryMuscles[key]}</p>
            </div>);
    });

    const activeStyles = { textDecoration: 'underline' };
    return (
        <div>
            {isLoading ? <h1 style={{ textAlign: 'center' }}>Loading...</h1> :
                <>
                    <Link className={styles.backToButton} to='..' relative='path'>&larr; Go back to Exercise List</Link>
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
                                        <h2>target muscles</h2>
                                        {mainMuscleElements}
                                    </div>
                                    <div>
                                        <h2>secondary target muscle</h2>
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
                    </nav>
                    <hr />
                    <Outlet context={{ exerciseDetail, targetMuscles, equipExercisesData }} />
                </>
            }
        </div>
    );
}
