
import { useContext, useCallback } from 'react';
import { VisibilityContext } from 'react-horizontal-scrolling-menu';
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

export const RightArrow = () => {
    const arrowsStyles = {
        marginInline: '.5em'
    };
    const { scrollNext } = useContext(VisibilityContext);
    const handleScrollNext = useCallback(() => {
        scrollNext();
    }, [scrollNext]);

    return (
        <div aria-label='left arrow button' style={arrowsStyles} onClick={handleScrollNext} className='arrows'>
            <MdOutlineKeyboardArrowRight />
        </div>
    );
};
