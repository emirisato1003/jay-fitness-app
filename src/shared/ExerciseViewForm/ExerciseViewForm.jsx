import { useEffect, useState } from 'react';
import { exerciseOptions, fetchData } from '../../utils/fetchData';
import styles from './ExerciseViewForm.module.css';
import FilterExercise from './FilterExercise';

const ExerciseViewForm = ({ setExercisesList, setBodyPart, originalExerciseList, setSearchParams }) => {
    const [bodyParts, setBodyParts] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [originalExercises, setOriginalExercises] = useState([]);
    useEffect(() => {
        const fetchBodyPartLists = async () => {
            const { data } = await fetchData('https://exercisedb.p.rapidapi.com/exercises/bodyPartList', exerciseOptions);
            setBodyParts(['all', ...data]);
        };

        fetchBodyPartLists();
    }, []);

    const handleSearch = async () => {
        if (searchText) {
            const searchExercises = originalExerciseList.filter(
                ({ name, bodyPart, target, equipment }) =>
                    name.toLowerCase().includes(searchText)
                    || bodyPart.toLowerCase().includes(searchText)
                    || target.toLowerCase().includes(searchText)
                    || equipment.toLowerCase().includes(searchText)
            );

            window.scrollTo({ top: 1800, left: 100, behavior: 'smooth' });
            setExercisesList(searchExercises);
        }else{
            setExercisesList(originalExercises)
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

    const handleClear = () => {
        setSearchText('');
        setOriginalExercises(originalExerciseList);
    };
    return (
        <section>
            <div className={styles.searchExercises}>
                <form onSubmit={preventRefresh}>
                    <input className="" type="text" placeholder='Search Exercises' onChange={(e) => setSearchText(e.target.value.toLowerCase())} value={searchText} />
                    <button onClick={handleClear} disabled={searchText === ''}>CLEAR</button>
                </form>
            </div>
            <div className={styles.exerciseFilterCards}>
                <FilterExercise setBodyPart={setBodyPart} bodyParts={bodyParts} setSearchParams={setSearchParams} />
                <hr />
            </div>
        </section>
    );
};

export default ExerciseViewForm;