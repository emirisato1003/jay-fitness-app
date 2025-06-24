import { useLocation, useOutletContext, useSearchParams } from 'react-router';
import ExerciseListCard from '../../shared/Exercise/ExerciseListCard';
import { useContext } from 'react';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import 'react-horizontal-scrolling-menu/dist/styles.css';
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { Link } from 'react-router';
import styles from './DetailRelatedList.module.css';
import Pagination from '../../shared/Pagination/Pagination';


const arrowsStyles = {
    marginInline: '.5em'
};

const LeftArrow = () => {
    const { scrollPrev } = useContext(VisibilityContext);
    return (
        <div aria-label='left arrow button' style={arrowsStyles} onClick={() => scrollPrev()} className='arrows'>
            <MdOutlineKeyboardArrowLeft />
        </div>
    );
};
const RightArrow = () => {
    const { scrollNext } = useContext(VisibilityContext);
    return (
        <div aria-label='right arrow button' style={arrowsStyles} onClick={() => scrollNext()} className='arrows'>
            <MdOutlineKeyboardArrowRight />
        </div>
    );
};

export default function DetailRelatedList() {
    const { targetMuscles, equipExercisesData } = useOutletContext();
    const [searchParams, setSearchParams] = useSearchParams();

    const itemsPerPage = 5;
    const currentPage = parseInt(searchParams.get('page') || '1');
    const indexOfFirstExercise = itemsPerPage * (currentPage - 1);
    const indexOfLastExercise = currentPage * itemsPerPage;
    const totalPagesForTargetMuscle = Math.ceil(targetMuscles.length / itemsPerPage);
    const totalPagesForEquipExercise = Math.ceil(equipExercisesData.length / itemsPerPage);
    const currentTargetMuscleExercises = targetMuscles.slice(indexOfFirstExercise, indexOfLastExercise);
    const currentEquipExercises = equipExercisesData.slice(indexOfFirstExercise, indexOfLastExercise);

    return (
        <div className={styles.relatedWorkouts}>
            <div className={styles.cardContainer}>
                <h2>same <span>target muscles</span> exercises </h2>
                <div className={styles.horizontalCardContainer}>
                    {currentTargetMuscleExercises.map(exercise => <ExerciseListCard key={exercise.id} exercise={exercise} link />)}
                </div>
                <Pagination totalPages={totalPagesForTargetMuscle} currentPage={currentPage} setSearchParams={setSearchParams} exerciseSectionRef={null} />
            </div>
            <div className={styles.cardContainer}>
                <h2>same <span>equipment</span> workout</h2>
                <div className={styles.horizontalCardContainer}>
                    {currentEquipExercises.map(exercise => <ExerciseListCard key={exercise.id} exercise={exercise} />)}
                </div>
                <Pagination totalPages={totalPagesForEquipExercise} currentPage={currentPage} setSearchParams={setSearchParams} exerciseSectionRef={null} />
            </div>
        </div>
    );
}
