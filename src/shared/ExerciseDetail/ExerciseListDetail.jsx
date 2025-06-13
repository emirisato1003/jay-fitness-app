import React from 'react';
import DetailRelatedVideo from './DetailRelatedVideo';
import DetailRelatedList from './DetailRelatedList';
import { Outlet, useParams } from 'react-router';

export default function ExerciseListDetail() {
    const { id } = useParams();
    console.log(id)
    return (
        <div>
            <h1>Exercise detail goes here</h1>
            <div className="relatedList">
                <Outlet />
            </div>
        </div>
    );
}
