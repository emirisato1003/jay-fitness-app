import { useEffect, useState } from 'react';
import { Outlet, useParams, Link, NavLink, useLocation } from 'react-router';
import ErrorDialog from '../../shared/ErrorDialog';
import styles from './ExerciseListDetail.module.css';
import { exerciseOptions, fetchData } from '../../utils/fetchData';

const cleanName = (muscle) => {
    if (!muscle) return 'muscle';
    return muscle.toLowerCase().replace(/\s+/g, '_');
};

export default function ExerciseListDetail() {
    const [exerciseDetail, setExerciseDetail] = useState([]);
    const [targetMuscles, setTargetMuscles] = useState([]);
    const [equipExercisesData, setEquipExercisesData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const { id } = useParams();
    const baseUrl = `https://exercisedb.p.rapidapi.com/exercises`;
    const location = useLocation();

    const fetchExerciseData = async () => {
        try {
            setIsLoading(true);
            setErrorMessage(null);
            const exerciseData = await fetchData(`${baseUrl}/exercise/${id}`, exerciseOptions);
            if (exerciseData.error) {
                setErrorMessage(exerciseData.error);
            }
            setExerciseDetail(exerciseData.data);

            const targetMusclesExercisesData = await fetchData(`${baseUrl}/target/${exerciseData.data.target}?limit=0`, exerciseOptions);
            const equipExercisesData = await fetchData(`${baseUrl}/equipment/${exerciseData.data.equipment}?limit=0`, exerciseOptions);
            setTargetMuscles(targetMusclesExercisesData.data);
            setEquipExercisesData(equipExercisesData.data);

        } catch (err) {
            setErrorMessage(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchExerciseData();
    }, [id]);

    const instructionElements = exerciseDetail.instructions && exerciseDetail.instructions.map((step) => (
        <li>{step}</li>
    ));

    const mainMuscleElements =
        <div className={styles.muscleBadge}>
            <div className={styles.icon}>
                <img src={`/muscles/${cleanName(exerciseDetail.target) || 'muscle'}.png`} alt={`target muscle is ${exerciseDetail.target}`} />

            </div>
            <p>{exerciseDetail.target}</p>
        </div>;

    const secondaryMusclesElements = exerciseDetail.secondaryMuscles && exerciseDetail.secondaryMuscles.map(muscle => {
        return (
            <div key={muscle} className={styles.muscleBadge}>
                <div className={styles.icon} style={{ backgroundColor: 'var(--secondary-text-color)' }}>
                    <img src={`/muscles/${cleanName(muscle) || 'muscle'}.png `} alt={`secondary Target muscles are ${muscle}`} />
                </div>
                <p>{muscle}</p>
            </div>);
    });
    const activeStyles = { textDecoration: 'underline' };
    return (
        <>
            {errorMessage ?
                <ErrorDialog errorMessage={errorMessage} />
                : <div>
                    {isLoading ? <h1 style={{ textAlign: 'center' }}>Loading...</h1>
                        : <>
                            <Link
                                className={styles.backToButton}
                                to={`..?${location.state?.search || ''}`}
                                relative='path'>&larr; Go back to Exercise List
                            </Link>
                            <div className={styles.container}>
                                <img className={styles.gif} src={exerciseDetail.gifUrl} alt={`the gif of ${exerciseDetail.name}exercise `} />
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
                            <Outlet context={{ exerciseDetail, targetMuscles, equipExercisesData, isLoading, setIsLoading, errorMessage, setErrorMessage }} />
                        </>
                    }
                </div>
            }
        </>
    );
}
