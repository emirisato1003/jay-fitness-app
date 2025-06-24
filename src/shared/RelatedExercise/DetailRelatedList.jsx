import { useLocation, useOutletContext, useSearchParams } from 'react-router';
import ExerciseListCard from '../../features/Exercise/ExerciseListCard';
import { useContext } from 'react';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import 'react-horizontal-scrolling-menu/dist/styles.css';
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { Link } from 'react-router';
import styles from './DetailRelatedList.module.css';


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

    const exerciseCardElement = (exerciseData) => {
        return exerciseData.map(exercise => {
            return <article key={exercise.id} className={styles.exerciseListCard}>
                <Link to={`/exercise/${exercise.id}`} >
                    <img src={exercise.gifUrl} alt={`gif image of ${exercise.name}`} />
                    <div className='badges'>
                        <span className='targetBadge badge'>{exercise.target}</span>
                        <span className='bodyPartBadge badge'>{exercise.bodyPart}</span>
                    </div>
                    <h1>{exercise.name}</h1>
                    <p>Level: {exercise.difficulty}</p>
                </Link>
            </article>;
        });
    };

    return (
        <div className={styles.relatedWorkouts}>
            <div className={styles.cardContainer}>
                <h2>same <span>target muscles</span> exercises </h2>
                <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
                    {exerciseCardElement(targetMuscles)}
                </ScrollMenu>
            </div>
            <div className={styles.cardContainer}>
                <h2>same <span>equipment</span> workout</h2>
                <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
                    {exerciseCardElement(equipExercisesData)}
                </ScrollMenu>
            </div>
        </div>
    );
}
