import React, { useContext, useEffect, useState } from 'react';
import { exerciseOptions, fetchData } from '../../utils/fetchData';
import styles from './FilterExercise.module.css';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import 'react-horizontal-scrolling-menu/dist/styles.css';
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

const arrowsStyles = {
    marginInline: '.5em'
}

const LeftArrow = () => {
    const { scrollPrev } = useContext(VisibilityContext);
    return (
        <div aria-label='left arrow button' style={arrowsStyles} onClick={() => scrollPrev()} className={styles.arrows}>
            <MdOutlineKeyboardArrowLeft />
        </div>
    );
};
const RightArrow = () => {
    const { scrollNext } = useContext(VisibilityContext);
    return (
        <div aria-label='right arrow button' style={arrowsStyles} onClick={() => scrollNext()} className={styles.arrows}>
            <MdOutlineKeyboardArrowRight />
        </div>
    );
};

const FilterExercise = ({ bodyPart, setBodyPart }) => {
    const [bodyParts, setBodyParts] = useState([]);
    useEffect(() => {
        const fetchExerciseData = async () => {
            const { exercises } = await fetchData('https://exercisedb.p.rapidapi.com/exercises/bodyPartList', exerciseOptions);
            setBodyParts(['all', ...exercises]);
        };

        fetchExerciseData();
    }, []);
    return (
        <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
            {bodyParts.map(item =>
                <div aria-label='Body Part Categories' onClick={() => setBodyPart(item)} key={item.id} className={styles.bodyPart}>
                    <img src={`/src/assets/icons/bodyParts/${item.replace(/\s+/g, '_')}.png`} alt="" />
                    <h3>{item}</h3>
                </div>)}
        </ScrollMenu>
    );
};

export default FilterExercise;