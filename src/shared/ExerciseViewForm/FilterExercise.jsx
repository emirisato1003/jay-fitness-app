import React, { useContext } from 'react';
import styles from './FilterExercise.module.css';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import 'react-horizontal-scrolling-menu/dist/styles.css';
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { Link } from 'react-router';

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

const FilterExercise = ({ setBodyPart, bodyParts, setSearchParams, exerciseSectionRef }) => {
    const handleFilter = (item) => {
        setSearchParams({ page: 1 });
        setBodyPart(item);
        exerciseSectionRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    };

    return (
        <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
            {bodyParts.map(item => {
                return (
                    <button to={`?bodyPart=${item}`} aria-label='Body Part Categories' onClick={() => handleFilter(item)} key={item.id} className={styles.bodyPart}>
                        <img src={`/src/assets/icons/bodyParts/${item.replace(/\s+/g, '_')}.png`} alt={item} />
                        <h3>{item}</h3>
                    </button>);
            })}
        </ScrollMenu>
    );
};

export default FilterExercise;