import { useOutletContext } from 'react-router';
import ExerciseListCard from '../../features/Exercise/ExerciseListCard';
import { useContext } from 'react';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import 'react-horizontal-scrolling-menu/dist/styles.css';
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { Link } from 'react-router';
import styles from './DetailRelatedList.module.css'
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
    console.log(targetMuscles);
    return (
        <div className={styles.targetMuscleCardContainer}>
            <h3>Similar target muscles exercises </h3>
            <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
                {targetMuscles.map(exercise =>
                    <article className={styles.targetMusclesCard}>
                        <Link to={''}>
                            <img src={exercise.gifUrl} alt={exercise.name} />
                            <h3>{exercise.name}</h3>
                        </Link>
                    </article>
                )}
            </ScrollMenu>
            <div>
                <h3>same equipment workout</h3>
            </div>
        </div>);
}
