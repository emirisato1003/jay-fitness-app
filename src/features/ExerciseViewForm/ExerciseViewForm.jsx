import { useCallback, useEffect, useState } from 'react';
import { exerciseOptions, fetchData } from '../../utils/fetchData';
import styles from './ExerciseViewForm.module.css';
import FilterExercise from './FilterExercise';

const ExerciseViewForm = ({ setExercisesList, setBodyPart, originalExerciseList, setSearchParams, searchParams, exerciseSectionRef }) => {
    const [bodyParts, setBodyParts] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [originalExercises, setOriginalExercises] = useState([]);


    const fetchBodyPartLists = async () => {
        const { data } = await fetchData('https://exercisedb.p.rapidapi.com/exercises/bodyPartList', exerciseOptions);
        setBodyParts(['all', ...data]);
    };

    useEffect(() => {
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

            exerciseSectionRef.current?.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            setSearchParams({ page: 1 });
            setExercisesList(searchExercises);
        } else {
            setExercisesList(originalExercises);
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
                    <input ref={exerciseSectionRef} className="" aria-label='search input' placeholder='Search Exercises' onChange={(e) => setSearchText(e.target.value.toLowerCase())} value={searchText} />
                    <button onClick={handleClear} disabled={searchText === ''}>CLEAR</button>
                </form>
            </div>
            <div className={styles.exerciseFilterCards}>
                <FilterExercise setBodyPart={setBodyPart} bodyParts={bodyParts} setSearchParams={setSearchParams} exerciseSectionRef={exerciseSectionRef} searchParams={searchParams} />
                <hr />
            </div>
        </section>
    );
};

export default ExerciseViewForm;