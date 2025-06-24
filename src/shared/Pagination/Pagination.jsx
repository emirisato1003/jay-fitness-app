import styles from './Pagination.module.css';

import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";

export default function Pagination({ currentPage, totalPages, setSearchParams, exerciseSectionRef, page }) {

    const pageHandler = (setPage, condition) => {
        if (condition) {
            setSearchParams(prevParams => {
                prevParams.set(page, setPage);
                return prevParams;
            });
        }
        exerciseSectionRef && exerciseSectionRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    };

    return (
        <div className={styles.paginationControls}>
            <div>
                <button aria-label='back to first page' onClick={() => pageHandler(1, (currentPage > 1))} disabled={currentPage === 1}>
                    <MdKeyboardDoubleArrowLeft className={styles.paginateIcon} />
                </button>
                <button aria-label='back to previous page' onClick={() => pageHandler((currentPage - 1), (currentPage > 1))} disabled={currentPage === 1}>
                    <MdKeyboardArrowLeft className={styles.paginateIcon} />
                </button>
            </div>
            <span>{currentPage} of {totalPages}</span>
            <div>
                <button aria-label='go to next page' onClick={() => pageHandler((currentPage + 1), (currentPage < totalPages))} disabled={currentPage === totalPages}>
                    <MdKeyboardArrowRight className={styles.paginateIcon} />
                </button>
                <button aria-label='go to the last page' onClick={() => pageHandler(totalPages, (currentPage < totalPages))} disabled={currentPage === totalPages}>
                    <MdKeyboardDoubleArrowRight className={styles.paginateIcon} />
                </button>
            </div>
        </div>
    );
}
