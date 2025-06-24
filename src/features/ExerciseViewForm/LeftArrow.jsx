
import { useContext, useCallback } from 'react';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";

export const LeftArrow = () => {
    const arrowsStyles = {
        marginInline: '.5em'
    };
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
