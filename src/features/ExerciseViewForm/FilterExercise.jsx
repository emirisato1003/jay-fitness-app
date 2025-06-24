import React, { useCallback, } from 'react';
import styles from './FilterExercise.module.css';
import { ScrollMenu } from 'react-horizontal-scrolling-menu';
import 'react-horizontal-scrolling-menu/dist/styles.css';
import { LeftArrow } from './LeftArrow';
import { RightArrow } from './RightArrow';

const buttonStyle = {
    padding: 0
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