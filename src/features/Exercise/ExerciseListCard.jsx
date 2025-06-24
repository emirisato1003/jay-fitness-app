import styles from './ExerciseListCard.module.css';
import { Link } from 'react-router';

export default function ExerciseListCard({ exercise, searchParams }) {
    return (
        <article className={styles.exerciseListCard}>
            <Link to={exercise.id} state={{ search: searchParams.toString() }}>
                <img src={exercise.gifUrl} alt={`gif image of ${exercise.name}`} />
                <div className='badges'>
                    <span className='targetBadge badge'>{exercise.target}</span>
                    <span className='bodyPartBadge badge'>{exercise.bodyPart}</span>
                </div>
                <h1>{exercise.name}</h1>
                <p>Level: {exercise.difficulty}</p>
            </Link>
        </article>
    );
}
