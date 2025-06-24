import {useOutletContext, useSearchParams } from 'react-router';
import ExerciseListCard from '../../shared/Exercise/ExerciseListCard';
import 'react-horizontal-scrolling-menu/dist/styles.css';
import styles from './DetailRelatedList.module.css';
import Pagination from '../../shared/Pagination/Pagination';


export default function DetailRelatedList() {
    const { targetMuscles, equipExercisesData } = useOutletContext();
    const [searchParams, setSearchParams] = useSearchParams();

    const itemsPerPage = 5;
    const currentTargetPage = parseInt(searchParams.get('targetPage') || '1');
    const indexOfFirstExercise = itemsPerPage * (currentTargetPage - 1);
    const indexOfLastExercise = currentTargetPage * itemsPerPage;
    const totalPagesForTargetMuscle = Math.ceil(targetMuscles.length / itemsPerPage);
    const currentTargetMuscleExercises = targetMuscles.slice(indexOfFirstExercise, indexOfLastExercise);

    const currentEquipPage = parseInt(searchParams.get('equipPage') || '1');
    const totalPagesForEquipExercise = Math.ceil(equipExercisesData.length / itemsPerPage);
    const indexOfFirstEquipExercise = itemsPerPage * (currentEquipPage - 1);
    const indexOfLastEquipExercise = currentEquipPage * itemsPerPage;
    const currentEquipExercises = equipExercisesData.slice(indexOfFirstEquipExercise, indexOfLastEquipExercise);

    return (
        <div className={styles.relatedWorkouts}>
            <div className={styles.cardContainer}>
                <h2>same <span>target muscles</span> exercises </h2>
                <div className={styles.horizontalCardContainer}>
                    {currentTargetMuscleExercises.map(exercise => <ExerciseListCard key={exercise.id} exercise={exercise} link />)}
                </div>
                <Pagination totalPages={totalPagesForTargetMuscle} currentPage={currentTargetPage} page={'targetPage'} setSearchParams={setSearchParams} exerciseSectionRef={null} />
            </div>
            <div className={styles.cardContainer}>
                <h2>same <span>equipment</span> workout</h2>
                <div className={styles.horizontalCardContainer}>
                    {currentEquipExercises.map(exercise => <ExerciseListCard key={exercise.id} exercise={exercise} />)}
                </div>
                <Pagination totalPages={totalPagesForEquipExercise} currentPage={currentEquipPage} page={'equipPage'} setSearchParams={setSearchParams} exerciseSectionRef={null} />
            </div>
        </div>
    );
}
