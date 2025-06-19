import { useEffect, useState } from 'react';
import { exerciseOptions, fetchData } from '../../utils/fetchData';
import styles from './ExerciseViewForm.module.css';
import FilterExercise from './FilterExercise';

const ExerciseViewForm = ({ setExercisesList, setBodyPart, exercisesList }) => {
    const [bodyParts, setBodyParts] = useState([]);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        const fetchBodyPartLists = async () => {
            const { exercises } = await fetchData('https://exercisedb.p.rapidapi.com/exercises/bodyPartList', exerciseOptions);
            setBodyParts(['all', ...exercises]);
        };

        fetchBodyPartLists();
    }, []);

    const handleSearch = async () => {
        if (searchText) {
            const searchExercises = exercisesList.filter(
                ({ name, bodyPart, target, equipment, secondaryMuscle }) =>
                    name.toLowerCase().includes(searchText)
                    || bodyPart.toLowerCase().includes(searchText)
                    || target.toLowerCase().includes(searchText)
                    || equipment.toLowerCase().includes(searchText)
                // || secondaryMuscle.toLowerCase().includes(searchText)
            );

            window.scrollTo({ top: 1800, left: 100, behavior: 'smooth' });
            setExercisesList(searchExercises);
        }else{
            setExercisesList(exercisesList)
        }
    };

    useEffect(() => {
        const debounce = setTimeout(() => {
            handleSearch();
        }, 500);
        return () => {
            clearTimeout(debounce);
        };
    }, [searchText]);

    const preventRefresh = (e) => [
        e.preventDefault()
    ];
    return (
        <section>
            <div className={styles.searchExercises}>
                <form onSubmit={preventRefresh}>
                    <input className="" type="text" placeholder='Search Exercises' onChange={(e) => setSearchText(e.target.value.toLowerCase())} value={searchText} />
                    <button onClick={() => setSearchText('')} disabled={searchText === ''}>CLEAR</button>
                </form>
            </div>
            <div className={styles.exerciseFilterCards}>
                <FilterExercise setBodyPart={setBodyPart} bodyParts={bodyParts} />
                <hr />
            </div>
        </section>
    );
};

export default ExerciseViewForm;