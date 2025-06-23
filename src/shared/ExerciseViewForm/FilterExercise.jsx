import React, { useContext } from 'react';
import styles from './FilterExercise.module.css';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import 'react-horizontal-scrolling-menu/dist/styles.css';
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

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
    return (
        <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
            {bodyParts.map(item => {
                const handleFilter = () => {
                    setBodyPart(item);
                    setSearchParams({ page: 1 });
                    exerciseSectionRef.current?.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                };
                return (
                    <div aria-label='Body Part Categories' onClick={handleFilter} key={item.id} className={styles.bodyPart}>
                        <img src={`/src/assets/icons/bodyParts/${item.replace(/\s+/g, '_')}.png`} alt={item} />
                        <h3>{item}</h3>
                    </div>);
            })}
        </ScrollMenu>
    );
};

export default FilterExercise;