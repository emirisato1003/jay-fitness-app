import React, { useCallback, useContext, useMemo } from 'react';
import styles from './FilterExercise.module.css';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import 'react-horizontal-scrolling-menu/dist/styles.css';
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { Link } from 'react-router';

const arrowsStyles = {
    marginInline: '.5em'
};

const buttonStyle = {
    padding: 0
};

const LeftArrow = () => {
    const { scrollPrev } = useContext(VisibilityContext);
    const handleScrollPrev = useCallback(() => {
        scrollPrev();
    }, [scrollPrev]);

    return (
        <div aria-label='left arrow button' style={arrowsStyles} onClick={handleScrollPrev} className='arrows'>
            <MdOutlineKeyboardArrowLeft />
        </div>
    );
};

const RightArrow = () => {
    const { scrollNext } = useContext(VisibilityContext);
    const handleScrollNext = useCallback(() => {
        scrollNext();
    }, [scrollNext]);
    return (
        <div aria-label='right arrow button' style={arrowsStyles} onClick={handleScrollNext} className='arrows'>
            <MdOutlineKeyboardArrowRight />
        </div>
    );
};

const FilterExercise = ({ setBodyPart, bodyParts, setSearchParams, exerciseSectionRef }) => {    
    const handleFilter = useCallback((key, item) => {
        setSearchParams(prevParams => {
            const newParams = new URLSearchParams(prevParams);
            newParams.set('page', '1');
            if (item === null) {
                newParams.delete(key);
            } else {
                newParams.set(key, item);
            }
            return newParams;
        });
        setBodyPart(item);
        exerciseSectionRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }, [setBodyPart, setSearchParams]);

    return (
        <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
            {bodyParts.map(item => {
                return (
                    <button style={buttonStyle} aria-label='Body Part Categories' onClick={() => handleFilter('bodyPart', item)} key={item.id} className={styles.bodyPart}>
                        <img src={`/src/assets/icons/bodyParts/${item.replace(/\s+/g, '_')}.png`} alt={item} />
                        <h3>{item}</h3>
                    </button>);
            })}
        </ScrollMenu>
    );
};

export default React.memo(FilterExercise);