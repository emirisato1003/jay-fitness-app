import React from 'react';
import styles from './Pagination.module.css';

import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
export default function Pagination({ currentPage, totalPages, setSearchParams, exerciseSectionRef }) {

    const handleFirstPage = () => {
        if (currentPage > 1) {
            setSearchParams(prevParams => {
                prevParams.set('page', 1);
                return prevParams;
            });
            exerciseSectionRef.current?.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setSearchParams(prevParams => {
                prevParams.set('page', currentPage - 1);
                return prevParams;
            });
            exerciseSectionRef.current?.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setSearchParams(prevParams => {
                prevParams.set('page', currentPage + 1);
                return prevParams;
            });
            exerciseSectionRef.current?.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    const handleLastPage = () => {
        if (currentPage < totalPages) {
            setSearchParams(prevParams => {
                prevParams.set('page', totalPages);
                return prevParams;
            });
            exerciseSectionRef.current?.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    };
    return (
        <div className={styles.paginationControls}>
            <div>
                <button onClick={() => handleFirstPage()} disabled={currentPage === 1}>
                    <MdKeyboardDoubleArrowLeft className={styles.paginateIcon} />
                </button>
                <button onClick={() => handlePreviousPage()} disabled={currentPage === 1}>
                    <MdKeyboardArrowLeft className={styles.paginateIcon} />
                </button>
            </div>
            <span>{currentPage} of {totalPages}</span>
            <div>
                <button onClick={() => handleNextPage()} disabled={currentPage === totalPages}>
                    <MdKeyboardArrowRight className={styles.paginateIcon} />
                </button>
                <button onClick={() => handleLastPage()} disabled={currentPage === totalPages}>
                    <MdKeyboardDoubleArrowRight className={styles.paginateIcon} />
                </button>
            </div>
        </div>
    );
}
