import React from 'react';
import { MdError } from "react-icons/md";

export default function ErrorDialog({ errorMessage }) {
    return (
        <div>
            <div style={{ border: '3px dashed var(--accent-color)', padding: '3em' }}>
                <h1><span style={{ color: 'var(--accent-color)' }}><MdError /> {errorMessage}</span><br /> Something went wrong. Please try again later.</h1>
            </div>
        </div>
    );
}
